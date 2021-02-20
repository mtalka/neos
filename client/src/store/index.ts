import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    asteroids: []
  },
  mutations: {
    SET_ASTEROIDS(state, asteroids) {
    state.asteroids = asteroids
    }},
  actions: {
    getAsteroids({ commit }) {
      //return axios.get("https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-12-19&end_date=2015-12-26&api_key=XerFVHr9bhmYZkQcl9RdcV8vhhezbEEVfkwlsPP9")
      return axios.get("/api/getNeos")
        .then(response => {
          const neos: any[] = response.data.near_earth_objects;
          const asteroidsForDatesFlatted = Object.values(neos).flatMap(x => x);
          commit("SET_ASTEROIDS", asteroidsForDatesFlatted);
      })
    }
  },
  modules: {}
});
