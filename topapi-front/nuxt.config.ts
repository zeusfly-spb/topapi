import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {baseURL: '/panel'},
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost/api',
      storageBase: process.env.NUXT_PUBLIC_API_BASE.slice(0, -4) + '/storage',
      imageBase: process.env.NUXT_PUBLIC_API_BASE.slice(0, -4) + '/img',
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  buildModules: [
    '@pinia/nuxt',
    ['@nuxtjs/vuetify', {iconfont: 'mdi'}],
    '@nuxtjs/dotenv'
  ],
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
