<template>
<UiTableRow
  class="row"
  :isHoverable="false"
  :isClickable="false"
>
  <UiTableCell class="select-cell">
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
  <UiTableCell class="type-cell">
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
.select-cell {
  width: 60px;
}
.type-cell {
  width: 100px;
}
.select {
  position: relative;
  top: 4px;
}
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
