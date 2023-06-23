import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.applicationtest.app",
  appName: "application-test",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      resetWhenUpdate: true,
    },
  },
};

export default config;
