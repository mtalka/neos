<template>
  <div id="app">
    <SpaceView msg="Welcome to Your asdasdds.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SpaceView from "./components/SpaceView.vue";

export default Vue.extend({
  name: "App",
  components: {
    SpaceView,
  },
});
</script>

<style>
html {
  background-image: linear-gradient(black, rgb(1, 1, 23));

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
