<template>
<div class="table-container">
  <header class="table-container--header"></header>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="h in heads"
          :key="h.label"
          :width="h.width"
          :class="[order, { 'thead--sorted': h.order === sort }]"
          class="thead"
        >
          <icon
            v-show="h.order === sort"
            v-bind="icon"
            class="thead__icon"
          />
          <label class="thead__label" @click.stop="handlerSort(h.order)">
            {{ $t(h.label) }}
          </label>
        </th>
        <th width="75"></th>
      </tr>
    </thead>
    <tbody>
      <prices-table-item
        v-for="item in mappedItems"
        v-bind="item"
        :key="item.currency"
        :default-currency="defaultCurrency"
        @set-default="$emit('set-default', item.defaultCurrency)"
        @save-price="$emit('save-price', { currency: item.defaultCurrency, price: $event })"
      />
    </tbody>
  </table>
</div>
</template>

<script lang="ts">
import i18n from './i18n'
import Icon from '@/icons'
import PricesTableItem from './PricesTableItem'
import { orderBy, cloneDeep } from 'lodash-es'

export default {
  name: 'PricesTable',

  i18n,

  components: { Icon, PricesTableItem },

  props: {
    items: Array,
    defaultCurrency: String
  },

  data () {
    return {
      heads: [
        { label: 'currency', order: 'currency', width: 'auto' },
        { label: 'suggestedPrice', order: 'price', width: '120' },
        { label: 'vat', order: 'vat', width: '75' },
        { label: 'endUserPrice', order: 'userPrice', width: '120' }
      ],
      icon: {
        name: 'sort',
        width: 10,
        height: 10,
        fill: '#000'
      },
      sort: null,
      order: 'asc'
    }
  },

  computed: {
    mappedItems () {
      let currency = this.defaultCurrency
      return cloneDeep(this.items).map(item => {
        item.defaultCurrency = item.currency
        item.userPrice = parseFloat((item.price - item.price * item.vat / 100).toFixed(2))
        if (currency === item.currency) {
          item.currency = `${ item.currency } (${ this.$t('default') })`
        }
        return item
      })
    },

    sortedItems () {
      return orderBy(this.mappedItems, this.sort, this.order)
    }
  },

  methods: {
    handlerSort (value) {
      let { order, sort } = this
      order = (sort === value) ? (order || 'asc') : 'asc'
      if (sort === value) {
        if (order === 'asc') order = 'desc'
        else order = 'asc'
      }
      this.order = order
      this.sort = value
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  padding: 0 33px;
  position: relative;
  &--header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background-color: #F6F6F6;
    outline: 1px solid #dee2e6;
  }
}

.table {
  table-layout: fixed;
  font-size: 13px;

  .thead {
    position: relative;
    height: 40px;
    padding-left: 15px;
    color: #B1B1B1;
    transition: color .2s linear;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: #F6F6F6;
    border: 1px solid #dee2e6;

    &__icon {
      position: absolute;
      top: 15px;
      left: 0;
      transition: transform .2s linear;
    }

    &__label {
      margin-bottom: 0;
      cursor: pointer;
    }

    &--sorted {
      color: #0C2441;

      &.desc .thead__icon {
        transform: rotateX(180deg);
      }
    }
  }
}
</style>
