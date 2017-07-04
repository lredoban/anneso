<template>
  <v-touch
    @swipeup="goDown"
    @swipedown="goUp"
    @DOMMouseScroll="scroll"
    @mousewheel="scroll">
    <aside>
      <nav>
        <ul>
          <li v-for="(section, index) in sections"
            @click="current = index"
            :class="[ index === current ? 'current': '' ]">
                <span>{{ section.slice(1, section.length) }}</span>
          </li>
        </ul>
      </nav>
    </aside>
    <Welcome/>
    <About @jump-to-contact="currentToContact"/>
    <Portfolio id="portfolio"/>
    <Contact/>
  </v-touch>
</template>

<script>
import Welcome from '~components/Welcome.vue'
import About from '~components/About.vue'
import Portfolio from '~components/Portfolio.vue'
import Contact from '~components/Contact.vue'
import Jump from 'jump.js'

export default {
  mounted: function () {
    window.addEventListener('keyup', e => {
      if (this.scrolling) {
        return false
      }
      e.key === 'ArrowUp' ? this.goUp() : this.goDown()
    })
  },
  data: () => {
    return {
      sections: [
        '#welcome',
        '#about',
        '#portfolio',
        '#contact'
      ],
      current: 0,
      scrolling: false
    }
  },
  components: {
    Welcome,
    About,
    Portfolio,
    Contact
  },
  methods: {
    scroll: function (e) {
      if (this.scrolling) {
        return false
      }
      e.deltaY < 0 ? this.goUp() : this.goDown()
      return false
    },
    goUp: function () {
      this.current = this.current === 0 ? 0 : this.current - 1
    },
    goDown: function () {
      this.current = this.current === this.sections.length - 1 ? this.current : this.current + 1
    },
    currentToContact: function () {
      this.current = this.sections.length - 1
    }
  },
  watch: {
    current: function (index) {
      this.scrolling = true
      Jump(this.sections[index], {
        callback: () => {
          this.scrolling = false
          return false
        }
      })
    }
  }
}
</script>

<style lang='sass'>
  @import ~assets/css/style

  aside
    position: fixed
    top: 3em
    right: 0
    z-index: 3
    ul
      display: flex
      flex-direction: column
      align-items: flex-end
    li
      list-style-type: none
      text-align: right
      height: 0px
      width: 2em
      margin: .5em 0
      border-top: 2px solid $purple
      transition: width .4s ease-in-out .1s, height .4s ease-in-out, color .4s ease
      cursor: pointer
      span
        opacity: 0
        transition: opacity .4s ease-in
      &.current
        width: 3em
        margin-left: -1em
    ul:hover
      li
        height: 1.4em
        width: 100%
        padding-right: 5px
        transition: width .4s ease-in-out, height .4s ease-in-out .2s
        span
          opacity: 1
          transition: opacity .4s ease-in .4s
        &:hover
          color: $purple
        &.current
          color: $purple
          margin-left: 0
</style>
