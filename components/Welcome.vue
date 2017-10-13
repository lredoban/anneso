<template>
  <section class="fancy">
    <div id="welcome" class="container">
      <h1 class="hidden">Welcome</h1>
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
  export default{
    components: {
      Infotip
    },
    mounted () {
      if (process.BROWSER_BUILD) {
        this.$el.addEventListener('mousemove', throttle(this.updateGradient, 80))
      }
    },
    methods: {
      updateGradient ({x, y}) {
        const intensityMax = 42
        const pos = {x, y}
        const max = {x: window.innerWidth / 2, y: window.innerHeight / 2}
        const centeredPos = {
          x: pos.x - Math.floor(max.x),
          y: pos.y - Math.floor(max.y)
        }
        const radAngle = Math.atan2(-centeredPos.x, centeredPos.y)
        const degAngle = Math.floor(this.convertRadInDeg(radAngle))
        // ne calculer que au début et lors d'un resize
        const distanceMax = this.pythagore(max.x, max.y)
        const distance = this.pythagore(centeredPos.x, centeredPos.y)
        const intensity = intensityMax - (distance * intensityMax / distanceMax)
        console.warn(`${degAngle}°`, distance, distanceMax, intensity)
        // this.setBackground(this.$el, degAngle, intensity)
      },
      setBackground (el, deg, intensity) {
        el.style.background = `linear-gradient(${deg}deg, #09d4ff ${intensity}%, #0978f5)`
      },
      convertRadInDeg (angle) {
        return angle * 360 / (2 * Math.PI)
      },
      pythagore (x, y) {
        return Math.floor(Math.sqrt(x * x + y * y))
      }
    }
  }
</script>

<style lang="sass">
@import "~assets/css/helpers"
#welcome img
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
  span:last-child
    margin-left: 7em
</style>
