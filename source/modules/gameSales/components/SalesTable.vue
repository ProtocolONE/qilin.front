<template>
<section id="sales-table" class="table-render">

  <header class="table-render__header"></header>

  <div class="table-render__wrapper">
    <table class="sales-table">

      <thead>
        <tr>
          <sales-table-head
            v-for="head in heads"
            :key="head"
            :label="head"
            @sort="handlerSort"
          />
        </tr>
      </thead>

      <tbody>
        <sales-table-item
          v-for="item in sortedItems"
          v-bind="item"
          :key="item.id"
          @edit="editDiscount(item)"
          @remove="removeDiscount(item.id)"
        />
      </tbody>

    </table>
  </div>

</section>
</template>

<script lang="ts">
import SalesTableHead from './SalesTableHead'
import SalesTableItem from './SalesTableItem'

import Discounts from '../types/discounts'

import { orderBy } from 'lodash-es'

export default {
  name: 'SalesTable',

  inject: ['$i18n', 'replaceRouteQuery', 'editDiscount', 'removeDiscount'],

  components: { SalesTableHead, SalesTableItem },

  props: {
    items: Discounts
  },

  data () {
    return {
      heads: ['name', 'period', 'duration', 'rate', 'price']
    }
  },

  computed: {
    sortedItems () {
      let { order, sort } = this.$route.query
      switch (sort) {
        case 'name':
          sort = 'title'
          break
        case 'period':
          sort = ['date.start', 'date.end']
          break
        case 'duration':
          sort = 'days'
          break
        case 'price':
          sort = 'price.discount'
          break
        default: break
      }
      return orderBy(this.items, sort, order)
    }
  },

  methods: {
    handlerSort (sort) {
      let query = this.$route.query
      let order = (sort === query.sort) ? (query.order || 'asc') : 'asc'

      if (sort === query.sort) {
        if (order === 'asc') order = 'desc'
        else order = 'asc'
      }

      this.replaceRouteQuery({ sort, order })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-render {
  position: relative;
  flex-grow: 1;

  &__header {
    height: 40px;
    background-color: #F6F6F6;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 0;
  }

  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 30px 33px;
    overflow: auto
  }
}

.sales-table {
  width: 100%;
  min-width: 1000px;
}
</style>
