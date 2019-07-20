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
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
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
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
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
      margin-left: 0.3em
      text-transform: capitalize
      cursor: pointer
      span
        transition: color 0.4s ease
      &::before
        content: "/"
        margin-right: 0.3em
      &:first-child::before
        content: none
      &.current span
        color: $pink
        border-bottom: 2px solid $pink
      &:hover span
        color: $pink

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
  .swiper-slide-prev .item::before,
  .swiper-slide-next .item::before
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
    background: $purple
    height: 2.5em
    width: 2.5em
    border-radius: 2em
    margin-top: 1em
    &:hover
      background: rgba($pink, 0.85)
    @media #{$small-up}
      display: block
    &::before, &::after
      content: ""
      position: absolute
      background: $blue
      top: 50%
      left: 50%
      width: 50%
      height: 3px
      border-radius: 3px
  .swiper-button-prev
    animation: moveLeft 2.7s infinite
    &::before
      transform-origin: left
      transform: translate(-50%, calc(-50% - 1px)) rotate(45deg)
    &::after
      transform-origin: left
      transform: translate(-50%, calc(-50% + 1px)) rotate(-45deg)
  .swiper-button-next
    animation: moveRight 2.7s infinite
    &::before
      transform-origin: right
      transform: translate(-50%, calc(-50% + 1px)) rotate(45deg)
    &::after
      transform-origin: right
      transform: translate(-50%, calc(-50% - 1px)) rotate(-45deg)
@keyframes moveRight
  0%
    transform: translateX(0%)
  27%
    transform: translateX(17%)
  100%
    transform: translateX(0%)
@keyframes moveLeft
  0%
    transform: translateX(0%)
  27%
    transform: translateX(-17%)
  100%
    transform: translateX(0%)
</style>

<style lang="sass">
.swiper-pagination-bullet
  margin: 0 0.3em
</style>
