<template>
<UiTableRow class="history-row">
  <UiTableCell
    v-for="(value, key) in historyData"
    :key="key"
    class="cell"
  >
    {{ value }}
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {UiTableCell, UiTableRow} from '@protocol-one/ui-kit';
  import formatDate from '@/helpers/formatDate';

  export default Vue.extend({
  components: { UiTableRow, UiTableCell },
  props: {
    historyItem: {
      required: true,
      type: Object,
    },
  },
  computed: {
    formatCreatedDate() {
      return formatDate(
        this.historyItem.createdAt,
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    },
    historyData() {
      const { title, message } = this.historyItem;

      return {
        title,
        message,
        createdAt: this.formatCreatedDate,
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.history-row {
  cursor: pointer;
}
.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
