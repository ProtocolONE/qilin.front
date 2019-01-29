<template>
<div class="page">
  <b-row>
    <b-col class="left">
      <div class="center" />
    </b-col>
    <b-col class="right">
      <div class="center">
        <h1>Games</h1>
      </div>
    </b-col>
  </b-row>
</div>
</template>

<script type="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'VendorGames',
  data: () => ({}),
  methods: {},
});
</script>

<style scoped lang="scss">
.page {
  position: relative;
  min-height: 100vh;

  > .row {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
</style>
