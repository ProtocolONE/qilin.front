<template>
<article class="package-discount">

  <section class="page__section section">
    <headline id="discount">
      <span class="section__title">
        {{ $t('discount') }}
      </span>
    </headline>
    <p class="section__description">
      {{ $t('discountDescription') }}
    </p>
    <div>
      <ui-text-field
        :value="discount.discount"
        :label="$t('discount')"
        type="number"
        step="1"
        min="0"
        max="100"
        class="discount-input"
        @input="changeDiscount($event)"
      /><span class="discount-prefix">%</span>
    </div>
  </section>

  <section class="page__section section">
    <headline id="buyOption">
      <span class="section__title">
        {{ $t('buyOption') }}
      </span>
    </headline>
    <p class="section__description">
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
    discount: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
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
    changeBuyOption(value) {
      this.$emit('change', {buyOption: value});
    },
    changeDiscount(value) {
      this.$emit('change', {discount: parseInt(value, 10)});
    },
  },
});
</script>

<style lang="scss">
.buy-option-select {

}
.page__section {
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
