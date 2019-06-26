<template>
<article class="bundle-discount">

  <section class="section">
    <headline id="discount">
      <span class="section_title">
        {{ $t('discount') }}
      </span>
    </headline>
    <p class="section_description">
      {{ $t('discountDescription') }}
    </p>
    <div>
      <ui-text-field
        v-model="discount.discount"
        :label="$t('discount')"
        type="number"
        step="1"
        min="0"
        max="100"
        class="discount-input"
        @input="changeDiscount($event)"
        @blur="validateDiscount"
      /><span class="discount-prefix">%</span>
    </div>
  </section>

  <section class="section">
    <headline id="buyOption">
      <span class="section_title">
        {{ $t('buyOption') }}
      </span>
    </headline>
    <p class="section_description">
      {{ $t('buyOptionDescription') }}
    </p>
    <div>
      <ui-select
        :value="discount.buyOption"
        :options="buyOptions"
        :label="$t('buyOption')"
        class="buy-option-select"
        @input="changeBuyOption($event)"
      />
    </div>
  </section>

</article>
</template>

<script lang="ts">
import Vue from 'vue';
import {UiSelect, UiTextField} from '@protocol-one/ui-kit'
import Headline from '@/components/Headline.vue'
import i18n from './i18nDiscount';

export default Vue.extend({
  i18n,
  components: {
    Headline,
    UiSelect,
    UiTextField,
  },
  props: {
    /**
     * @typedef {discount: number; buyOption: BuyOption} DiscountPolicy
     * @type {DiscountPolicy}
     */
    discount: {
      type: Object,
      required: true,
    },
  },
  computed: {
    buyOptions() {
      return [
        {label: this.$t('buyOptions.whole'), value: 'whole'},
        {label: this.$t('buyOptions.part'), value: 'part'},
      ];
    }
  },
  methods: {
    validateDiscount() {
      this.$emit('change', {discount: Math.max(Math.min(this.discount.discount, 100), 0)});
    },
    changeBuyOption(value) {
      this.$emit('change', {buyOption: value});
    },
    changeDiscount(value) {
      this.$emit('change', {discount: value});
    },
  },
});
</script>

<style scoped lang="scss">
.section {
  max-width: 500px;
}
.discount-input {
  max-width: 140px;
  display: inline-block;
}
.discount-prefix {
  margin-left: 10px;
  display: inline-block;
}
</style>
