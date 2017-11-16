<template>
  <section id="contact" class="container">
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
        <!--<pre style='text-align:left'>name: {{ $v.name }}</pre>-->
        <button class="btn" type="submit" value="Submit" v-bind:disabled="$v.$invalid" v-if="!success">
          <span>Envoyer</span>
        </button>
      </form>
      <div class="congratulation" v-if="success">
        Merci {{name}} votre message vient d'être envoyé ! <br>
        Anne-Sophie vous répondra au plus vite sur {{email}} . <br>
        bisous doux 😘 !!!
      </div>
    </div>
  </section>
</template>

<script>
  import { required, email } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default{
    props: ['title', 'content'],
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
        console.info('Nas - The Message', 'https://formspree.io/maitrejedi@lovasoa.fr')
        console.log(this.$data)
        axios({
          method: 'post',
          url: 'https://formspree.io/maitrejedi@lovasoa.fr',
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
    }
  }
</script>

<style lang="sass">
  @import "~assets/css/variables"

  #contact
    flex-direction: column
    .wrapper
      max-width: 720px
    p
      margin: auto

  form
    padding: 1em
    .errors
      color: $pink

  input, textarea
    margin-bottom: 1em
    font-family: "Viga"
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

  @media #{medium-up}
    #contact
      background: url('~assets/bg-contact.png')
      background-repeat: no-repeat
      background-size: 50vh
      background-position: bottom right
</style>
