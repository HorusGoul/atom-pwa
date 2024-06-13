import type { Page } from "playwright";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
  // eslint-disable-next-line no-var
  var __videos: Map<string, VideoFunction>;
}

global.__videos = new Map();

interface VideoUserFunctionParams {
  page: Page;
}

type VideoUserFunction = (params: VideoUserFunctionParams) => Promise<void>;

interface VideoFunctionParams {
  page: Page;
}

type VideoFunction = ((params: VideoFunctionParams) => Promise<void>) & {
  __isVideoFunction: true;
  __videoName: string;
};

export function video(name: string, fn: VideoUserFunction): VideoFunction {
  const wrappedFn: VideoFunction = async ({ page }) => {
    await fn({
      page,
    });
  };

  wrappedFn.__isVideoFunction = true;
  wrappedFn.__videoName = name;
  global.__videos.set(name, wrappedFn);

  return wrappedFn;
}

export function isVideoFunction(fn: unknown): fn is VideoFunction {
  return (
    typeof fn === "function" &&
    "__isVideoFunction" in fn &&
    fn.__isVideoFunction === true
  );
}
