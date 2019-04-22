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
  <div class="center">
    <RouterLink :to="{ name: 'onBoarding' }">
      <UiButton
        v-if="!currentVendorId"
        :text="$t('add_vendor')"
      />
    </RouterLink>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { UiButton } from '@protocol-one/ui-kit';

export default Vue.extend({
  components: { UiButton },
  computed: {
    ...mapGetters(['currentVendorId'])
  },
});
</script>

<style scoped lang="scss">
.page {
  position: relative;
  min-height: 100vh;

  .center {
    position: absolute;
    top: calc(50% - 50px);
    left: 50px;
  }
}
</style>
