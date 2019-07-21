<template>
  <section class="about container">
    <h2>
      {{ title }}
    </h2>
    <div class="about-text" v-html="content"></div>
    <button class="btn" type="button" @click="jump">
      <span class="btn_hover"></span>
      <span>{{ button }}</span>
    </button>
    <Infotip :mobile-hide="true">
      Projets
    </Infotip>
  </section>
</template>

<script>
import Infotip from '~/components/Infotip.vue'

export default {
  components: {
    Infotip
  },
  props: ['title', 'content', 'button'],
  methods: {
    jump: function() {
      this.$emit('jump-to-contact')
    }
  }
}
</script>

<style lang="sass">
@import "~assets/css/helpers"

.about
  flex-direction: column
  .btn
    margin-top: 2rem
  h2
    font-family: $abril

.about-text
  margin: 0
  @media #{$medium-up}
    margin: 3em 0
  > *
    margin: 0 auto

p
  line-height: 1.5em
  @media #{$small-up}
    line-height: 1.8em
</style>
