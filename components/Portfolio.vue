<template>
  <section class="fancy">
    <div class="container">
      <h2>Portfolio</h2>
      <ul class="filter">
        <li :class="{current: isCurrent('tout')}" @click="currentCategory='tout'"><span>Tout</span></li>
        <li :class="{current: isCurrent(cat)}" v-for="cat in categories" @click="setCurrent(cat)"><span>{{ cat }}</span></li>
      </ul>
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="project.title" v-for="project in filteredProjects">
          <div class="item" @click="showProject(project.content)">
            <img :src="project.featuredImage" :alt="project.title">
            <div class="overlay">
              <h3>{{ project.title }}</h3>
              <p>{{ project.categories.join(' - ') }}</p>
            </div>
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
  export default{
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
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 10,
              slidesPerColumn: 1
            },
            420: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 10,
              slidesPerColumn: 1
            }
          }
        }
      }
    },
    computed: {
      filteredProjects: function () {
        if (this.currentCategory === 'tout') {
          return this.projects
        }
        return this.projects.filter(p => p.categories.includes(this.currentCategory))
      }
    },
    methods: {
      isCurrent: function (cat) {
        return cat === this.currentCategory
      },
      setCurrent: function (cat) {
        this.currentCategory = cat
        this.$nextTick(function () {
          this.mySwiper.update()
        })
      },
      showProject: function (content) {
        this.$emit('show', content)
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
      margin-bottom: 2em
      padding-left: 0
      @media #{$small-up}
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
      flex-direction: column
      margin-top: 1em
    @media #{$small-up}
      .container
        flex-direction: row
        align-items: center
      .filter
        margin-bottom: 0
        padding-top: 1.5em
    .swiper-container
      width: 60%
      @media #{$small-up}
        width: 80%
    .swiper-wrapper
      display: flex
    .item
      position: relative
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
      border-radius: 50%
      cursor: pointer
      &:hover
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
      &::after
        content: ""
        opacity: 0
        position: absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
        border-radius: 50%
        transition: opacity .5s ease
        background: rgba(255, 255, 255, 0.6)
      p
        margin: 0 auto
    .swiper-pagination
      margin-bottom: 1em
      position: relative
    .swiper-button-prev, .swiper-button-next
      background: $purple
      height: 2.5em
      width: 2.5em
      border-radius: 2em
      margin-top: 2.5em
      @media #{$small-up}
        margin-top: 1em
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
      &::before
        transform-origin: left
        transform: translate(-50%, calc(-50% - 1px)) rotate(45deg)
      &::after
        transform-origin: left
        transform: translate(-50%, calc(-50% + 1px)) rotate(-45deg)
    .swiper-button-next
      &::before
        transform-origin: right
        transform: translate(-50%, calc(-50% + 1px)) rotate(45deg)
      &::after
        transform-origin: right
        transform: translate(-50%, calc(-50% - 1px)) rotate(-45deg)
</style>

<style lang="sass">
  .swiper-pagination-bullet
    margin: 0 0.3em
</style>
