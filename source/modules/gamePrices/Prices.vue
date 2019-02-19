<template>
<div id="game-prices" class="prices" :class="$style.prices">

  <ui-header :title="$t('sales')" :breadcrumbs="breadcrumbs">

    <ui-searcher
      slot="search"
      :label="$t('search')"
      @input="handlerSearch"
    />

    <ul slot="hint" class="switcher-list">
      <li>
        <input
          id="switcher-table"
          name="render-type"
          type="radio"
          class="switcher-list__radio"
          @change="$router.replace({ name: 'gamePricesTable' })"
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
          @change="$router.replace({ name: 'gamePricesCalendar' })"
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
    <router-view v-if="discounts.length" :items="discounts"/>
    <dummy v-else @create="createSaleModal = true"/>
  </keep-alive>

  <create-sale
    v-if="createSaleModal"
    @hide="createSaleModal = false"
    @create="createSale"
  />

</div>
</template>

<script lang="ts">
import axios from 'axios'
import config from '@/config'
import i18n from './i18n'

import CreateSale from './components/CreateSale'
import Dummy from './components/Dummy'
import Icon from './components/Icon'

import {
  PageHeader as UiHeader,
  TextField as UiSearcher,
  SwitchBox as UiSwitcher,
  Button as UiButton
} from '@protocol-one/ui-kit'

export default {
  name: 'GamePrices',

  i18n,

  components: {
    CreateSale,
    Icon,
    Dummy,
    UiHeader,
    UiSearcher,
    UiSwitcher,
    UiButton
  },

  data () {
    return {
      game: {},
      discounts: [],
      iconOptions: {
        width: '18px',
        height: '18px',
        fill: '#333333'
      },
      searchTimeout: null,
      createSaleModal: false
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

    discountsUrl () {
      return `${ this.gameUrl }/discounts/`
    },

    breadcrumbs () {
      let crumb = { url: this.gameUrl, label: this.$t('allGames'), router: true }
      return [crumb, { label: this.game.internalName }]
    }
  },

  created () {
    void this.loadData(this.gameUrl, 'game')
    void this.loadData(this.discountsUrl, 'discounts')
  },

  methods: {
    loadData (url, prop) {
      axios.get(url).then(({ data }) => this.fillData(data, prop))
    },

    fillData (data, prop) {
      this[prop] = data
    },

    handlerSearch (search) {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.$router.replace({
          ...this.$route,
          query: { search }
        })
      }, 300)
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
        .then(() => { void this.loadData(this.gameUrl, 'game') })
        .then(() => { this.createSaleModal = false })
    }
  }
}
</script>

<style lang="scss" scoped>
.prices {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
.prices {
  [class^="search"] {
    margin-left: auto;
  }

  [class^="hint"] {
    margin-right: 33px;
    margin-left: auto;
  }
}
</style>
