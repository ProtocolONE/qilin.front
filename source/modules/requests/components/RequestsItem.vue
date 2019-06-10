<template>
<UiTableRow
  class="item-container"
  :link="requestUrl"
>
  <UiTableCell
    v-for="(value, key) in requestData"
    :key="key"
  >
    {{ value }}
  </UiTableCell>
  <UiTableCell>
    <UiButton
      type="rectangle"
      :color="buttonColor"
      :text="$t(`status.${request.status}`)"
    />
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {UiButton, UiTableCell, UiTableRow} from '@protocol-one/ui-kit';
  import formatDate from '@/helpers/formatDate';
  import i18n from './i18nItem';

  export default Vue.extend({
  i18n,
  components: { UiButton, UiTableRow, UiTableCell },
  props: {
    request: {
      required: true,
      type: Object,
    },
  },
  computed: {
    buttonColor() {
      const colors = {
        new: 'blue',
        checking: 'purple',
        approved: 'green',
        returned: 'orange',
        archived: 'gray',
      };

      return colors[this.request.status];
    },
    formatReleaseDate() {
      return formatDate(
        this.request.updatedAt,
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale,
      );
    },
    requestData() {
      const { name, country, person } = this.request;

      return {
        name,
        country,
        person,
        updateAt: this.formatReleaseDate,
      }
    },
    requestUrl(): string {
      return `/admin/requests/${this.request.vendor_id}`;
    },
  },
});
</script>
