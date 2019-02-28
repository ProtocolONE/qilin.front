<template>
<UiTableRow
  class="users-filters"
  :isClickable="false"
  :isHead="true"
>
  <UiTableCell
    v-for="(isSortable, column) in userColumns"
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
    },
  },
  computed: {
    userColumns() {
      return {
        name: true,
        email: true,
        games: false,
        roles: false,
        lastSeen: true,
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
      if (this.userColumns[propName]) {
        this.$emit('toggleSort', propName);
      }
    },
  },
});
</script>
