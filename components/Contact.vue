<template>
  <section class="contact container" :style="{'background-image': `url(${backgroundImage})`}">
    <div class="wrapper">
      <h2>{{ title }}</h2>
      <div v-html="content"></div>
      <form method="post" @submit.prevent="submit">
        <input type="text" v-model="success ? '' : name" name="name" placeholder="Nom, Prénom"
          @input="$v.name.$touch()"
          :class="{'error': $v.name.$error}">
        <input type="email" v-model="success ? '' : email" name="_replyto" placeholder="Mail"
          @input="$v.email.$touch()"
          :class="{'error': $v.email.$error}">
        <input type="hidden" name="_language" value="fr" />
        <input type="text" name="_gotcha" style="display:none" />
        <textarea name="message" v-model="message" rows="3" cols="80" placeholder="Message"
          @blur="$v.message.$touch()"
          :class="{'error': $v.message.$error}"
        ></textarea>
        <button class="btn" type="submit" value="Submit" v-bind:disabled="$v.$invalid" v-if="!success">
          <span class="btn_hover"></span>
          <span>{{ button }}</span>
        </button>
      </form>
      <div class="congratulation" v-if="success" v-html="parsedResponse"></div>
    </div>
  </section>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default{
    props: ['title', 'content', 'button', 'backgroundImage', 'response'],
    data: () => {
      return {
        name: '',
        email: '',
        message: '',
        success: false
      }
    },
    validations: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      message: {
        required
      }
    },
    methods: {
      submit: function () {
        axios({
          method: 'post',
          url: 'https://formspree.io/annesophie.rimasson@gmail.com',
          data: {...this.$data},
          headers: {Accept: 'application/json'}
        })
        .then(function (res) {
          console.warn('Sent Mofo', res)
          this.success = true
          this.message = ''
        }.bind(this))
        .catch(err => console.warn('Shiiiit', err))
      }
    },
    computed: {
      parsedResponse () {
        return this.response.replace('{{name}}', this.name).replace('{{email}}', this.email)
      }
    }
  }
</script>

<style lang="sass">
  @import "~assets/css/helpers"

  .contact
    flex-direction: column
    background-position: 99999px 99999px
    background-repeat: no-repeat
    @media #{$medium-up}
      background-position: 0 0
      background-size: 50vh
      background-position: bottom right
    .wrapper
      max-width: 720px
      margin: 0 auto
    p
      margin: auto
    h2
      margin-bottom: 0
      @media #{$small-up}
        margin-bottom: 1rem

  form
    padding: 1em
    .errors
      color: $pink

  input, textarea
    margin-bottom: 1em
    font-family: "Viga"
    padding: .5em
    @media #{$small-up}
      padding: 1em
    border-radius: 1em
    border: 1px solid $white
    background-color: rgba(124, 170, 254, .2)
    color: $blue
    width: 100%
    &.error
      border: 1px solid $pink
  ::placeholder
    color: $blue
    opacity: .6

  .btn:disabled
    opacity: .3

  .congratulation
    color: $pink
    font-size: 120%
</style>
