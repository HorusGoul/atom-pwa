import { chromium, devices, Browser, BrowserContextOptions } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import "./screenshot";
import "./video";
import puppeteer, { Browser as PuppeteerBrowser } from "puppeteer-core";
import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";
import { getPortFree } from "./getPortFree";

const ROOT_DIR = path.resolve(__dirname, "..");
const SCREENSHOTS_OUTPUT_DIR = path.resolve(ROOT_DIR, "screenshots");
const VIDEOS_OUTPUT_DIR = path.resolve(ROOT_DIR, "videos");

type DeviceDescriptor = typeof devices[keyof typeof devices];

interface SelectedDevice {
  device: DeviceDescriptor;
  folder: string;
  suffix?: string;
}

const selectedDevices: SelectedDevice[] = [
  {
    device: devices["Pixel 2"],
    folder: "mobile",
    suffix: "portrait",
  },
  {
    device: {
      ...devices["iPad (gen 7) landscape"],
      viewport: {
        width: 1920,
        height: 1080,
      },
    },
    folder: "tablet",
    suffix: "landscape",
  },
  {
    device: {
      ...devices["Desktop Chrome"],
      viewport: {
        width: 1920,
        height: 1080,
      },
    },
    folder: "desktop",
  },
];

const languages = ["en", "es", "de", "ro"];

async function main() {
  const processScreenshots = process.argv.includes("--screenshot");
  const processVideos = process.argv.includes("--video");

  if (!processScreenshots && !processVideos) {
    console.error("You must specify --screenshot or --video");
    process.exit(1);
  }

  let browser: Browser | null = null;
  let puppeteerBrowser: PuppeteerBrowser | null = null;

  try {
    console.log("Importing screenshot and video modules");

    if (processScreenshots) {
      await import("./screenshots/all-screenshots");
    }

    if (processVideos) {
      await import("./videos/all-videos");
    }

    console.log("Starting browser");
    const freePort = await getPortFree();
    browser = await chromium.launch({
      headless: true,
      args: [
        `--remote-debugging-port=${freePort}`,
        processVideos ? "--use-gl=egl" : false,
      ].filter(Boolean) as string[],
    });
    // eslint-disable-next-line import/no-named-as-default-member
    puppeteerBrowser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${freePort}`,
    });

    for (const language of languages) {
      for (const selectedDevice of selectedDevices) {
        const screenshotsFolder = path.resolve(
          SCREENSHOTS_OUTPUT_DIR,
          language,
          selectedDevice.folder
        );

        const videosFolder = path.resolve(
          VIDEOS_OUTPUT_DIR,
          language,
          selectedDevice.folder
        );

        console.log(`Processing ${language} on ${selectedDevice.folder}`);

        await mkdir(screenshotsFolder, { recursive: true });
        await mkdir(videosFolder, { recursive: true });

        const commonContextOptions: BrowserContextOptions = {
          ...selectedDevice.device,
          locale: language,
          baseURL: "https://next--atom-pt.netlify.app",
        };

        for (const screenshotFn of global.__screenshots.values()) {
          const context = await browser.newContext(commonContextOptions);
          const page = await context.newPage();

          async function takeScreenshot(name: string) {
            await page.screenshot({
              path: path.resolve(
                screenshotsFolder,
                [name, selectedDevice.suffix, "png"].filter(Boolean).join(".")
              ),
            });
          }

          try {
            await screenshotFn({ page, takeScreenshot });
          } catch (error) {
            console.error(error);
          }

          await page.close();
          await context.close();
        }

        for (const videoFn of global.__videos.values()) {
          const context = await browser.newContext({
            ...commonContextOptions,
          });

          await context.addInitScript((videoName) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).__pageId = videoName;
          }, videoFn.__videoName);

          const page = await context.newPage();
          await page.waitForLoadState("networkidle");

          const puppeteerPage = await puppeteerBrowser
            .pages()
            .then(async (pages) => {
              let currentPage;

              for (const page of pages) {
                const pageId = await page.evaluate(() => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  return (window as any).__pageId;
                });

                if (pageId === videoFn.__videoName) {
                  currentPage = page;
                  break;
                }
              }

              if (!currentPage) {
                throw new Error(
                  `Could not find page with id ${videoFn.__videoName}`
                );
              }

              return currentPage;
            });

          await puppeteerPage.setViewport({
            width: selectedDevice.device.viewport.width,
            height: selectedDevice.device.viewport.height,
            deviceScaleFactor: selectedDevice.device.deviceScaleFactor,
            hasTouch: selectedDevice.device.hasTouch,
            isMobile: selectedDevice.device.isMobile,
          });

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore -- Idk puppeteer types are weird
          const recorder = new PuppeteerScreenRecorder(puppeteerPage, {
            fps: 60,
            videoFrame: {
              width: Math.round(
                selectedDevice.device.viewport.width *
                  selectedDevice.device.deviceScaleFactor
              ),
              height: Math.round(
                selectedDevice.device.viewport.height *
                  selectedDevice.device.deviceScaleFactor
              ),
            },
            videoCodec: "libx264",
            videoCrf: 0,
            videoPreset: "ultrafast",
          });

          const outputVideoPath = path.resolve(
            videosFolder,
            [videoFn.__videoName, selectedDevice.suffix, "mp4"]
              .filter(Boolean)
              .join(".")
          );

          try {
            await recorder.start(outputVideoPath);
            await videoFn({ page });
          } catch (error) {
            console.error(error);
          }

          await recorder.stop();
          await page.close();
          await context.close();
        }
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await puppeteerBrowser?.close();
    await browser?.close();
  }
}

main();
