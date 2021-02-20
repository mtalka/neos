<template>
  <div class="asteroid-container" v-bind:style="{ top: distanceInPercentage }">
    <div class="info">
      <div>Name: {{ chosenAsteroid.name }}</div>
      <div>ID: {{ chosenAsteroid.asteroidId }}</div>
    </div>
    <div class="asteroid" v-bind:style="{ borderColor: hazardColor }">
      <div class="dot"></div>
    </div>
    <div class="info">
      <div>
        Diameter: {{ chosenAsteroid.minDiameter }}m min;
        {{ chosenAsteroid.maxDiameter }}m max
      </div>
      <div>
        <span v-if="chosenAsteroid.hazardous" style="color: red;"
          >Potentially hazardous</span
        >
        <span v-else style="color: limegreen;">No hazard</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AsteroidType } from "@/types";

export default Vue.extend({
  name: "Asteroid",
  data: () => ({
    solarDistance: 149600000,
  }),
  props: {
    chosenAsteroid: {
      type: Object as () => AsteroidType,
    },
  },
  computed: {
    // Calculate rough percentage in order to give users idea of miss distance in solar scale
    distanceInPercentage(): string {
      const percentage: number =
        Number(this.$props.chosenAsteroid.missDistance) / this.solarDistance;
      const text = 100 - percentage * 100;
      return text.toString() + "%";
    },
    // yer a hazard, wirry
    hazardColor(): string {
      return this.chosenAsteroid.hazardous ? "red" : "limegreen";
    },
  },
});
</script>

<style scoped>
.asteroid-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.asteroid {
  animation: fadeIn 1s;
  display: block;
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  border: 1px solid;
  border-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}
.dot {
  display: block;
  background: #fff;
  height: 0.1vh;
  width: 0.1vh;
}
.info {
  animation: fadeIn 2s;
  color: #fff;
  font-family: Consolas;
  font-size: 0.85rem;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
