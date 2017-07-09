<template>
  <section class="fancy">
    <div class="container">
      <h2>Portfolio</h2>
      <ul class="filter">
        <li :class="{current: isCurrent('tout')}" @click="currentCategory='tout'">Tout</li>
        <li :class="{current: isCurrent(cat)}" v-for="cat in categories" @click="currentCategory = cat">{{ cat }}</li>
      </ul>
      <div class="slider">
        <div :key="project.title" v-for="project in filteredPorjects">
          <article>
            <img :src="project.meta.image" :alt="project.title">
            <h3>{{ project.title }}</h3>
            <p>{{ project.meta.categories.join(' - ') }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default{
    props: ['portfolio'],
    data: () => {
      return {
        currentCategory: 'tout'
      }
    },
    computed: {
      categories: function () {
        return this.portfolio.reduce((accu, p) => {
          p.meta.categories.map(c => {
            if (!accu.includes(c)) {
              accu.push(c)
            }
          })
          return accu
        }, [])
      },
      filteredPorjects: function () {
        if (this.currentCategory === 'tout') {
          return this.portfolio
        }
        return this.portfolio.filter(p => p.meta.categories.includes(this.currentCategory))
      }
    },
    methods: {
      isCurrent: function (cat) {
        return cat === this.currentCategory
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "~assets/css/helpers"

  .filter li
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
  .slider
    display: flex
  img
    height: 15vw
    margin: 2.5vw
    border-radius: 50%

</style>
