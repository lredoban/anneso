<template>
  <section class="fancy">
    <div class="container">
      <h2>Portfolio</h2>
      <ul class="filter">
        <li :class="{ current: isCurrent('tout') }" @click="setCurrent('tout')">
          <span>Tout</span>
        </li>
        <li
          v-for="(cat, i) in categories"
          :key="i"
          :class="{ current: isCurrent(cat) }"
          @click="setCurrent(cat)"
        >
          <span>{{ cat }}</span>
        </li>
      </ul>
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div
          v-for="project in filteredProjects"
          :key="project.title"
          class="swiper-slide"
        >
          <div class="item" @click="handleClick(project, $event)">
            <img :src="project.featuredImage" :alt="project.title" />
            <div class="overlay">
              <h3>{{ project.title }}</h3>
              <p>{{ project.categories.join(' - ') }}</p>
            </div>
          </div>
          <div class="item_informations">
            <h3>{{ project.title }}</h3>
            <p>{{ project.categories.join(' - ') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-button-next">
      <img src="~assets/next-arrow.svg" alt="Next" />
    </div>
    <div class="swiper-button-prev">
      <img src="~assets/prev-arrow.svg" alt="Previous" />
    </div>
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </section>
</template>

<script>
export default {
  props: ['categories', 'projects'],
  data: () => {
    return {
      currentCategory: 'tout',
      swiperOption: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        slidesPerColumn: 2,
        spaceBetween: 30,
        breakpoints: {
          768: {
            // when window width is <= 768px
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 10
          },
          640: {
            // when window width is <= 640px
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 36,
            paginationType: 'fraction',
            slidesPerColumn: 1,
            centeredSlides: true
          }
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    filteredProjects: function() {
      if (this.currentCategory === 'tout') {
        return this.projects
      }
      return this.projects.filter(p =>
        p.categories.includes(this.currentCategory)
      )
    }
  },
  methods: {
    isCurrent: function(cat) {
      return cat === this.currentCategory
    },
    setCurrent: function(cat) {
      this.currentCategory = cat
      this.$nextTick(function() {
        this.mySwiper.update()
      })
    },
    handleClick: function(project, event) {
      if (document.body.clientWidth >= 640) {
        this.$ga.page({
          page: '/project/' + this.handleize(project.title),
          title: project.title
        })
        return this.$emit('show', project)
      }

      const papa =
        event.srcElement.tagName === 'DIV'
          ? event.srcElement.parentNode
          : event.srcElement.parentNode.parentNode.parentNode
      const arrayList = [...papa.classList]
      if (arrayList.includes('swiper-slide-next')) {
        this.mySwiper.slideNext()
      } else if (arrayList.includes('swiper-slide-prev')) {
        this.mySwiper.slidePrev()
      } else {
        this.$emit('show', project)
      }
    },
    handleize: function(str) {
      return str
        .toLowerCase()
        .replace(/[^\w\u00C0-\u024f]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/css/helpers"

.fancy
  flex-direction: column
  justify-content: space-between
  h2
    margin-bottom: 0
  .filter
    margin-bottom: 0
    padding-left: 0
    font-size: 0.9em
    @media #{$small-up}
      font-size: 1em
      padding-left: 2em
    li
      list-style: none
      display: inline-block
      text-align: left
      text-transform: capitalize
      cursor: pointer
      span
        transition: color 0.4s ease
        padding: 2px 4px
        border: 1px solid $white
      &::before
        color: $secondary
        content: "\2022"
        margin: 0 0.7em
      &:first-child::before
        content: none
      &.current span
        background-color: $bg-pink
        padding: 2px 4px
        border: 1px solid #e8e8e8

  .container
    width: 100%
    display: flex
    flex-wrap: wrap
    justify-content: center
    flex-direction: row
    margin-top: 0
  @media #{$small-up}
    .container
      align-items: center
      margin-top: 1em
    .filter
      padding-top: 1.5em
  .swiper-container
    width: 100%
    @media #{$small-up}
      padding: 13px
      width: 90%
  .swiper-wrapper
    display: flex
  .swiper-slide
    padding-top: 20px
    margin-top: 30px
  .item
    position: relative
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
    border-radius: 50%
    cursor: pointer
    &:hover
      @media #{$small-up}
        &::after, .overlay
          opacity: 1
    img
      width: 100%
      border-radius: 50%
      display: block
    .overlay
      opacity: 0
      z-index: 5
      position: absolute
      top: 50%
      left: 50%
      width: 100%
      transform: translate(-50%, -50%)
      transition: opacity .65s ease
      > *
        line-height: 1em
    &::after
      content: ""
      opacity: 1
      position: absolute
      top: 0
      bottom: 0
      right: 0
      left: 0
      border-radius: 50%
      transition: opacity .5s ease
      background: rgba($pink, 0.85)
      @media #{$small-up}
        opacity: 0
        background: rgba(255, 255, 255, 0.85)
    p
      margin: 0 auto
  .swiper-slide-prev,
  .swiper-slide-next
    content: ""
    z-index: 3
    position: absolute
    top: 0
    bottom: 0
    right: 66%
    height: 100%
    width: 32px
    background: url("~static/img/next-previous.svg")
    background-repeat: no-repeat
    background-position: center
    background-size: 70%
    @media #{$small-up}
      display: none
  .swiper-slide-prev .item::before
    left: 66%
    transform: rotate(180deg)
  .swiper-slide-active
    padding-top: 3%
    transform: translateY(6%)
    @media #{$small-up}
      padding-top: 20px
      transform: translateY(0)
    .item
      transform: scale(1.3)
      @media #{$small-up}
        transform: none
        &:hover::after
          opacity: 1
    .item::after
      opacity: 0
    .item_informations
      opacity: 1
      transition: opacity 0.5s ease 0.1s
      > *
        line-height: 1em
  .item_informations
    margin-top: 2.5em
    transition: opacity 0.3s ease
    opacity: 0
    @media #{$small-up}
      display: none
  .swiper-pagination
    margin-bottom: 0
    @media #{$small-up}
      margin-bottom: 1em
    position: relative
  .swiper-button-prev, .swiper-button-next
    display: none
    background: none
    height: 2.5em
    width: 2.5em
    border-radius: 2em
    margin-top: 2em
    transition: transform .5s ease
    outline: none
    @media #{$small-up}
      display: block
  .swiper-button-prev:hover
    transform: translateX(-17%)
  .swiper-button-next:hover
    transform: translateX(17%)
</style>

<style lang="sass">
.swiper-pagination-bullet
  margin: 0 0.3em
</style>
