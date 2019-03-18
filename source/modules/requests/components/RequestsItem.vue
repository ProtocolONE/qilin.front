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
      :color="buttonColor"
      :text="$t(`status.${request.status}`)"
    />
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { UiButton, UiTableRow, UiTableCell } from '@protocol-one/ui-kit';
import formatDate from '@/helpers/formatDate';

export default Vue.extend({
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
        ok: 'green',
        returned: 'orange',
        archive: 'gray',
      };

      return colors[this.request.status];
    },
    formatReleaseDate() {
      return formatDate(
        new Date(this.request.updatedAt),
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    },
    requestData() {
      const { name, country, person, updateAt } = this.request;

      return {
        name,
        country,
        person,
        updateAt,
      }
    },
    requestUrl(): string {
      return `/admin/requests/${this.request.vendorId}`;
    },
  },
});
</script>
