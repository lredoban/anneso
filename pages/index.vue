<template>
  <main>
    <transition name="fade">
      <div v-if="!loaded" id="loader">
        <Spinner />
      </div>
    </transition>
    <div id="fullpage">
      <Welcome class="section" />
      <About
        class="section"
        :content="about.content"
        :title="about.title"
        :button="about.button"
        :background-image="about.backgroundImage"
        @jump-to-contact="slideTo('contact')"
      />
      <Portfolio
        class="section"
        :projects="projects"
        :categories="categories"
        @show="showProject"
      />
      <Contact
        class="section"
        :content="contact.content"
        :title="contact.title"
        :button="contact.button"
        :response="contact.message"
        :background-image="contact.backgroundImage"
        :is-dev="isDev"
      />
    </div>
    <nav v-show="loaded">
      <ul class="menu">
        <li data-menuanchor="welcome" @click="slideTo('welcome')">
          <span>Welcome</span>
        </li>
        <li data-menuanchor="about" @click="slideTo('about')">
          <span>About</span>
        </li>
        <li data-menuanchor="portfolio" @click="slideTo('portfolio')">
          <span>Projets</span>
        </li>
        <li data-menuanchor="contact" @click="slideTo('contact')">
          <span>contact</span>
        </li>
      </ul>
    </nav>
    <modal name="project" :adaptive="true" width="100%" height="100%">
      <div slot="top-right">
        <button class="close" @click="$modal.hide('project')">
          <span>❌</span>
        </button>
      </div>
      <div v-if="project" class="project">
        <h3>
          {{ project.title }} -
          <small>{{ project.categories.join(' & ') }}</small>
        </h3>
        <div v-html="project.content"></div>
      </div>
    </modal>
  </main>
</template>

<script>
import Welcome from '~/components/Welcome.vue'
import About from '~/components/About.vue'
import Portfolio from '~/components/Portfolio.vue'
import Contact from '~/components/Contact.vue'
import Spinner from '~/components/Spinner.vue'
import { getPages, getCategories, getProjects } from '~/plugins/contentful.js'

const _sections = ['#welcome', '#about', '#portfolio', '#contact']

export default {
  components: {
    Welcome,
    About,
    Portfolio,
    Contact,
    Spinner
  },
  data: () => {
    return {
      current: 0,
      sections: _sections,
      project: '',
      loaded: false
    }
  },
  async asyncData({ params, isDev }) {
    let { about, contact } = await getPages()
    let categories = await getCategories()
    let projects = await getProjects()
    getPages().catch(error => {
      console.warn('couille dans le paté getPages', error)
    })
    getCategories().catch(error => {
      console.warn('couille dans le paté getCategories', error)
    })
    getProjects().catch(error => {
      console.warn('couille dans le paté getProjects', error)
    })
    return { about, contact, categories, projects, isDev }
  },
  mounted: function() {
    const _ = this
    $(document).ready(function() {
      // eslint-disable-line no-undef
      $('#fullpage').fullpage({
        // eslint-disable-line no-undef
        anchors: ['welcome', 'about', 'portfolio', 'contact'],
        normalScrollElements: '.project',
        menu: '.menu',
        afterRender: () => {
          _.loaded = true
        }
      })
    })
  },
  methods: {
    slideTo: function(section) {
      $.fn.fullpage.moveTo(section) // eslint-disable-line no-undef
    },
    showProject: function(project) {
      this.project = project
      this.$modal.show('project')
    }
  }
}
</script>

<style lang="sass">
@import ~assets/css/helpers
@import ~assets/css/project

#loader
  position: absolute
  width: 100vw
  height: 100vh
  background: white
  z-index: 4242
  display: grid
  justify-items: center
  align-items: center
  .spinner
    height: 50px
    width: 50px
    border-radius: 100%
    background: transparent
    border-top: 4px solid mistypink
    border-right: 4px solid mistypink

main.swiper-container
  width: 100%
  height: 100vh
main > .swiper-wrapper > .swiper-slide:first-child
  height: 100vh
  z-index: 6
nav
  position: fixed
  top: 3em
  right: 0
  z-index: 10
.menu
  display: flex
  flex-direction: column
  align-items: flex-end
  transform: translateY(-36px)
  @media #{$small-up}
    transform: translateY(0)
  li
    list-style-type: none
    text-align: right
    height: 0px
    width: 1.1em
    @media #{$small-up}
      width: 1.9em
    margin: .5em 0
    border-top: 2px solid $secondary
    border-radius: 0
    transition: width .4s ease-in-out .1s, height .4s ease-in-out, color .4s ease
    cursor: pointer
    background: none
    color: $secondary
    opacity: 1
    span
      display: inline
      opacity: 0
      transition: opacity .4s ease-in
    &.active
      width: 2em
      @media #{$small-up}
        width: 3em
        margin-left: -1em
@media #{$small-up}
  .menu:hover
    li
      height: 1.4em
      width: 100%
      padding-right: 5px
      transition: width .4s ease-in-out, height .4s ease-in-out .2s
      span
        opacity: 1
        transition: opacity .4s ease-in .4s
      &.active
        color: $secondary
        margin-left: 0
      &:hover
        color: darken($secondary, 3%)
.v--modal-top-right
  z-index: 1
.v--modal-overlay .v--modal-box
  overflow-y: scroll !important
  -webkit-overflow-scrolling: touch
.v--modal
  background: rgba(255,255,255,0.92)
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0
</style>
