<template>
<UiTableRow
  class="bundles-filters"
  :isHead="true"
>
  <UiTableCell
    v-for="({ name, filterSort }) in filters"
    :key="name"
    :class="['cell', name]"
    :is-sortable="!!filterSort && filterSort === sort.substr(1)"
    :sort-direction="sort[0] === '-' ? 'desc' : 'asc'"
    @click.native="toggleSort(filterSort)"
  >
    {{ $t(name) }}
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
    props: {
      sort: {
        type: String,
      },
    },
    computed: {
      filters() {
        return [
          { name: 'name', filterSort: 'name' },
          { name: 'date', filterSort: 'date' },
        ];
      },
    },
    methods: {
      toggleSort(propName: string) {
        if (!propName) return;
        const dir = propName === this.sort.substr(1)
        && this.sort[0] === '+'
          ? '-'
          : '+';
        this.$emit('toggleSort', dir + propName);
      }
    },
  });
</script>

<style lang="scss" scoped>
.cell {
  cursor: pointer;
  .arrow {
    transition: transform 0.3s ease;
  }
  &._desc .arrow {
    transform: rotate(180deg);
  }
}
</style>
