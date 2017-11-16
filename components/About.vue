<template>
  <section id="about" class="container">
      <h2>{{ title }}</h2>
      <div v-html="content"></div>
      <button class="btn" @click="jump" type="button">
        <span>Me contacter</span>
      </button>
      <Infotip :mobile-hide='true'>Portfolio</Infotip>
  </section>
</template>

<script>
  import Infotip from '~components/Infotip.vue'

  export default{
    props: ['title', 'content'],
    components: {
      Infotip
    },
    methods: {
      jump: function () {
        this.$emit('jump-to-contact')
      }
    }
  }
</script>

<style lang="sass">
  @import "~assets/css/helpers"

  #about
    flex-direction: column

  @media #{$medium-up}
    #about
      background: url('~assets/bg-about.png')
      background-repeat: no-repeat
      background-size: 50vh
      background-position: bottom left
</style>
