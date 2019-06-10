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
          :class="['thead', order, { 'thead--sorted': h.order === sort }]"
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
        :key="item.currency"
        v-bind="item"
        :default-currency="defaultCurrency"
        @set-default="$emit('set-default', item.defaultCurrency)"
        @save-price="$emit('save-price', { currency: item.defaultCurrency, ...$event })"
        @remove-currency="$emit('remove-currency', item.defaultCurrency)"
      />

      <tr class="more-currencies">
        <td class="cell" :colspan="heads.length + 1">
          <a class="price-more-currencies" href="/" @click.prevent="clickMoreCurrencies">{{ $t('moreCurrencies') }}
            <svg
              class="arrow"
              :style="{transform: moreCurrencies ? 'rotate(90deg)' : 'rotate(0)'}"
              width="4"
              height="6"
              viewBox="0 0 4 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-2.31312e-07 0.708189C-2.58836e-07 0.0785217 0.821831 -0.236815 1.30248 0.208426L3.77653 2.50024C4.07449 2.77625 4.07449 3.22375 3.77653 3.49976L1.30248 5.79157C0.821832 6.23682 -3.43233e-09 5.92148 -3.0956e-08 5.29181L-2.31312e-07 0.708189Z"
                fill="#2B88F5"
              />
            </svg>
          </a>
        </td>
      </tr>

      <tr
        v-for="c in defaultCurrencies"
        v-if="moreCurrencies"
        :key="c.value"
        class="more-currency"
      >
        <td class="cell">
          {{ c.value }}
        </td>
        <td class="cell">
          {{ c.price }}
        </td>
        <td class="cell"></td>
        <td class="cell"></td>
        <td class="cell">
          <a href="/" @click.prevent="$emit('add-currency', c)">{{ $t('addCurrency') }}</a>
        </td>
      </tr>

    </tbody>
  </table>
</div>
</template>

<script lang="ts">
  import {cloneDeep, orderBy} from 'lodash-es'
  import Icon from '@/icons'
  import i18n from './i18n'
  import PricesTableItem from './PricesTableItem.vue'
  import DefaultCurrencies from '@/helpers/defaultCurrencies'

  export default {
    name: 'PricesTable',

    i18n,

    components: {Icon, PricesTableItem},

    props: {
      items: Array,
      defaultCurrency: String
    },

    data() {
      return {
        heads: [
          {label: 'currency', order: 'currency', width: '170'},
          {label: 'suggestedPrice', order: 'price', width: '170'},
          {label: 'vat', order: 'vat', width: '75'},
          {label: 'endUserPrice', order: 'userPrice', width: '120'}
        ],
        icon: {
          name: 'sort',
          width: 10,
          height: 10,
          fill: '#000'
        },
        sort: null,
        order: 'asc',
        moreCurrencies: !this.items.length,
      }
    },

    computed: {
      mappedItems() {
        const currency = this.defaultCurrency;
        const mappedItems = cloneDeep(this.items).map(item => {
          item.defaultCurrency = item.currency;
          item.userPrice = parseFloat((item.price - item.price * item.vat / 100).toFixed(2));
          if (currency === item.currency) {
            item.currency = `${item.currency} (${this.$t('default')})`
          }
          return item
        });
        return orderBy(mappedItems, this.sort, this.order)
      },

      defaultCurrencies() {
        const item = this.items.find(({currency}) => currency === this.defaultCurrency);
        const curr = DefaultCurrencies.find(({value}) => value === this.defaultCurrency);
        const basePrice = item && curr && curr.rate > 0 ? (item.price / curr.rate) : 0;

        return DefaultCurrencies
          .filter(({value}) => !this.items.find(i => i.currency === value))
          .map(dcurr => ({...dcurr, price: parseFloat((basePrice * dcurr.rate).toFixed(2))}))
      },

      defaultPrice() {
        const found = this.items.find(({currency}) => currency === this.defaultCurrency);
        return found ? found.price : 0;
      },
    },

    methods: {
      clickMoreCurrencies() {
        this.moreCurrencies = !this.moreCurrencies;
      },

      handlerSort(value) {
        let {order, sort} = this;
        order = (sort === value) ? (order || 'asc') : 'asc';
        if (sort === value) {
          if (order === 'asc') order = 'desc';
          else order = 'asc'
        }
        this.order = order;
        this.sort = value;
      },
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

    .arrow {
      margin-left: 9px;
      transform: rotate(0deg);
      transition: transform 0.2s ease;
    }
  }

  .more-currency {
    color: #999;
  }

  .arrow {
    margin-left: 16px;
  }
</style>
