<template>
  <section class="fancy">
    <div class="welcome container">
      <h1>Test Dev Branch</h1>
      <img src="~assets/welcome.png"
        srcset="
          /img/welcome288.png 288w,
          /img/welcome378.png 378w,
          /img/welcome640.png 640w,
          /img/welcome1280.png 1280w
        "
        size="(min-width: 640px) 640px, 90vw"
        alt="Welcome">
    </div>
    <Infotip/>
    <div class="copyright">
      <span>Anne-Fofie Rimasson, Graphiste web et print</span>
      <span>copyright - {{new Date().getFullYear()}}</span>
    </div>
  </section>
</template>

<script>
  import Infotip from '~components/Infotip.vue'
  import throttle from 'lodash/throttle'
  import debounce from 'lodash/debounce'

  const degMax = 112
  const degMin = 27
  const degDiff = degMax - degMin
  const intensityMax = 42

  export default{
    components: {
      Infotip
    },
    data () {
      return {
        max: { x: 0, y: 0 }
      }
    },
    mounted () {
      if (process.BROWSER_BUILD) {
        this.setMax()
        this.$el.addEventListener('mousemove', throttle(this.updateGradient, 77))
        window.addEventListener('resize', debounce(this.setMax, 500))
      }
    },
    methods: {
      updateGradient ({x, y}) {
        const pos = {x, y}
        const angle = Math.round((pos.y * degDiff / this.max.y) + degMin)
        const intensity = Math.round(pos.x * intensityMax / this.max.x)

        this.setBackground(this.$el, angle, intensity)
      },
      setBackground (el, deg, intensity) {
        el.style.background = `linear-gradient(${deg}deg, #09d4ff ${intensity}%, #0978f5)`
      },
      setMax () {
        this.max = {x: window.innerWidth, y: window.innerHeight}
      }
    }
  }
</script>

<style lang="sass">
@import "~assets/css/helpers"
.welcome img
  width: 90vw
  max-width: 640px
  margin: 0 auto
.copyright
  bottom: 0
  left: 0
  font-size: .8em
  position: absolute
  width: 100vh
  color: $white
  transform-origin: left
  transform: rotate(-90deg)
  margin-left: 1em
  opacity: .5
  text-align: left
  @media #{$small-up}
    text-align: center
  span:last-child
    margin-left: 1em
    @media #{$small-up}
      margin-left: 7em
</style>
