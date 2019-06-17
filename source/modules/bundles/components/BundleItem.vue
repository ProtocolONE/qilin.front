<template>
<UiTableRow
  :link="bundleUrl"
>
  <UiTableCell>
    <div
      v-if="bundle.media.thumb"
      class="logo"
      :style="{ backgroundImage: `url(${iconUrl})` }"
    />
    {{ bundleName }}
  </UiTableCell>
  <UiTableCell>
    <div class="date"/>
    {{ formatDate }}
  </UiTableCell>
  <UiTableCell>
    <div class="discount"/>
    {{ bundle.discountPolicy.discount }} %
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
    bundle: {
      required: true,
      type: Object,
    },
  },
  computed: {
    iconUrl() {
      return this.bundle.media.thumb[this.$i18n.locale] || this.bundle.media.thumb.en;
    },
    formatDate() {
      return formatDate(
        this.bundle.createdAt,
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    },
    bundleUrl(): string {
      return `/bundles/${this.bundle.id}`;
    },
    bundleName(): string {
      return this.bundle.name[this.$i18n.locale] || this.bundle.name.en;
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
