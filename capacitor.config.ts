import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'SvatkyApp',
  webDir: 'www',

  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Doba zobrazení splashscreenu v milisekundách
      launchAutoHide: true, // Automatické skrytí splashscreenu
      backgroundColor: '#ffffffff', // Barva pozadí (RGBA formát)
      androidSplashResourceName: 'splash', // Název souboru pro Android
      iosSplashResourceName: 'Default', // Název souboru pro iOS
      showSpinner: true, // Zobrazit spinner během načítání
      spinnerColor: '#000000', // Barva spinneru
    },
  },
};

export default config;
