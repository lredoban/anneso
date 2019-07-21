<template>
  <section>
    <div class="welcome container">
      <h1 class="hidden">
        Welcome
      </h1>
      <img src="~assets/welcome.svg" alt="Welcome" />
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

export default {
  components: {
    Infotip
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/css/helpers"
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
  bottom: 0
  left: 0
  font-size: .8em
  position: absolute
  width: 100vh
  color: $secondary
  transform-origin: left
  transform: rotate(-90deg)
  margin-left: 3em
  text-align: left
  @media #{$small-up}
    text-align: center
  span:last-child
    margin-left: 1em
    @media #{$small-up}
      margin-left: 7em
</style>
