<template>
  <div :class="[mobileHide? 'mobile-hide': '']">
    <p>
      <slot>Scroll Down</slot>
    </p>
    <img src="/img/scroll-down.svg" alt="Scroll Down">
  </div>
</template>

<script>
  export default {
    props: ['mobileHide']
  }
</script>

<style lang="sass" scoped>
  @import "~assets/css/variables"

  div
    position: absolute
    bottom: 100px
    text-align: center
    color: $purple
    text-transform: uppercase
    bottom: 1em
    left: 50%
    transform: translateX(-50%)
    p
      font-size: .7em
      padding: 1em
    img
      width: 30px
      animation: move 2.7s infinite
  @media screen and (max-width: 640px)
    div.mobile-hide
      display: none
  @keyframes move
    0%
      transform: translateY(0%)
    27%
      transform: translateY(50%)
    100%
      transform: translateY(0%)
</style>
