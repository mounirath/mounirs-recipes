import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mounirath.recipes',
  appName: "Formule DZ",
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
