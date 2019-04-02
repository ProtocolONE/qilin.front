<template>
<UiTableRow
  class="history-filters"
  :isHead="true"
>
  <UiTableCell
    v-for="(isSortable, column) in historyColumns"
    :class="['cell', `_${column}`]"
    :key="column"
    :isSortable="isSortable"
    :sortDirection="sortDirection(column)"
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
  props: {
    sortingProps: {
      default: () => ({}),
      type: Object,
    }
  },
  computed: {
    historyColumns() {
      return {
        title: true,
        message: true,
        createdAt: true,
      };
    },
  },
  methods: {
    sortDirection(propName: string) {
      if (this.sortingProps[propName] === undefined) {
        return null;
      }

      return this.sortingProps[propName] ? 'asc' : 'desc';
    },
    toggleSort(propName: string) {
      if (this.historyColumns[propName]) {
        this.$emit('toggleSort', propName);
      }
    }
  },
});
</script>

<style lang="scss" scoped>
.cell {
  &._title {
    width: 28%;
  }
  &._createdAt {
    width: 22%;
  }
}
</style>
