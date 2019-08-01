<template>
  <section class="contact container">
    <div class="wrapper">
      <h2>{{ title }}</h2>
      <div v-html="content"></div>
      <form method="post" @submit.prevent="submit">
        <div class="boxesbox">
          <input
            v-model="name"
            type="text"
            name="name"
            placeholder="Nom, Prénom"
            :class="{ error: $v.name.$error }"
            @input="$v.name.$touch()"
          />
        </div>
        <div class="boxesbox">
          <input
            v-model="email"
            type="email"
            name="_replyto"
            placeholder="Mail"
            :class="{ error: $v.email.$error }"
            @input="$v.email.$touch()"
          />
        </div>
        <input type="hidden" name="_language" value="fr" />
        <input type="text" name="_gotcha" style="display:none" />
        <textarea
          v-model="message"
          name="message"
          rows="3"
          cols="80"
          placeholder="Message"
          :class="{ error: $v.message.$error }"
          @blur="$v.message.$touch()"
        ></textarea>
        <button
          v-if="!success"
          class="btn"
          type="submit"
          value="Submit"
          :disabled="$v.$invalid"
        >
          <span class="btn_hover"></span>
          <span>{{ button }}</span>
        </button>
      </form>
      <div v-if="success" class="congratulation" v-html="parsedResponse"></div>
    </div>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    button: {
      type: String,
      required: true
    },
    response: {
      type: String,
      required: true
    },
    isDev: {
      type: Boolean,
      required: true
    }
  },
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
  computed: {
    parsedResponse() {
      return this.response
        .replace('{{name}}', this.name)
        .replace('{{email}}', this.email)
    }
  },
  methods: {
    submit: function() {
      const email = this.isDev
        ? 'maitrejedi@lovasoa.fr'
        : 'annesophie.rimasson@gmail.com'
      const { success, ...data } = this.$data
      axios({
        method: 'post',
        url: `https://formspree.io/${email}`,
        data,
        headers: { Accept: 'application/json' }
      })
        .then(
          function(res) {
            this.success = true
            this.message = ''
            this.name = ''
            this.email = ''
          }.bind(this)
        )
        .catch(err => console.warn('Shiiiit', err))
    }
  }
}
</script>

<style lang="sass">
@import "~assets/css/helpers"

.contact
  flex-direction: column
  background-color: $bg-pink
  .wrapper
    max-width: 720px
    margin: 0 auto
  p
    margin: auto
  h2
    margin-bottom: 0
    @media #{$small-up}
      margin-bottom: 1rem
  .boxesbox
    &::before
      box-shadow: 0 0 0 1px #e8e8e8, 0 36px #fff, 0 36px 0 1px #e8e8e8
    &::after
      bottom: 14px
      margin-left: -3px
      box-shadow: 0 0 0 1px #e8e8e8, 0 -36px #fff, 0 -36px 0 1px #e8e8e8

form
  padding: 1em
  .errors
    color: #ffbac7

input, textarea
  margin-bottom: 1em
  font-family: $raleway
  font-weight: 700
  padding: .5em
  border: 1px solid #e8e8e8
  background-color: $bg-form
  color: $primary
  width: 100%
  &.error
    border: 1px solid #ffbac7
::placeholder
  color: $primary
  opacity: .6

.btn
  margin-top: 2rem
  &:disabled
    opacity: .3

.congratulation
  color: $secondary
  font-size: 120%
</style>
