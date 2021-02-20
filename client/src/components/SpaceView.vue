<template>
  <div>
    <div class="sun" title="Sun" v-on:click="chooseRandom" />
    <Asteroid
      v-if="loading === false"
      v-bind:name="chosenAsteroid.name"
      v-bind:asteroidId="chosenAsteroid.asteroidId"
      v-bind:minDiameter="chosenAsteroid.minDiameter"
      v-bind:maxDiameter="chosenAsteroid.maxDiameter"
      v-bind:hazardous="chosenAsteroid.hazardous"
      v-bind:missDistance="Number(chosenAsteroid.missDistance)"
    />
    <div
      v-if="loading === false"
      class="miss-distance"
      v-bind:style="{ top: missDistanceInfoPosition }"
    >
      <div>Miss distance</div>
      <div>{{ this.missDistance }} km</div>
    </div>
    <div class="earth" title="Earth" v-on:click="chooseClosestMiss" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Asteroid from "./Asteroid.vue";
import { AsteroidType } from "@/types"; // Our interface

export default Vue.extend({
  name: "SpaceView",
  components: {
    Asteroid,
  },
  data: () => ({
    chosenAsteroid: {} as AsteroidType,
    missDistance: 0,
    loading: true,
  }),
  props: {
    msg: String,
  },
  computed: {
    missDistanceInfoPosition(): string {
      const text = this.missDistance < 40000000 ? "50%" : "85%";
      return text;
    },
  },
  mounted() {
    this.$store
      .dispatch("getAsteroids")
      .then(() => {
        this.chooseClosestMiss();
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    chooseClosestMiss() {
      const sortedAsteroids = this.$store.state.asteroids.sort(
        (a: any, b: any) =>
          parseFloat(a.close_approach_data[0].miss_distance.kilometers) -
          parseFloat(b.close_approach_data[0].miss_distance.kilometers)
      );
      const closestAsteroid = sortedAsteroids[0];
      const missDistanceKm =
        closestAsteroid.close_approach_data[0].miss_distance.kilometers;
      this.missDistance = Number(missDistanceKm).toFixed(0);
      this.chosenAsteroid = {
        name: closestAsteroid.name,
        asteroidId: closestAsteroid.id,
        minDiameter: closestAsteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(
          0
        ),
        maxDiameter: closestAsteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(
          0
        ),
        hazardous: closestAsteroid.is_potentially_hazardous_asteroid,
        missDistance:
          closestAsteroid.close_approach_data[0].miss_distance.kilometers <
          15000000
            ? 15000000
            : closestAsteroid.close_approach_data[0].miss_distance.kilometers,
      };
    },
    chooseRandom() {
      const r = Math.random() * (this.$store.state.asteroids.length - 0) + 0;
      const randomAsteroid = this.$store.state.asteroids[Math.floor(r)];
      const missDistanceKm =
        randomAsteroid.close_approach_data[0].miss_distance.kilometers;
      this.missDistance = Number(missDistanceKm).toFixed(0);
      this.chosenAsteroid = {
        name: randomAsteroid.name,
        asteroidId: randomAsteroid.id,
        minDiameter: randomAsteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(
          0
        ),
        maxDiameter: randomAsteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(
          0
        ),
        hazardous: randomAsteroid.is_potentially_hazardous_asteroid,
        missDistance:
          randomAsteroid.close_approach_data[0].miss_distance.kilometers <
          15000000
            ? 15000000
            : randomAsteroid.close_approach_data[0].miss_distance.kilometers,
      };
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sun {
  display: block;
  border-radius: 50%;
  border: 1px solid;
  border-color: #fff;
  width: 50vmin;
  height: 50vmin;
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-box-shadow: 0px 0px 15px 5px #ffffff;
  box-shadow: 0px 0px 35px -10px #ffffff;
}
.earth {
  display: block;
  border-radius: 50%;
  border: 1px solid;
  border-color: #fff;
  width: 8vh;
  height: 8vh;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-box-shadow: 0px 0px 15px 5px #ffffff;
  box-shadow: 0px 0px 35px -10px #ffffff;
}
.miss-distance {
  animation: fadeIn 3s;
  font-family: Consolas;
  margin-top: 1rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (max-width: 768px) {
  .earth {
    bottom: -10vh;
  }
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
