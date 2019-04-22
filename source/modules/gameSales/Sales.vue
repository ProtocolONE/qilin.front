<template>
<article id="game-sales" class="sales">

  <sales-page-header
    @search="handlerSearch"
    @rerender="replaceRouteQuery({ type: $event.trim() })"
    @show-modal="modal = true"
  />

  <keep-alive>
    <sales-dummy v-if="!discountsList.length" @create="modal = true"/>
    <component v-else-if="discounts.length" :is="renderComponent" :items="discounts"/>
    <sales-search-empty v-else @reset-search="handlerSearch"/>
  </keep-alive>

  <sales-discount-modal
    v-if="modal"
    :data="modalData"
    @create="handlerCreateDiscount"
    @update="handlerUpdateDiscount"
    @close="closeModal"
  />

</article>
</template>

<script lang="ts">
import i18n from './i18n'

import SalesPageHeader from './components/SalesPageHeader'
import SalesTable from './components/SalesTable'
import SalesCalendar from './components/SalesCalendar'
import SalesDiscountModal from './components/SalesDiscountModal'
import SalesDummy from './components/SalesDummy'
import SalesSearchEmpty from './components/SalesSearchEmpty'

import Discounts from './types/discounts'
import { DiscountsDate } from './types/discounts'

import { differenceInDays } from 'date-fns'
import { find } from 'lodash-es'
import { mapState, mapActions } from 'vuex'

const DEFAULT_RENDER_TYPE = 'table'

function getDiffInDays (date: DiscountsDate) {
  return differenceInDays(
    new Date(date.end),
    new Date(date.start)
  )
}

function calculateDiscount (price: number, rate: number) {
  return Math.trunc(price * rate) / 100
}

export default {
  name: 'Sales',

  i18n,

  provide () {
    return {
      $i18n: this.$i18n,
      replaceRouteQuery: this.replaceRouteQuery,
      editDiscount: this.editDiscount,
      removeDiscount: this.removeDiscount
    }
  },

  components: {
    SalesPageHeader,
    SalesTable,
    SalesCalendar,
    SalesDiscountModal,
    SalesDummy,
    SalesSearchEmpty
  },

  data () {
    return {
      searchTimeout: null,
      currency: 'USD',
      modal: false,
      modalData: {}
    }
  },

  computed: {
    ...mapState('Game', ['gameInfo']),
    ...mapState('Sales', {
      pricesList: 'prices',
      discountsList: 'discounts'
    }),

    gameId () {
      return this.$route.params.resourceId
    },

    routeQuery () {
      return this.$route.query
    },

    renderType () {
      return this.routeQuery.type
    },

    renderComponent () {
      let component = this.renderType.replace(/^\w/, c => c.toUpperCase())
      return 'Sales' + component
    },

    prices () {
      return this.pricesList.prices
    },

    discounts () {
      return this.discountsList
        .map(this.getDiscountItem)
        .filter(this.searchDiscountItems)
    },

    usdPrice () {
      let { price } = find(this.prices, { currency: this.currency }) || {}
      return price || 0
    },
  },

  async created () {
    if (!this.renderType) {
      void this.replaceRouteQuery({ type: DEFAULT_RENDER_TYPE })
    }
    void await this.initGameState(this.gameId)
    void await this.initSalesState(this.gameId)
  },

  methods: {
    ...mapActions('Game', { initGameState: 'initState' }),
    ...mapActions('Sales', { initSalesState: 'initState' }),
    ...mapActions('Sales', ['createDiscount', 'updateDiscount', 'removeDiscount']),

    replaceRouteQuery (query) {
      this.$router.replace({
        ...this.$route,
        query: {
          ...this.$route.query,
          ...query
        }
      })
    },

    handlerSearch (search: string, timeout: number = 300) {
      void clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(this.replaceRouteQuery, timeout, { search })
    },

    getDiscountItem (discount: Discounts) {
      let locale = this.$i18n.locale
      let currencyPrice = this.usdPrice
      return {
        ...discount,
        title: discount.title[locale],
        description: discount.description[locale],
        days: getDiffInDays(discount.date),
        price: {
          default: currencyPrice,
          discount: calculateDiscount(currencyPrice, discount.rate)
        }
      }
    },

    searchDiscountItems (discount: Discounts) {
      let search = (this.routeQuery.search || '').toLowerCase()
      return discount.title.includes(search)
    },

    handlerCreateDiscount (data: object) {
      this.createDiscount(this.getDiscountData(data))
      this.closeModal()
    },

    handlerUpdateDiscount (data: object) {
      this.updateDiscount(this.getDiscountData(data))
      this.closeModal()
    },

    getDiscountData (data: object) {
      let locale = this.$i18n.locale
      return {
        ...data,
        title: { [locale]: data.label },
        description: { [locale]: data.description },
        date: {
          start: new Date(data.start),
          end: new Date(data.end)
        },
        rate: data.rate
      }
    },

    editDiscount (data: object) {
      this.modalData = data
      this.modal = true
    },

    closeModal () {
      this.modal = false
      this.modalData = {}
    },
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
</style>
