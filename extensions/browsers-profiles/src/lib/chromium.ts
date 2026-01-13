import fs from "fs";
import os from "os";
import { join } from "path";

import browsers from "./supported-browsers.json";
import { sortProfiles, isBrowserEnabled } from "./utils";
import { BrowserProfile, BrowserProfiles } from "./types";

const readLocalState = (path: string) => {
  try {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  } catch {
    return null;
  }
};

export const getChromiumProfiles = (filter: string[]): BrowserProfiles[] => {
  return browsers.chromium
    .filter((browser) => isBrowserEnabled(filter, browser))
    .map((browser) => {
      const basePath = join(os.homedir(), browser.path);
      const localState = readLocalState(join(basePath, "Local State"));
      const infoCache = localState?.profile?.info_cache as Record<string, { name: string }> | undefined;

      if (!infoCache) return null;

      const profiles: BrowserProfile[] = Object.entries(infoCache).map(([profileDir, { name }]) => ({
        type: browser.type,
        browser: browser.title,
        app: browser.app,
        path: profileDir,
        name,
        icon: browser.icon,
      }));

      sortProfiles(profiles);

      return { name: browser.title, profiles };
    })
    .filter((result): result is BrowserProfiles => result !== null);
};
