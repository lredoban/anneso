<template>
  <!-- Original Pen: https://codepen.io/pankan/pen/NgaLmo -->
  <div class="loading">
    <div class="inner"></div>
  </div>
</template>

<style scopped>
/* Loading indicator */
.loading {
  position: relative;
  width: 100px; /* diameter */
  height: 100px; /* diameter */
}
.inner,
.loading:after {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
/* Mask */
.loading:after {
  content: ' ';
  margin: 5%; /* stroke width */
  border-radius: 100%;
  background: white; /* container background */
}
/* Spinning gradients */
.inner {
  animation-duration: 1s; /* speed */
  -webkit-animation-duration: 1s; /* speed */
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
}
.inner {
  animation-name: rotate-inner;
  -webkit-animation-name: rotate-inner;
}
/* Halfs */
.inner:before,
.inner:after {
  position: absolute;
  top: 0;
  bottom: 0;
  content: ' ';
}
/* Left half */
.inner:before {
  left: 0;
  right: 50%;
  border-radius: 72px 0 0 72px; /* diameter */
}
/* Right half */
.inner:after {
  left: 50%;
  right: 0;
  border-radius: 0 72px 72px 0; /* diameter */
}
/* Half gradients */
.inner:before {
  background-image: -webkit-linear-gradient(45deg, #fce5ec, #ffbac7);
  background-image: -moz-linear-gradient(45deg, #fce5ec, #ffbac7);
  background-image: linear-gradient(45deg, #fce5ec, #ffbac7);
}
.inner:after {
  background: white;
}
/* Spinning animations */

@keyframes rotate-inner {
  0% {
    transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate-inner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
