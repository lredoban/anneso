module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Annefo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: 'Anne-Sophie Rimasson Portfolio' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { property: 'og:title', content: 'Anne-Sophie Rimasson Portfolio' },
      { property: 'og:site_name', content: 'Anne-Sophie' },
      { property: 'og:url', content: 'https://annefo.surge.sh' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'Anne-Sophie Rimasson Portfolio' },
      { property: 'og:image', content: 'img/welcome640.png' },
      { name: 'theme-color', content: '#0978f5' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'swiper'
    ]
  },
  plugins: [
    { src: '~plugins/swiper.js', ssr: false },
    '~plugins/vue-js-modal',
    '~plugins/vuelidate'
  ],
  css: [
    'swiper/dist/css/swiper.css'
  ]
}
