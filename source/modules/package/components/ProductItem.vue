<template>
<UiTableRow
  :link="productUrl"
>
  <UiTableCell>
    <div
      v-if="iconUrl"
      class="logo"
      :style="{ backgroundImage: `url(${iconUrl})` }"
    />
    {{ product.name }}
  </UiTableCell>
  <UiTableCell>
    {{ productType }}
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
    product: {
      required: true,
      type: Object,
    },
  },
  computed: {
    iconUrl() {
      return this.product.image[this.$i18n.locale] || this.product.image.en;
    },
    productType() {
      return this.$t(`product_type_${this.product.type}`);
    },
    productUrl(): string {
      return `/${this.product.type}/${this.product.id}`;
    },
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
