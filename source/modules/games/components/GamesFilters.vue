<template>
<UiTableRow
  class="games-filters"
  :isHead="true"
>
  <UiTableCell
    class="name _active"
    @click.native="toggleSort('internalName')"
  >
    {{ $t('name') }}
  </UiTableCell>
  <UiTableCell>
    {{ $t('genre') }}
  </UiTableCell>
  <UiTableCell
    class="release _active"
    @click.native="toggleSort('releaseDate')"
  >
    {{ $t('release') }}
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {UiTableCell, UiTableRow} from '@protocol-one/ui-kit';
  import i18n from './i18nGamesFilters';

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
