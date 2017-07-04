import Vue from 'vue'

if (process.BROWSER_BUILD) {
  const VueTouch = require('vue-touch')
  Vue.use(VueTouch)
}
