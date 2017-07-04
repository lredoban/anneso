<template>
  <section class="fancy">
    <div id="welcome" class="container">
      <h1 class="hidden">Welcome</h1>
      <img src="~assets/welcome.png" alt="Welcome">
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

  export default{
    components: {
      Infotip
    }
  }
</script>

<style lang="sass">
@import "~assets/css/variables"
#welcome img
  width: 90%
  max-width: 640px
  margin: 0 auto
.copyright
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
