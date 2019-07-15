<template>
<div class="bundle-general">
  <UiHeader level="2">
    {{ $t('name') }}
  </UiHeader>
  <MultilangTextField
    :value="bundle.name"
    class="textfield"
    :label="$t('nameLabel')"
    @change="changeProp('name', $event)"
  />
  <UiHeader level="2">
    {{ $t('sku') }}
  </UiHeader>
  <UiTextField
    class="textfield"
    :label="$t('skuLabel')"
    :value="bundle.sku"
    @input="changeProp('sku', $event)"
  />
  <div class="box">
    <label
      class="checkbox"
    >
      <UiCheckbox
        class="check"
        :checked="bundle.isEnabled"
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
      <UiCheckbox
        class="check"
        :checked="bundle.isUpgradeAllowed"
        @change="changeProp('isUpgradeAllowed', $event)"
      />
      <span class="label">
        {{ $t(`isUpgradeAllowed`) }}
      </span>
    </label>
  </div>

  <UiHeader level="2">
    {{ $t('packages') }}
  </UiHeader>
  <UiButton
    class="add-package"
    :text="$t('addPackage')"
    @click="clickAddPackage"
  />
  <UiButton
    class="remove-package"
    color="orange"
    :text="$t('removePackage')"
    :disabled="!select.length"
    @click="clickRemovePackage"
  />
  <UiTable v-if="bundle.packages">
    <PackageItem
      v-for="pkg in bundle.packages"
      :key="pkg.id"
      v-bind="{ pkg }"
      :checked="isChecked(pkg.id)"
      @change="switchSelect(pkg.id)"
    />
  </UiTable>
  <p v-else>
    {{ $t('emptyList') }}
  </p>
  <AddPackage
    v-if="hasModal"
    @close="hasModal = false"
    @ok="addPackages"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions} from 'vuex';
import {UiButton, UiCheckbox, UiHeader, UiTable, UiTextField} from '@protocol-one/ui-kit';
import MultilangTextField from '../../package/components/MultilangTextField.vue';
import PackageItem from './PackageItem.vue';
import AddPackage from './AddPackage.vue';
import i18n from './i18nGeneral';

export default Vue.extend({
  i18n,
  components: {UiHeader, UiButton, AddPackage, UiCheckbox, UiTextField, MultilangTextField, PackageItem, UiTable},
  props: {
    /**
     * @typedef {id: string; createdAt: Date; sku: string; name: LocalizedString; isUpgradeAllowed: boolean;
     * isEnabled: boolean; discountPolicy: DiscountPolicy; regionalRestrinctions: RegionalRestrictions;
     * packages: PackageItem[]} Bundle
     * @type {Bundle}
     */
    bundle: {
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
    ...mapActions('Bundle', ['addPackages', 'removePackages']),

    changeProp(prop, value) {
      this.$emit('change', {...this.bundle, [prop]: value});
    },
    clickAddPackage() {
      this.hasModal = true;
    },
    clickRemovePackage() {
      this.removePackages(this.select)
        .then(() => {
          this.select = []
        });
    },
    isChecked(id) {
      return this.select.indexOf(id) > -1;
    },
    switchSelect(id) {
      if (this.select.indexOf(id) > -1) {
        this.select = this.select.filter(packageId => packageId !== id);
      } else {
        this.select = this.select.concat([id]);
      }
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
.add-package {
  margin: 10px 0;
}
.remove-package {
  margin: 10px 0;
  margin-left: 10px;
}
</style>
