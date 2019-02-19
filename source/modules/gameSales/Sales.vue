<template>
<div id="game-sales" class="sales" :class="$style.sales">

  <ui-header :title="$t('sales')" :breadcrumbs="breadcrumbs">

    <ui-searcher
      slot="search"
      :label="$t('search')"
      :value="$route.query.search"
      @input="handlerSearch"
    />

    <ul slot="hint" class="switcher-list">
      <li>
        <input
          id="switcher-table"
          name="render-type"
          type="radio"
          class="switcher-list__radio"
          @change="$router.replace({ name: 'gameSalesTable' })"
          checked
          hidden
        >
        <label for="switcher-table">
          <icon v-bind="iconOptions" name="table"/>
        </label>
      </li>
      <li>
        <input
          id="switcher-calendar"
          name="render-type"
          type="radio"
          class="switcher-list__radio"
          @change="$router.replace({ name: 'gameSalesCalendar' })"
          hidden
        >
        <label for="switcher-calendar">
          <icon v-bind="iconOptions" name="calendar"/>
        </label>
      </li>
    </ul>

    <ui-button
      slot="right"
      :text="$t('createNewSale')"
      @click="createSaleModal = true"
    />

  </ui-header>

  <keep-alive>
    <dummy v-if="!discounts.length" @create="createSaleModal = true"/>
    <router-view
      v-else-if="filteredItems.length"
      :items="filteredItems"
      @edit="editSale"
      @remove="removeSale"
    />
    <search-empty v-else @reset-search="handlerSearch"/>
  </keep-alive>

  <create-sale
    v-if="createSaleModal"
    :data="saleModalData"
    @create="createSale"
    @update="updateSale"
    @hide="hideSaleModal"
  />

</div>
</template>

<script lang="ts">
import axios from 'axios'
import config from '@/config'
import i18n from './i18n'
import { find } from 'lodash'

import CreateSale from './components/CreateSale'
import Dummy from './components/Dummy'
import SearchEmpty from './components/SearchEmpty'
import Icon from './components/Icon'

import {
  PageHeader as UiHeader,
  TextField as UiSearcher,
  SwitchBox as UiSwitcher,
  Button as UiButton
} from '@protocol-one/ui-kit'

function getDays ({ start, end }) {
  let day = 24 * 60 * 60 * 1000

  start = new Date(start)
  end = new Date(end)

  return Math.round(
    Math.abs(
      (start.getTime() - end.getTime()) / day
    )
  )
}

function calculateSalePrice (price, rate) {
  return Math.trunc(price * rate) / 100
}

export default {
  name: 'GameSales',

  i18n,

  components: {
    CreateSale,
    Icon,
    Dummy,
    SearchEmpty,
    UiHeader,
    UiSearcher,
    UiSwitcher,
    UiButton
  },

  data () {
    return {
      game: {},
      prices: {},
      discounts: [],
      iconOptions: {
        width: '18px',
        height: '18px',
        fill: '#333333'
      },
      currency: 'USD',
      searchTimeout: null,
      createSaleModal: false,
      saleModalData: {}
    }
  },

  computed: {
    locale () {
      return this.$i18n.locale
    },

    meta () {
      return this.$route.meta
    },

    gameId () {
      return this.$route.params.id
    },

    gameUrl () {
      return `${ config.api }/api/v1/games/${ this.gameId }`
    },

    pricesUrl () {
      return `${ this.gameUrl }/prices/`
    },

    discountsUrl () {
      return `${ this.gameUrl }/discounts/`
    },

    breadcrumbs () {
      let crumb = { url: this.gameUrl, label: this.$t('allGames'), router: true }
      return [crumb, { label: this.game.internalName }]
    },

    USDPrice () {
      let { price } = find(this.prices.prices, { currency: this.currency }) || {}
      return price
    },

    filteredItems () {
      let query = (this.$route.query.search || '').toLowerCase()
      return this.discounts
        .map(this.fillPriceItem)
        .filter(({ title = '' }) => title.toLowerCase().includes(query))
    }
  },

  async created () {
    void this.loadData(this.gameUrl, 'game')
    void this.loadData(this.pricesUrl, 'prices')
    void this.loadData(this.discountsUrl, 'discounts')
  },

  methods: {
    loadData (url, prop) {
      axios.get(url).then(({ data }) => this.fillData(data, prop))
    },

    fillData (data, prop) {
      this[prop] = data
    },

    fillPriceItem (item) {
      let locale = this.locale
      return {
        ...item,
        title: item.title[locale],
        description: item.description[locale],
        days: getDays(item.date),
        price: calculateSalePrice(this.USDPrice, item.rate)
      }
    },

    handlerSearch (search, timeout = 300) {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.$router.replace({
          ...this.$route,
          query: { ...this.$route.query, search }
        })
      }, timeout)
    },

    hideSaleModal () {
      this.createSaleModal = false
      this.saleModalData = {}
    },

    getSaleData ({ label, start, end, rate, description }) {
      let key = this.locale
      return {
        title: { [key]: label },
        description: { [key]: description },
        date: { start, end },
        rate
      }
    },

    createSale (data) {
      axios
        .post(this.discountsUrl, this.getSaleData(data))
        .then(() => { this.loadData(this.discountsUrl, 'discounts') })
        .then(this.hideSaleModal)
    },

    updateSale (data) {
      let url = this.discountsUrl + this.saleModalData.id
      axios
        .put(url, this.getSaleData(data))
        .then(() => { this.loadData(this.discountsUrl, 'discounts') })
        .then(this.hideSaleModal)
    },

    editSale (item) {
      this.saleModalData = item
      this.createSaleModal = true
    },

    removeSale (item) {
      let url = this.discountsUrl + item.id
      axios.delete(url).then(() => { this.loadData(this.discountsUrl, 'discounts') })
    }
  }
}
</script>

<style lang="scss" scoped>
.sales {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.switcher-list {
  $switcher-color: #EAEAEA;

  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      margin-bottom: 0;
      padding: 0 15px;
      border: 1px solid $switcher-color;
      border-radius: 25px;
      cursor: pointer;
      transition: background-color .2s ease;

      svg {
        transition: fill .2s ease;
      }
    }

    &:first-child label {
      padding-right: 10px;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    &:last-child label {
      padding-left: 10px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }

  input[type="radio"] {
    &:checked + label {
      background-color: $switcher-color;
      svg {
        fill: #C4C4C4;
      }
    }
  }
}
</style>

<style lang="scss" module>
.sales {
  [class^="search"]:not([class~="search-empty"]) {
    margin-left: auto;
  }

  [class^="hint"] {
    margin-right: 33px;
    margin-left: auto;
  }
}
</style>
