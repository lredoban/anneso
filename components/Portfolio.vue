<template>
  <section class="fancy">
    <div class="container">
      <h2>Portfolio</h2>
      <ul class="filter">
        <li :class="{current: isCurrent('tout')}" @click="currentCategory='tout'">Tout</li>
        <li :class="{current: isCurrent(cat)}" v-for="cat in categories" @click="currentCategory = cat">{{ cat }}</li>
      </ul>
    </div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="project.title" v-for="project in filteredProjects">
          <div class="item" @click="showProject(project.content)">
            <img :src="project.featuredImage" :alt="project.title">
            <h3>{{ project.title }}</h3>
            <p>{{ project.categories.join(' - ') }}</p>
          </div>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </section>
</template>

<script>
  export default{
    props: ['categories', 'projects'],
    data: () => {
      return {
        currentCategory: 'tout',
        swiperOption: {
          slidesPerView: 7,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          centeredSlides: true,
          spaceBetween: 70,
          breakpoints: {
            1024: {
              slidesPerView: 5,
              spaceBetween: 40
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            420: {
              slidesPerView: 1,
              spaceBetween: 10
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
      showProject: function (content) {
        this.$emit('show', content)
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "~assets/css/helpers"

  #portfolio
    .filter
      margin-bottom: 2em
      li
        list-style: none
        display: inline-block
        text-align: left
        margin-left: 0.3em
        text-transform: capitalize
        cursor: pointer
        &::before
          content: "/"
          margin-right: 0.3em
        &:first-child::before
          content: none
        &.current
          color: $pink
          border-bottom: 2px solid $pink
    .container
      width: 100%
      display: flex
      flex-wrap: wrap
      justify-content: center
      flex-direction: column
    @media #{$small-up}
      .container
        flex-direction: row
        align-items: baseline
      .filter
        margin-bottom: 0
    .swiper-container
      width: 100%
    .swiper-wrapper
      display: flex
    .swiper-slide
      padding-top: 10%
    .swiper-slide-active > .item
      h3, p
        display: block
      img
        transform: scale(1.2)
    .item
      margin-bottom: 2em
      h3, p
        display: none
      p
        margin: 0 auto
    img
      height: 15vw
      margin: 2.5vw
      border-radius: 50%
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)

</style>
