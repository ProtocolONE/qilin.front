<template>
<div class="package-general">
  <Header level="2">
    {{ $t('name') }}
  </Header>
  <MultilangTextField
    :value="pkg.name"
    class="textfield"
    :label="$t('nameLabel')"
    @change="changeProp('name', $event)"
  />
  <Header level="2">
    {{ $t('sku') }}
  </Header>
  <TextField
    class="textfield"
    :label="$t('skuLabel')"
    :value="pkg.sku"
    @change="changeProp('sku', $event)"
  />
  <div class="box">
    <label
      class="checkbox"
    >
      <Checkbox
        class="check"
        :checked="pkg.isEnabled"
        @change="changeProp('isEnabled', $event)"
      />
      <span class="label">
        {{ $t(`isEnabled`) }}
      </span>
    </label>
  </div>
  <div class="box">
    <label
      class="checkbox"
    >
      <Checkbox
        class="check"
        :checked="pkg.isUpgradeAllowed"
        @change="changeProp('isUpgradeAllowed', $event)"
      />
      <span class="label">
        {{ $t(`isUpgradeAllowed`) }}
      </span>
    </label>
  </div>

  <Header level="2">
    {{ $t('products') }}
  </Header>
  <Button
    class="add-game"
    :text="$t('addGame')"
    @click="clickAddGame"
  />
  <Button
    class="remove-product"
    color="orange"
    :text="$t('removeProduct')"
    @click="clickRemoveProduct"
  />
  <UiTable v-if="pkg.products">
    <ProductItem
      v-for="product in pkg.products"
      :key="product.id"
      v-bind="{ product }"
      :checked="isChecked(product.id)"
      :is-default="isDefault(product.id)"
      @change="switchSelect(product.id)"
    />
  </UiTable>
  <p v-else>
    {{ $t('emptyList') }}
  </p>
  <AddGame
    v-if="hasModal"
    @close="hasModal = false"
    @ok="addProducts"
  />
</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapActions} from 'vuex';
  import {Button, Checkbox, Header, TextField, UiTable} from '@protocol-one/ui-kit';
  import MultilangTextField from './MultilangTextField.vue';
  import ProductItem from './ProductItem.vue';
  import AddGame from './AddGame.vue';
  import i18n from './i18nGeneral';

  export default Vue.extend({
  i18n,
  components: {Header, Button, AddGame, Checkbox, TextField, MultilangTextField, ProductItem, UiTable},
  props: {
    /**
     * @typedef {id: string; createdAt: Date; sku: string; name: string; isUpgradeAllowed: boolean; isEnabled: boolean;
     * isDefault: boolean; products: Product[]; media: PackageMedia; discountPolicy:
     * DiscountPolicy; regionalRestrinctions: RegionalRestrictions; commercial: PackagePrices} Package
     * @type {Package}
     */
    pkg: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hasModal: false,
      select: [],
    };
  },
  computed: {},
  methods: {
    ...mapActions('Package', ['addProducts', 'removeProducts']),

    changeProp(prop, value) {
      this.$emit('change', {...this.pkg, [prop]: value});
    },
    clickAddGame() {
      this.hasModal = true;
    },
    clickRemoveProduct() {
      this.removeProducts(this.select)
        .then(() => {
          this.select = []
        });
    },
    isChecked(id) {
      return this.select.indexOf(id) > -1;
    },
    switchSelect(id) {
      if (this.select.indexOf(id) > -1) {
        this.select = this.select.filter(gameId => gameId !== id);
      } else {
        this.select = this.select.concat([id]);
      }
    },
    isDefault(productId) {
      return productId === this.pkg.defaultProductId;
    },
  },
});
</script>

<style>
.box {
  margin-bottom: 24px;
  max-width: 640px;
}
.checkbox {
  display: inline-flex;
  align-items: center;
  width: 320px;
  padding: 8px 0;
  cursor: pointer;
}
.check {
  height: 20px;
  margin-right: 16px;
}
.add-game {
  margin: 10px 0;
}

.remove-product {
  margin: 10px 0;
  margin-left: 10px;
}
</style>
