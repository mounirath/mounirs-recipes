import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mounirath.recipes',
  appName: "Mounir's Recipes",
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
