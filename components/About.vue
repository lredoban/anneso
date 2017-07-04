<template>
  <section id="about" class="container">
      <h1>Mon profil</h1>
      <p>Anne-Fofie, 25 ans, <strong>graphiste web & print</strong> bretonne-parisienne depuis 2014 et forte d'une expérience en agence depuis 2013, je vous propoqe tout mon <strong>savoir faire</strong> et ma <strong>passion</strong> afin de construitr ensemble tous vos projets graphiques : du web au print, pour votre entreprise ou un porjet personnel, à proximité ou à distance !</p>
      <button class="btn" @click="jump" type="button" >Me contacter</button>
      <Infotip :mobile-hide='true'>Portfolio</Infotip>
  </section>
</template>

<script>
  import Infotip from '~components/Infotip.vue'

  export default{
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
  @import "~assets/css/variables"

  @media screen and (min-width: 641px)
    #about
      background: url('~assets/bg-about.png')
      background-repeat: no-repeat
      background-size: 50vh
      background-position: bottom left
</style>
