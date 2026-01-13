export type BrowserProfile = {
  type: string;
  browser: string;
  app: string;
  path: string;
  name: string;
  icon: string;
};

export type Browser = {
  type: string;
  app: string;
  path: string;
  icon: string;
  title: string;
};

export type BrowserProfiles = {
  name: string;
  profiles: BrowserProfile[];
};
