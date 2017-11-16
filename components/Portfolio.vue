<template>
  <section class="fancy">
    <div class="container">
      <h2>Portfolio</h2>
      <ul class="filter">
        <li :class="{current: isCurrent('tout')}" @click="currentCategory='tout'"><span>Tout</span></li>
        <li :class="{current: isCurrent(cat)}" v-for="cat in categories" @click="currentCategory = cat"><span>{{ cat }}</span></li>
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
          spaceBetween: 30
          /* breakpoints: {
            920: {
              slidesPerView: 5,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            420: {
              slidesPerView: 1,
              spaceBetween: 10
            }
          } */
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
      ul
        padding-left: 0
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
    .swiper-container
      width: 80%
    .swiper-wrapper
      display: flex
    .swiper-slide
      img
        width: 100%
    .item
      position: relative
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
      border-radius: 50%
      .overlay
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        background: rgba(255, 255, 255, 0.6)
      p
        margin: 0 auto
    img
      width: 70%
      border-radius: 50%
      position: relative
    .swiper-pagination
      margin-bottom: 1em
      position: relative
</style>

<style lang="sass">
  .swiper-pagination-bullet
    margin: 0 0.3em
</style>
