<template>
<UiTableRow class="row">
  <UiTableCell>
    <Checkbox
      :style="{visibility: isDefault ? 'hidden' : 'visible'}"
      class="select"
      :checked="checked"
      @change="$emit('change', $event)"
    />
  </UiTableCell>
  <UiTableCell>
    <div
      v-if="iconUrl"
      class="logo"
      :style="{ backgroundImage: `url(${iconUrl})` }"
    />
    <router-link :to="productUrl">
      {{ product.name }}
    </router-link>
  </UiTableCell>
  <UiTableCell>
    {{ productType }}
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Checkbox, UiTableCell, UiTableRow} from '@protocol-one/ui-kit';
  import i18n from './i18nGeneral';

  export default Vue.extend({
  i18n,
    components: {UiTableRow, UiTableCell, Checkbox},
  props: {
    /**
     * @typedef {id: string; name: string; type: ProductType; image: LocalizedString} Product
     * @type {Product}
     */
    product: {
      required: true,
      type: Object,
    },
    checked: {
      required: true,
      type: Boolean,
    },
    isDefault: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    iconUrl() {
      return this.product.image[this.$i18n.locale] || this.product.image.en;
    },
    productType() {
      return this.$t(`productType.${this.product.type}`);
    },
    productUrl(): string {
      return `/${this.product.type}/${this.product.id}`;
    },
  },
});
</script>

<style scoped lang="scss">
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  background-position: center;
  display: inline-block;
  vertical-align: middle;
}

.row > * {
  padding: 10px 0 10px 10px;
}
</style>
