<template>
<UiPageHeader
  :breadcrumbs="breadcrumbs"
  :title="$t('title')"
>
  <div
    v-if="hasHistory"
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
    hasHistory: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    breadcrumbs() {
      return [{
        label: this.$i18n.t('backToCompany'),
        url: `/admin/requests/${this.$route.params.vendorId}`,
      }];
    },
  },
});
</script>

<style lang="scss" scoped>
.search {
  max-width: 190px;
}
</style>
