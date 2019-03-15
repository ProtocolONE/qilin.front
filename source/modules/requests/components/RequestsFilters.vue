<template>
<UiTableRow
  class="requests-filters"
  :isHead="true"
>
  <UiTableCell
    v-for="(isSortable, column) in requestColumns"
    :key="column"
    :class="['filter-cell', { '_active': isSortable }]"
    @click.native="toggleSort(column)"
  >
    {{ $t(column) }}
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { UiTableRow, UiTableCell } from '@protocol-one/ui-kit';
import i18n from './i18nFilters';

export default Vue.extend({
  i18n,
  components: { UiTableRow, UiTableCell },
  computed: {
    requestColumns() {
      return {
        name: true,
        country: true,
        person: true,
        updatedAt: true,
        status: true,
      };
    },
  },
  methods: {
    toggleSort(propName: string) {
      if (this.requestColumns[propName]) {
        this.$emit('toggleSort', propName);
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.filter-cell {
  &._active {
    color: #0c2441;
    cursor: pointer;
  }
}
</style>
