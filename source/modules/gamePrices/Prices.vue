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
        v-model="defaultCurrency"
        :label="$t('defaultCurrency')"
        :options="currencyOptions"
        class="price-setting__item"
        @input="handleChangeCurrency"
      />
      <ui-text-field
        v-model="currencyPrice"
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
          :checked="preordersEnable"
          class="ui-switch-box"
          @change="updatePrices({ preOrder: { enabled: $event } })"
        />
        {{ $t('preordersEnable') }}
      </label>
      <ui-date-time-input
        v-model="preordersDatetime"
        :timestamp="preordersDatetime && new Date(preordersDatetime).getTime() || 0"
        :date-label="$t('preordersStartDate')"
        :locale="$i18n.locale"
        :disabled="!preordersEnable"
        class="ui-date-time-input"
        @input="updatePrices({ preOrder: { date: new Date($event) } })"
      />
    </div>
  </section>

  <section class="page__section section">
    <headline v-show="showDetails" id="prices">
      <span class="section__title">
        {{ $t('prices') }}
    </headline>
    <p v-show="showDetails" class="section__description">
      {{ $t('pricesDescription') }}
    </p>
    <label for="notifyRateJumps" class="switcher">
      <ui-switch-box
        id="notifyRateJumps"
        :checked="notifyRateJumps"
        class="ui-switch-box"
        @change="updatePrices({ common: { notifyRateJumps: $event } })"
      />
      {{ $t('notifyRateJumps') }}
    </label>
  </section>

  <prices-table
    v-if="prices.prices"
    :items="prices.prices"
    :default-currency="(prices.common || {}).currency"
    @set-default="setDefaultCurrency"
    @save-price="handleSavePrice"
  />

</article>
</template>

<script lang="ts">
import i18n from './i18n'
import Headline from '@/components/Headline'
import PricesTable from './PricesTable'
import {
  UiSelect,
  UiTextField,
  UiSwitchBox,
  UiDateTimeInput
} from '@protocol-one/ui-kit'

import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Prices',

  i18n,

  components: {
    Headline,
    PricesTable,
    UiSelect,
    UiTextField,
    UiSwitchBox,
    UiDateTimeInput
  },

  data () {
    return {
      defaultCurrency: undefined,
      currencyPrice: undefined,
      preordersEnable: false,
      preordersDatetime: undefined,
      notifyRateJumps: false
    }
  },

  computed: {
    ...mapState('Game/Prices', ['contents', 'prices']),

    gameId () {
      return this.$route.params.id
    },

    showDetails () {
      if (!this.$route.query.details) {
        return true
      }
      return this.$route.query.details === 'true'
    },

    localizedContents () {
      return this.contents.map(anchor => ({ anchor, text: this.$t(anchor) }))
    },

    currencyOptions () {
      let prices = this.prices.prices || []
      return prices.map(({ currency: label, price: value }) => ({ label, value }))
    },

    currencyLabel () {
      let currency = this.currencyOptions
        .find(({ value }) => value == this.defaultCurrency)
      return (currency || {}).label
    }
  },

  watch: {
    '$i18n.locale': {
      immediate: true,
      handler () {
        this.updateContents(this.localizedContents)
      }
    },

    prices ({ common, preOrder }) {
      this.defaultCurrency = this.getCurrencyValue(this.prices.common.currency)
      this.handleChangeCurrency(this.defaultCurrency)

      this.preordersEnable = preOrder.enabled
      this.preordersDatetime = preOrder.date

      this.notifyRateJumps = common.notifyRateJumps
    }
  },

  created () {
    this.loadPrices(this.gameId)
  },

  methods: {
    ...mapActions('Game/Prices', ['loadPrices', 'savePrice'],),
    ...mapMutations('Game/Prices', ['updatePrices']),
    ...mapMutations('Game', ['updateContents']),

    handleChangeCurrency (value) {
      this.currencyPrice = Number(value) || undefined
      this.updatePrices({
        common: {
          currency: this.currencyLabel
        }
      })
    },

    setDefaultCurrency (value) {
      value = this.getCurrencyValue(value)
      this.defaultCurrency = value
      this.handleChangeCurrency(value)
    },

    getCurrencyValue (value) {
      let currency = this.currencyOptions.find(({ label }) => label === value)
      return (currency || {}).value
    },

    handleSavePrice ({ currency, price, vat }) {
      this.updatePrices({
        prices: this.prices.prices.map(item => {
          if (item.currency === currency) {
            item.price = Number(price)
            item.vat = Number(vat)
          }
          return item
        })
      })
      if (this.defaultCurrency === currency) {
        this.setDefaultCurrency(currency)
      }
      this.savePrice({ gameId: this.gameId, currency })
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
    & /deep/ label {
      margin-bottom: 0;
    }
  }
}
</style>
