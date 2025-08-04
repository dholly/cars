// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/image', '@vueuse/nuxt', '@pinia/nuxt'],
  vueuse: {
    ssrHandlers: true,
  },
  css: [
    '~/styles/global-styles.scss',
  ],
  vite:{
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '[name].[ext]'
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // api: 'modern-compiler',
          additionalData: '@use "~/styles/_mixins.scss" as *;',
        }
      }
    }
  },
})