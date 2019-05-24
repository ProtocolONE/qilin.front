<template>
<div class="package-general">
  <Header level="2">
    {{ $t('name') }}
  </Header>
  <MultilangTextField
    :value="$props.value.name"
    class="textfield"
    :label="$t('name_label')"
    @change="changeProp('name', $event)"
  />
  <Header level="2">
    {{ $t('sku') }}
  </Header>
  <TextField
    class="textfield"
    :label="$t('sku_label')"
    :value="$props.value.sku"
    @change="changeProp('sku', $event)"
  />
  <div class="box">
    <label
      class="checkbox"
    >
      <Checkbox
        class="check"
        :checked="$props.value.isEnabled"
        @change="changeProp('isEnabled', $event)"
      />
      <span class="label">
        {{ $t(`is_enabled`) }}
      </span>
    </label>
  </div>
  <div class="box">
    <label
      class="checkbox"
    >
      <Checkbox
        class="check"
        :checked="$props.value.isUpgradeAllowed"
        @change="changeProp('isUpgradeAllowed', $event)"
      />
      <span class="label">
        {{ $t(`is_upgrade_allowed`) }}
      </span>
    </label>
  </div>

  <Header level="2">
    {{ $t('products') }}
  </Header>
  <Button
    class="add-game"
    :text="$t('add_game')"
    @click="addGame"
  />
  <UiTable v-if="value.products.length">
    <ProductItem
      v-for="product in value.products"
      :key="product.id"
      v-bind="{ product }"
    />
  </UiTable>
  <p v-else>
    { $t('empty_list') }
  </p>
  <AddGame
    v-if="hasModal"
    @close="hasModal = false"
  />

</div>
</template>

<script type="ts">
import Vue from 'vue';
import {Header, Button, Checkbox, TextField, UiTable} from '@protocol-one/ui-kit';
import MultilangTextField from './MultilangTextField.vue';
import ProductItem from './ProductItem.vue';
import AddGame from './AddGame.vue';
import i18n from '../i18n';

export default Vue.extend({
  i18n,
  components: {Header, Button, AddGame, Checkbox, TextField, MultilangTextField, ProductItem, UiTable},
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hasModal: false,
    };
  },
  computed: {},
  methods: {
    changeProp(prop, value) {
      this.$emit('change', {...this.$props.value, [prop]: value});
    },
    addGame() {
      this.hasModal = true;
    }
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
</style>
