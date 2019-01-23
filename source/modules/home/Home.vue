<i18n>
{
    "en": {
        "title": "Protocol One Qilin",
        "descr": "Header home descr",
        "add_vendor": "Add Vendor"
    },
    "ru": {
        "title": "Protocol One Qilin",
        "descr": "Мета описание",
        "add_vendor": "Добавить вендора"
    }
}
</i18n>

<template>
<div class="page">
  <vue-headful
    :title="$t('title')"
    :description="$t('descr')"
  />
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
import * as $ from 'jquery';

export default Vue.extend({
  name: 'Home',
  data: () => ({
    test: 1,
  }),
  computed: {
    user: () => this.$state.state.user,
  },
  mounted() {
    this.$nextTick(() => {
      const h = Math.max($(window).outerHeight() - 180, 400);
      this.$el.style.minHeight = `${h}px`;
    });
  },
});
</script>

<style scoped lang="scss">
.page {
  position: relative;
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
