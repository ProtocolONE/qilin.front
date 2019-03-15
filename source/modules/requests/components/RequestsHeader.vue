<template>
<PageHeader :title="$t('title')">
  <div
    v-if="hasRequests"
    slot="right"
    class="search"
  >
    <TextField
      :label="$t('search')"
      @input="$emit('search', $event)"
    />
  </div>
</PageHeader>
</template>

<script lang="ts">
import Vue from 'vue';
import { PageHeader, TextField } from '@protocol-one/ui-kit';
import i18n from './i18nHeader';

export default Vue.extend({
  i18n,
  components: { PageHeader, TextField },
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
