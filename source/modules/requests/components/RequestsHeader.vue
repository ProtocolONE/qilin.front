<template>
<UiPageHeader :title="$t('title')">
  <div
    v-if="hasRequests"
    slot="right"
    class="search"
  >
    <UiTextField
      :label="$t('search')"
      @input="$emit('search', $event)"
    />
  </div>
</UiPageHeader>
</template>

<script lang="ts">
import Vue from 'vue';
import { UiPageHeader, UiTextField } from '@protocol-one/ui-kit';
import i18n from './i18nHeader';

export default Vue.extend({
  i18n,
  components: { UiPageHeader, UiTextField },
  props: {
    hasRequests: {
      default: false,
      type: Boolean,
    },
  },
});
</script>

<style lang="scss" scoped>
.search {
  max-width: 190px;
}
</style>
