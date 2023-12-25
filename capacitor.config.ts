import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myApp',
  appName: 'myApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
