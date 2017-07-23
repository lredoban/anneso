<template>
  <main v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <Welcome class="swiper-slide"/>
      <About class="swiper-slide" @jump-to-contact="slideTo(sections.length - 1)" :content="about.content" :title="about.title"/>
      <Portfolio class="swiper-slide" id="portfolio" :projects="projects" :categories="categories" @show="showProject"/>
      <Contact class="swiper-slide" :content="contact.content" :title="contact.title"/>
    </div>
    <nav>
      <ul class="menu"></ul>
    </nav>
    <modal name="project"
      :adaptive="true"
      @opened="beforeOpen"
      @closed="beforeClose"
      width="100%" height="100%">
      <div slot="top-right">
        <button @click="$modal.hide('project')">
          ❌
        </button>
      </div>
      <div v-html="project">

      </div>
    </modal>
  </main>
</template>

<script>
import Welcome from '~components/Welcome.vue'
import About from '~components/About.vue'
import Portfolio from '~components/Portfolio.vue'
import Contact from '~components/Contact.vue'
import { getPages, getCategories, getProjects } from '~plugins/contentful.js'

const _sections = [
  '#welcome',
  '#about',
  '#portfolio',
  '#contact'
]

export default {
  async asyncData ({ params }) {
    let { about, contact } = await getPages()
    let categories = await getCategories()
    let projects = await getProjects()
    return { about, contact, categories, projects }
  },
  data: () => {
    return {
      current: 0,
      sections: _sections,
      project: '',
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
    },
    showProject: function (content) {
      this.project = content
      this.$modal.show('project')
    },
    beforeOpen: function (event) {
      if (event.state) {
        this.mySwiper.disableMousewheelControl()
        this.mySwiper.disableTouchControl()
      } else {
        this.mySwiper.enableMousewheelControl()
        this.mySwiper.enableTouchControl()
      }
    },
    beforeClose: function (event) {
      // console.info('beforeClose')
      // this.mySwiper.enableMousewheelControl()
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
  .v--modal-top-right
    z-index: 1
  .v--modal-overlay .v--modal-box
    overflow: auto
  .v--modal
    background: rgba(255,255,255,0.92)
</style>
