module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Anne-Sophie Rimasson',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Anne-Sophie Rimasson'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      { property: 'og:title', content: 'Anne-Sophie Rimasson' },
      { property: 'og:site_name', content: 'Anne-Sophie' },
      { property: 'og:url', content: 'https://heyoo.fr' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:description',
        content: 'Anne-Sophie, 25 ans, Graphic designer depuis 2013.'
      },
      { property: 'og:image', content: 'https://heyoo.fr/img/meta.png' },
      { property: 'twitter:image', content: 'https://heyoo.fr/img/meta.png' },
      { name: 'theme-color', content: '#0978f5' }
    ],
    script: [
      {
        src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
        type: 'text/javascript'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.min.js',
        type: 'text/javascript'
      },
      {
        src: 'https://dz11y8g2.twic.pics/?v1',
        type: 'text/javascript'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/2.9.7/jquery.fullpage.min.css'
      }
    ],
    htmlAttrs: {
      lang: 'fr'
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#0978f5' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: process.env.HEYOO_GA,
        autoTracking: {
          skipSamePath: true
        }
      }
    ]
  ],
  plugins: [
    '~plugins/swiper.client.js',
    '~plugins/vue-js-modal',
    '~plugins/vuelidate'
  ],
  css: ['swiper/dist/css/swiper.css'],
  env: {
    space: process.env.HEYOO_SPACE,
    accessToken: process.env.HEYOO_TOKEN
  }
}
