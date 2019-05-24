<template>
<UiTableRow
  :link="packageUrl"
>
  <UiTableCell>
    <div
      v-if="pkg.media.thumb"
      class="logo"
      :style="{ backgroundImage: `url(${iconUrl})` }"
    />
    {{ packageName }}
  </UiTableCell>
  <UiTableCell>
    <div class="date"/>
    {{ formatDate }}
  </UiTableCell>
  <UiTableCell>
    <div class="discount"/>
    {{ pkg.discountPolicy.discount }} %
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
    pkg: {
      required: true,
      type: Object,
    },
  },
  computed: {
    iconUrl() {
      return this.pkg.media.thumb[this.$i18n.locale] || this.pkg.media.thumb.en;
    },
    formatDate() {
      return formatDate(
        new Date(this.pkg.createdAt),
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    },
    packageUrl(): string {
      return `/packages/${this.pkg.id}`;
    },
    packageName(): string {
      return this.pkg.name[this.$i18n.locale] || this.pkg.name.en;
    }
  },
});
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  background-position: center;
  display: inline-block;
  vertical-align: middle;
}
</style>
