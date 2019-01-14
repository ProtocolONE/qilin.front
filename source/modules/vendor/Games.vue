<i18n>
{
    "en": {
        "title": "Welcome to Qilin",
        "descr": "Help us setup your first tenant and start untegration.",
        "step": "STEP 1 OF 2",
        "name-you-choose": "The name you choose here will be used for the internal purposes and some API endpoints of your cliends. Once chosen, a company name cannot be renamed.",
        "region-laws": "We will host all of your data in EU region to comply with EU Data Protection Directive.",
        "region": "Region",
        "next": "Next",
        "name": "Name",
        "name-too-short": "Name is too short",
        "your-company-name": "Your company name"
    },
    "ru": {
        "title": "Welcome to Qilin",
        "descr": "Help us setup your first tenant and start untegration.",
        "step": "STEP 1 OF 2",
        "name-you-choose": "The name you choose here will be used for the internal purposes and some API endpoints of your cliends. Once chosen, a company name cannot be renamed.",
        "region-laws": "We will host all of your data in EU region to comply with EU Data Protection Directive.",
        "region": "Region",
        "next": "Next",
        "name": "Name",
        "name-too-short": "Name is too short",
        "your-company-name": "Your company name"
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
import $ from 'jquery';
import Vue from 'vue';

export default Vue.extend({
    name: 'VendorGames',
    data: () => ({}),
    mounted() {
        this.$nextTick(() => {
            const h = Math.max($(window).outerHeight() - 180, 400);
            this.$el.style.minHeight = `${h}px`;
        });
    },
    methods: {},
});
</script>

<style scoped lang="scss">
@import '@/layouts/main/consts.scss';

.page {
    position: relative;
    > .row {
        position: absolute;
        height: 100%;
        width: 100%;
    }
}
</style>
