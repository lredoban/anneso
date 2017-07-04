<template>
  <section id="contact" class="container">
      <h1>Me Contacter</h1>
      <p>Je me ferais un plaisir de vous répondre !</p>
      <form action="index.html" method="post">
        <input type="text" name="name" placeholder="Nom, Prénom">
        <input type="mail" name="email" placeholder="Mail">
        <textarea name="message" rows="8" cols="80" placeholder="Message"></textarea>
      </form>
      <button class="btn" type="button" name="button">Envoyer</button>
  </section>
</template>

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

  @media screen and (min-width: 641px)
    #contact
      background: url('~assets/bg-contact.png')
      background-repeat: no-repeat
      background-size: 50vh
      background-position: bottom right
</style>
