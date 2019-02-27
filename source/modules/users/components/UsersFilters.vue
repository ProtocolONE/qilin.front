<template>
<UiTableRow
  class="users-filters"
  :isHead="true"
>
  <UiTableCell
    class="name _active"
    @click="toggleSort('name')"
  >
    {{ $t('name') }}
  </UiTableCell>
  <UiTableCell
    class="email _active"
    @click="toggleSort('email')"
  >
    {{ $t('email') }}
  </UiTableCell>
  <UiTableCell>
    {{ $t('genres') }}
  </UiTableCell>
  <UiTableCell>
    {{ $t('roles') }}
  </UiTableCell>
  <UiTableCell
    class="last-seen _active"
    @click="toggleSort('lastSeen')"
  >
    {{ $t('lastSeen') }}
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
