<template>
<svg :class="iconClasses" viewBox="0 0 38 38">
  <g transform="translate(1 1)" stroke-width="2">
    <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
    <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(17.2361 18 18)">
      <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { includes } from 'lodash-es';

export default Vue.extend({
  props: {
    color: {
      default: 'blue',
      type: String,
      validator(value: string) {
        return includes(['blue'], value);
      },
    },
  },
  computed: {
    iconClasses() {
      return [
        'simple-preloader',
        `_${this.color}`,
      ];
    },
  },
});
</script>

<style scoped lang="scss">
$blue: #2f6ecd;

@mixin simple-preloader($color) {
  stroke: $color;
  fill: none;
  fill-rule: evenodd;
  width: 80px;
  height: 80px;
}

.simple-preloader {
  &._blue {
    @include simple-preloader($blue);
  }
}
</style>
