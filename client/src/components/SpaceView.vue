<template>
  <div>
    <div class="sun" title="Sun" v-on:click="chooseRandom" />
    <LoadingPlaceholder v-if="loading === true" />
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
      <div>{{ this.thousandSeparator(this.missDistance.toString()) }} km</div>
      <div>
        {{ ((this.missDistance / this.solarDistance) * 100).toFixed(1) }}% of
        distance to sun
      </div>
    </div>
    <div class="earth" title="Earth" v-on:click="chooseClosestMiss" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Asteroid from "./Asteroid.vue";
import LoadingPlaceholder from "./LoadingPlaceholder.vue";
import { AsteroidType } from "@/types"; // Our interface

export default Vue.extend({
  name: "SpaceView",
  components: {
    Asteroid,
    LoadingPlaceholder,
  },
  data: () => ({
    chosenAsteroid: {} as AsteroidType,
    missDistance: 0,
    loading: true,
    solarDistance: 149600000,
  }),
  props: {
    msg: String,
  },
  computed: {
    missDistanceInfoPosition(): string {
      const text = this.missDistance < 40000000 ? "60%" : "85%";
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
      this.setDisplayedAsteroid(closestAsteroid);
    },
    chooseRandom() {
      const r = Math.random() * (this.$store.state.asteroids.length - 0) + 0;
      const randomAsteroid = this.$store.state.asteroids[Math.floor(r)];
      this.setDisplayedAsteroid(randomAsteroid);
    },
    setDisplayedAsteroid(asteroid: any) {
      const missDistanceKm =
        asteroid.close_approach_data[0].miss_distance.kilometers;
      this.missDistance = Number(Number(missDistanceKm).toFixed(0));
      this.chosenAsteroid = {
        name: asteroid.name,
        asteroidId: asteroid.id,
        minDiameter: asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(
          0
        ),
        maxDiameter: asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(
          0
        ),
        hazardous: asteroid.is_potentially_hazardous_asteroid,
        missDistance:
          asteroid.close_approach_data[0].miss_distance.kilometers < 15000000
            ? 15000000
            : asteroid.close_approach_data[0].miss_distance.kilometers,
      };
    },
    thousandSeparator(numToFix: string) {
      return numToFix.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
  color: #59738c;
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
