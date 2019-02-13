<template>
<svg xmlns="http://www.w3.org/2000/svg" width="27" height="29" viewBox="0 0 27 29" fill="none">
  <g :fill="color">
    <path d="M0 4.10592L11.034 2.49686L11.0389 13.8933L0.0100796 13.9605L0 4.10592ZM11.0288 15.2063L11.0374 26.6127L0.00856455 24.9891L0.00794617 15.1298L11.0288 15.2063ZM12.3664 2.28636L26.9966 0V13.7483L12.3664 13.8727V2.28636ZM27 15.3136L26.9966 29L12.3663 26.789L12.3458 15.288L27 15.3136Z"/>
  </g>
</svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    color: {
      default: '#333333',
      type: String,
    },
  },
});
</script>
