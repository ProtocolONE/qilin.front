<template>
  <UiTableRow
    :link="notifyUrl"
  >
    <UiTableCell>
      {{ notify.title }}
    </UiTableCell>
    <UiTableCell>{{ formatCreatedDate }}</UiTableCell>
  </UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { filter, get, includes, map } from 'lodash-es';
  import { UiTableRow, UiTableCell } from '@protocol-one/ui-kit';
  import formatDate from '@/helpers/formatDate';

  export default Vue.extend({
    components: { UiTableRow, UiTableCell },
    props: {
      notify: {
        required: true,
        type: Object,
      },
    },
    computed: {
      formatCreatedDate() {
        return formatDate(
          new Date(this.notify.createdAt),
          'dd LLLL yyyy, HH:mm',
          this.$i18n.locale,
          this.$i18n.fallbackLocale
        );
      },
      notifyUrl(): string {
        return `/notifications/${this.notify.id}`;
      },
    },
  });
</script>

<style lang="scss" scoped>

</style>
