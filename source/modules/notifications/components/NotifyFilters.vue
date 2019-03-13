<template>
<UiTableRow
  class="notifys-filters"
  :isHead="true"
>
  <UiTableCell
    v-for="cell in [
      {name: 'unread', sort: '+unread'},
      {name: 'title', sort: '+title'},
      {name: 'message', sort: '-message'},
      {name: 'date', sort: '-createdDate'}
    ]"
    :class="['notify-cell', cell.name, {_active: sort === cell.sort}]"
    @click.native="toggleSort(cell.sort)"
  >
    <svg
      v-if="sort === cell.sort"
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.64645 9.35355C3.84171 9.54882 4.15829 9.54882 4.35355 9.35355L7.53553 6.17157C7.7308 5.97631 7.7308 5.65973 7.53553 5.46447C7.34027 5.2692 7.02369 5.2692 6.82843 5.46447L4 8.29289L1.17157 5.46447C0.976311 5.2692 0.659728 5.2692 0.464466 5.46447C0.269204 5.65973 0.269204 5.97631 0.464466 6.17157L3.64645 9.35355ZM3.5 0L3.5 9H4.5L4.5 0L3.5 0Z"
        fill="#B1B1B1"
      />
    </svg>
    {{ $t(cell.name) }}
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { UiTableRow, UiTableCell } from '@protocol-one/ui-kit';
  import i18n from '../i18n';

  export default Vue.extend({
    i18n,
    components: { UiTableRow, UiTableCell },
    props: {

      sort: {
        type: String,
      },
    },
    methods: {
      toggleSort(propName: string) {
        this.$emit('toggleSort', propName);
      }
    },
  });
</script>

<style lang="scss" scoped>
.notify-cell {
  color: #0c2441;
  cursor: pointer;
  &._active {
    cursor: default;
  }
}
</style>
