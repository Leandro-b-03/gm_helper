// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import tailwindcss from "@tailwindcss/vite";
const primeui = require('tailwindcss-primeui');

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    "nuxt-appwrite",
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
  ],
  appwrite: {
    endpoint: 'https://cloud.appwrite.io/v1',
    project: '67b7ba420020f16cc61a',
  },
  i18n: {
    locales: [
      {
        code: 'pt',
        name: 'Português (BR)',
        file: 'pt.json'
      },
    ],
    lazy: true,
    defaultLocale: 'pt',
  },
  primevue: {
    options: {  
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: '.p-dark',
          cssLayer: false
        },
      }
    },
    components: {
      include: '*', // Include all components
    },
    directives: {
      include: '*', // Include all directives
    }
  },
  runtimeConfig: {
    public: {
      url: process.env.URL,
      databaseID: process.env.DATABASE,
      npcCollectionID: process.env.NPCS,
      itemsCollectionID: process.env.ITEMS,
      enemiesCollectionID: process.env.ENEMIES,
      initiativeCollectionID: process.env.INITIATIVE
    },
    deepseekUrl: process.env.DEEPSEEK_URL,
    deepseekKey: process.env.DEEPSEEK_API_KEY,
  },
});