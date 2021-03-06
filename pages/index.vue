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
        @jump-to-contact="slideTo('contact')"
      />
      <Portfolio
        v-model="currentCategory"
        class="section"
        :projects="filteredProjects"
        :categories="categories"
        @show="showProject"
      />
      <Contact
        class="section"
        :content="contact.content"
        :title="contact.title"
        :button="contact.button"
        :response="contact.message"
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
    <modal
      name="project"
      :adaptive="true"
      width="100%"
      height="100%"
      @before-open="() => scrollFn(false)"
      @before-close="() => scrollFn(true)"
    >
      <div slot="top-right">
        <button class="close mobile-hide" @click="$modal.hide('project')">
          <span>❌</span>
        </button>
      </div>
      <div @click.self="$modal.hide('project')">
        <div v-if="project" class="project">
          <div class="project-nav mobile-hide">
            <button
              class="prev"
              :disabled="project.index === 0"
              @click="showPrev"
            >
              <svg
                v-if="project.index !== 0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35 21"
              >
                <path
                  d="M1.734 10.5H31.96m-7.455-8.957l8.957 8.957-8.957 8.957"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-width="2"
                />
              </svg>
            </button>
            <h3>
              {{ project.title }}
            </h3>
            <button
              class="next"
              :disabled="project.index === filteredProjects.length - 1"
              @click="showNext"
            >
              <svg
                v-if="project.index !== filteredProjects.length - 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35 21"
              >
                <path
                  d="M1.734 10.5H31.96m-7.455-8.957l8.957 8.957-8.957 8.957"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>
          <h4 class="mobile-hide">{{ project.categories.join(' & ') }}</h4>
          <nav class="project-mobile-nav">
            <div>
              <button
                class="prev"
                :disabled="project.index === 0"
                @click="showPrev"
              >
                <svg
                  v-if="project.index !== 0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 21"
                >
                  <path
                    d="M1.734 10.5H31.96m-7.455-8.957l8.957 8.957-8.957 8.957"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                </svg>
              </button>
              <button
                class="next"
                :disabled="project.index === filteredProjects.length - 1"
                @click="showNext"
              >
                <svg
                  v-if="project.index !== filteredProjects.length - 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 21"
                >
                  <path
                    d="M1.734 10.5H31.96m-7.455-8.957l8.957 8.957-8.957 8.957"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                </svg>
              </button>
            </div>
            <button class="close" @click="$modal.hide('project')">
              <span>❌</span>
            </button>
          </nav>
          <h3 class="project-mobile-title">
            {{ project.title }}
          </h3>
          <div v-html="project.content"></div>
        </div>
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
      loaded: false,
      currentCategory: 'tout',
      scrollFn: null
    }
  },
  computed: {
    filteredProjects: function() {
      if (this.currentCategory === 'tout') {
        return this.projects.map((p, index) => ({ ...p, index }))
      }
      return this.projects
        .filter(p => p.categories.includes(this.currentCategory))
        .map((p, index) => ({ ...p, index }))
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
        menu: '.menu',
        afterRender: () => {
          _.loaded = true
          _.scrollFn = $.fn.fullpage.setAllowScrolling
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
    },
    showPrev() {
      this.project = this.filteredProjects[this.project.index - 1]
    },
    showNext() {
      this.project = this.filteredProjects[this.project.index + 1]
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
    position: relative
    list-style-type: none
    text-align: right
    height: 0px
    width: 1.1em
    @media #{$small-up}
      width: 1.9em
    margin: .5em 0
    transition: width .4s ease-in-out .1s, height .4s ease-in-out, color .4s ease
    cursor: pointer
    background: none
    color: $secondary
    opacity: 1
    &::before
      content: ''
      position: absolute
      height: 2px
      width: 100%
      background-color: $secondary
      top: -2px
      left: 0
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
      &::before
        transform: translateX(2em)
      span
        opacity: 1
        transition: opacity .4s ease-in .4s
      &.active
        color: $secondary
        margin-left: 0
        &::before
          transform: translateX(0)
          transition: transform .4s ease-in-out
      &:hover
        color: darken($secondary, 3%)
.v--modal-top-right
  z-index: 1
.v--modal-overlay .v--modal-box
  overflow-y: scroll !important
  -webkit-overflow-scrolling: touch
.v--modal
  backdrop-filter: blur(4px)
  background: rgba(34, 38, 74, 0.87) !important
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0
</style>
