<i18n>
{
  "en": {
    "add_vendor": "Add Vendor"
  },
  "ru": {
    "add_vendor": "Добавить вендора"
  }
}
</i18n>

<template>
<div class="page">
  <b-row>
    <b-col class="left">
      <div class="center">
        <b-btn
          class="float-left"
          variant="primary"
          to="/vendor/on-boarding"
        >
          {{ $t('add_vendor') }}
        </b-btn>
      </div>
    </b-col>
    <b-col class="right" />
  </b-row>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style scoped lang="scss">
.page {
  position: relative;
  min-height: 100vh;

  .row {
    position: absolute;
    height: 100%;
    width: 100%;
    .left {
      position: relative;
      .center {
        position: relative;
        top: calc(50% - 50px);
        left: 50px;
      }
    }
  }
}
</style>
