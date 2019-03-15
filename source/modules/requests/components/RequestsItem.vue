<template>
<UiTableRow
  class="item-container"
  :link="requestUrl"
>
  <UiTableCell
    v-for="(value, key) in request"
    :key="key"
  >
    {{ value }}
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { UiTableRow, UiTableCell } from '@protocol-one/ui-kit';
import formatDate from '@/helpers/formatDate';

export default Vue.extend({
  components: { UiTableRow, UiTableCell },
  props: {
    request: {
      required: true,
      type: Object,
    },
  },
  computed: {
    formatReleaseDate() {
      return formatDate(
        new Date(this.request.updatedAt),
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    },
    requestUrl(): string {
      return `/requests/${this.request.name}`;
    },
  },
});
</script>
