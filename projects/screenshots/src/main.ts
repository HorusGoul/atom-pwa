import { chromium, devices, Browser } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT_DIR = path.resolve(__dirname, "..");
const SCREENSHOTS_OUTPUT_DIR = path.resolve(ROOT_DIR, "screenshots");

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
  let browser: Browser | null = null;

  try {
    console.log("Starting browser");
    browser = await chromium.launch({ headless: true });

    for (const language of languages) {
      for (const selectedDevice of selectedDevices) {
        const screenshotsFolder = path.resolve(
          SCREENSHOTS_OUTPUT_DIR,
          language,
          selectedDevice.folder
        );

        console.log(
          `Taking screenshots for ${language} on ${selectedDevice.folder} saved to ${screenshotsFolder}`
        );

        await mkdir(screenshotsFolder, { recursive: true });

        const context = await browser.newContext({
          ...selectedDevice.device,
          locale: language,
          baseURL: "https://next--atom-pt.netlify.app",
        });

        console.log("Importing screenshots module");

        await import("./screenshots/all-screenshots");

        for (const screenshotFn of global.__screenshots.values()) {
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
        }

        await context.close();
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await browser?.close();
  }
}

main();
