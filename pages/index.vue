<template>
  <main v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <Welcome class="swiper-slide"/>
      <About class="swiper-slide" @jump-to-contact="slideTo(sections.length - 1)" :content="about"/>
      <Portfolio class="swiper-slide" id="portfolio" :portfolio="portfolio"/>
      <Contact class="swiper-slide" :content="contact"/>
    </div>
    <nav>
      <ul class="menu"></ul>
    </nav>
  </main>
</template>

<script>
import Welcome from '~components/Welcome.vue'
import About from '~components/About.vue'
import Portfolio from '~components/Portfolio.vue'
import Contact from '~components/Contact.vue'
import { getSection, getProjects } from '~plugins/gistGetter.js'
import axios from 'axios'

const _sections = [
  '#welcome',
  '#about',
  '#portfolio',
  '#contact'
]

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://api.github.com/gists/9ecff89f9b61fdd15d2957a8b0057d5d`)
    return {
      about: getSection(data.files, 'about'),
      contact: getSection(data.files, 'contact'),
      portfolio: getProjects(data.files)
    }
  },
  data: () => {
    return {
      current: 0,
      sections: _sections,
      swiperOption: {
        slidesPerView: 1,
        pagination: '.menu',
        paginationClickable: true,
        direction: 'vertical',
        mousewheelControl: true,
        speed: 700,
        paginationBulletRender: (swiper, index, className) =>
          `<li class="${className}"><span>${_sections[index].slice(1, _sections[index].length)}</span></li>`
      }
    }
  },
  components: {
    Welcome,
    About,
    Portfolio,
    Contact
  },
  methods: {
    slideTo: function (index) {
      this.mySwiper.slideTo(index)
    }
  }
}
</script>

<style lang='sass'>
  @import ~assets/css/helpers

  main.swiper-container
    width: 100%
    height: 100vh
  nav
    position: fixed
    top: 3em
    right: 0
    z-index: 3
  .menu
    display: flex
    flex-direction: column
    align-items: flex-end
    li.swiper-pagination-bullet
      list-style-type: none
      text-align: right
      height: 0px
      width: 2em
      margin: .5em 0
      border-top: 2px solid $purple
      border-radius: 0
      transition: width .4s ease-in-out .1s, height .4s ease-in-out, color .4s ease
      cursor: pointer
      background: none
      color: $primary
      opacity: 1
      span
        display: inline
        opacity: 0
        transition: opacity .4s ease-in
      &-active
        width: 3em
        margin-left: -1em
  .menu:hover
    li.swiper-pagination-bullet
      height: 1.4em
      width: 100%
      padding-right: 5px
      transition: width .4s ease-in-out, height .4s ease-in-out .2s
      span
        opacity: 1
        transition: opacity .4s ease-in .4s
      &-active
        color: $purple
        margin-left: 0
      &:hover
        color: $purple
</style>
