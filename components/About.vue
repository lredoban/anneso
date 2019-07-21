<template>
  <section
    class="about container"
    :style="{ 'background-image': `url(${backgroundImage})` }"
  >
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
  props: ['title', 'content', 'button', 'backgroundImage'],
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
  background-position: 99999px 99999px
  background-repeat: no-repeat
  @media #{$medium-up}
    background-position: 0 0
    background-size: 50vh
    background-position: bottom left
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
