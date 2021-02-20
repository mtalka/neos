<template>
  <div class="loading loading01">
    <span>L</span>
    <span>o</span>
    <span>a</span>
    <span>d</span>
    <span>i</span>
    <span>n</span>
    <span>g</span>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LoadingPlaceholder",
});
</script>

<style scoped lang="scss">
.loading {
  font-size: 1rem;
  font-family: "Consolas";
  color: #fff;
  text-align: center;
  span {
    display: inline-block;
  }
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.loading01 {
  span {
    animation: loading01 1.4s infinite alternate;
    @for $i from 0 through 9 {
      &:nth-child(#{$i + 1}) {
        animation-delay: #{$i * 0.1}s;
      }
    }
  }
}
@keyframes loading01 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
