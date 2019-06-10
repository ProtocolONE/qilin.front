<template>
<article class="page">

  <section class="page__section section">
    <headline v-show="showDetails" id="defaultCurrency">
      <span class="section__title">
        {{ $t('defaultCurrency') }}
      </span>
    </headline>
    <p v-show="showDetails" class="section__description">
      {{ $t('defaultCurrencyDescription') }}
    </p>

    <div class="price-setting">
      <ui-select
        :value="commercial.common.currency"
        :options="currencyOptions"
        :label="$t('defaultCurrency')"
        class="price-setting__item"
        @input="changeDefaultCurrency"
      />
      <ui-text-field
        :value="defaultPrice"
        :label="$t('priceInDefaultCurrency')"
        disabled
        class="price-setting__item"
      />
    </div>

    <p v-show="showDetails" class="section__description">
      {{ $t('defaultCurrencyInfo') }}
    </p>
  </section>

  <section class="page__section section">
    <headline v-show="showDetails" id="preorders">
      <span class="section__title">
        {{ $t('preorders') }}
      </span>
    </headline>
    <p v-show="showDetails" class="section__description">
      {{ $t('preordersDescription') }}
    </p>

    <div class="preorders-options">
      <label for="preordersEnable" class="switcher">
        <ui-switch-box
          id="preordersEnable"
          :checked="commercial.preOrder.enabled"
          class="ui-switch-box"
          @change="update({ preOrder: { enabled: $event } })"
        />
        {{ $t('preordersEnable') }}
      </label>
      <ui-date-time-input
        :value="commercial.preOrder.date"
        :timestamp="commercial.preOrder.date && new Date(commercial.preOrder.date).getTime() || 0"
        :date-label="$t('preordersStartDate')"
        :locale="$i18n.locale"
        :disabled="!commercial.preOrder.enabled"
        class="ui-date-time-input"
        @input="update({ preOrder: { date: new Date($event) } })"
      />
    </div>
  </section>

  <section class="page__section section">
    <headline v-show="showDetails" id="prices">
      <span class="section__title">
        {{ $t('prices') }}
      </span>
    </headline>
    <p v-show="showDetails" class="section__description">
      {{ $t('pricesDescription') }}
    </p>
    <label for="notifyRateJumps" class="switcher">
      <ui-switch-box
        id="notifyRateJumps"
        :checked="commercial.common.notifyRateJumps"
        class="ui-switch-box"
        @change="update({ common: { notifyRateJumps: $event } })"
      />
      {{ $t('notifyRateJumps') }}
    </label>
  </section>

  <prices-table
    :items="commercial.prices || []"
    :default-currency="commercial.common.currency"
    @set-default="changeDefaultCurrency"
    @save-price="handleSavePrice"
    @add-currency="$emit('addCurrency', $event)"
    @remove-currency="$emit('removeCurrency', $event)"
  />

</article>
</template>

<script lang="ts">
  import {merge} from 'lodash-es'
  import {UiDateTimeInput, UiSelect, UiSwitchBox, UiTextField} from '@protocol-one/ui-kit'
  import i18n from './i18n'
  import Headline from '@/components/Headline.vue'
  import PricesTable from './PricesTable.vue'

  export default {
  i18n,

  components: {
    Headline,
    PricesTable,
    UiSelect,
    UiTextField,
    UiSwitchBox,
    UiDateTimeInput
  },

  props: {
    /**
     * @typedef {common: number; preOrder: PackagePreOrder; prices: Price[]} PackagePrices
     * @type {PackagePrices}
     */
    commercial: {
      type: Object,
      required: true,
    },
  },

  computed: {
    defaultPrice() {
      const found = (this.commercial.prices || [])
        .find(({currency}) => currency === this.commercial.common.currency);
      return found ? found.price : 0;
    },

    showDetails() {
      if (!this.$route.query.details) {
        return true
      }
      return this.$route.query.details === 'true'
    },

    currencyOptions() {
      return (this.commercial.prices || [])
        .map(({currency}) => ({label: currency, value: currency}));
    },

  },

  methods: {
    update(props) {
      this.$emit('change', merge(this.commercial, props));
    },

    changeDefaultCurrency(value) {
      this.update({
        common: {
          currency: value
        }
      })
    },

    handleSavePrice(price) {
      this.update({
        prices: (this.commercial.prices || [])
          .map(
            p => p.currency === price.currency
              ? price
              : p)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.page {
  min-width: 528px;
  max-width: 768px;
  min-height: calc(100vh - 84px);
  color: #333333;

  &__section {
    margin: 33px 30px;

    &:not(:last-of-type) {
      margin-bottom: 25px;
    }
  }
}

.section {
  &__title {
    font-size: 20px;
  }

  &__description {
    font-size: 14px;
    color: #b1b1b1;
  }
}

.preorders-options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.price-setting {
  max-width: 500px;
  display: flex;
  align-items: center;

  &__item {
    &:not(:last-child) {
      margin-right: 24px;
    }
  }
}

.switcher {
  display: inline-flex;
  align-items: center;

  .ui-switch-box {
    margin-right: 16px;
  }
}
</style>
