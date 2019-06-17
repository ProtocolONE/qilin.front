<template>
<UiTableRow
  class="bundles-filters"
  :is-head="true"
>
  <UiTableCell
    class="name _active"
    @click.native="toggleSort('name')"
  >
    {{ $t('name') }}
  </UiTableCell>
  <UiTableCell
    class="price"
    @click.native="toggleSort('createdDate')"
  >
    {{ $t('date') }}
  </UiTableCell>
  <UiTableCell
    class="discount"
    @click.native="toggleSort('discount')"
  >
    {{ $t('discount') }}
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {UiTableCell, UiTableRow} from '@protocol-one/ui-kit';
  import i18n from './i18nBundlesFilters';

  export default Vue.extend({
  i18n,
  components: { UiTableRow, UiTableCell },
  methods: {
    toggleSort(propName: string) {
      this.$emit('toggleSort', propName);
    }
  },
});
</script>

<style lang="scss" scoped>
.name,
.release {
  &._active {
    color: #0c2441;
    cursor: pointer;
  }
}
</style>
