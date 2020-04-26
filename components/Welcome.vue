<template>
  <section>
    <div class="welcome container">
      <h1 class="hidden">
        Welcome
      </h1>
      <img
        ref="img"
        src="~assets/welcome.svg"
        alt="Welcome"
        :style="`transform: translate(${x}px , ${y}px)`"
      />
    </div>
    <Infotip />
    <div class="copyright">
      Anne-Sophie Rimasson, Artistic Director & Graphic Designer - Copyright -
      {{ new Date().getFullYear() }}
    </div>
  </section>
</template>

<script>
import Infotip from '~/components/Infotip.vue'
import { throttle } from 'lodash'

export default {
  components: {
    Infotip
  },
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  mounted() {
    document.onmousemove = throttle(this.mouseEvt, 100)
  },
  methods: {
    mouseEvt(ev) {
      this.x = (window.innerWidth / 2 - ev.x) / 4
      this.y = (window.innerHeight / 2 - ev.y) / 4
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/css/helpers"
img
  transition: transform 250ms ease-out
  will-change: transform
section
  background-color: $bg-purple
.welcome
  width: 90vw
  max-width: 520px
  margin: 0 auto
  img
    width: 100%
    padding-left: 2rem
    padding-bottom: 4rem
.copyright
  position: absolute
  top: 0
  bottom: 0
  text-align: center
  transform: rotate(180deg)
  writing-mode: vertical-rl
  font-size: .8em
  color: $secondary
  @media #{$small-up}
    margin-left: 2rem
  span:last-child
    margin-left: 1em
    @media #{$small-up}
      margin-left: 7em
</style>
