<template>
  <section id="contact" class="container">
      <div v-html="content"></div>
      <form action="/" method="post">
        <input type="text" name="name" placeholder="Nom, Prénom">
        <input type="mail" name="email" placeholder="Mail">
        <textarea name="message" rows="5" cols="80" placeholder="Message"></textarea>
      </form>
      <button class="btn" type="submit" value="Submit">Envoyer</button>
  </section>
</template>

<script>
  export default{
    props: ['content']
  }
</script>

<style lang="sass">
  @import "~assets/css/variables"

  form
    padding: 1em

  input, textarea
    margin-bottom: 1em
    font-family: "Viga"
    padding: 1em
    border-radius: 1em
    border: none
    background-color: rgba(124, 170, 254, .2)
    color: $blue
    width: 100%
  ::placeholder
    color: $blue
    opacity: .6

  @media #{medium-up}
    #contact
      background: url('~assets/bg-contact.png')
      background-repeat: no-repeat
      background-size: 50vh
      background-position: bottom right
</style>
