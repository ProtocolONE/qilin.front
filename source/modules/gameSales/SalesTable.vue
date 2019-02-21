<template>
<section class="sales-table">

  <header class="sales-table__header"></header>

  <div class="sales-table__content">
    <table>
      <thead>
        <tr>
          <th
            v-for="(label, index) in theads"
            :key="label"
            :class="[{ sort: label === $route.query.sort }, $route.query.order]"
            :colspan="(index === theads.length - 1) ? 2 : 1"
          >

            <icon
              v-show="label === $route.query.sort"
              name="sort"
              width="10"
              height="10"
              fill="#000"
            />

            <label @click="handlerSort(label)">
              {{ $t(label) }}
            </label>

          </th>
        </tr>
      </thead>
      <tbody>
        <item-table
          v-for="item in sortedItems"
          v-bind="item"
          :key="item.id"
          type="table"
          @edit="$emit('edit', item)"
          @remove="$emit('remove', item)"
        />
      </tbody>
    </table>
  </div>

</section>
</template>

<script lang="ts">
import i18n from './i18n'

import Icon from './components/Icon'
import ItemTable from './components/ItemTable'

import { orderBy } from 'lodash'

export default {
  name: 'PriceTable',

  i18n,

  components: { Icon, ItemTable },

  props: {
    items: Array
  },

  data () {
    return {
      sort: '',
      order: '',
      theads: ['name', 'period', 'duration', 'rate', 'price']
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

      this.$router.replace({
        ...this.$route,
        query: { ...query, sort, order }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sales-table {
  position: relative;
  flex-grow: 1;

  &__header {
    height: 40px;
    background-color: #F6F6F6;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 0;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0 30px 33px;
    overflow: auto
  }

  table {
    width: 100%;
    min-width: 1000px;

    th {
      position: relative;
      height: 40px;
      padding-left: 15px;
      color: #B1B1B1;
      transition: color .2s ease;

      &.sort {
        color: #0C2441;

        &.desc svg {
          transform: rotateX(180deg);
        }
      }

      svg {
        position: absolute;
        top: 15px;
        left: 0;
        transition: transform .2s ease
      }

      label {
        margin-bottom: 0;
        cursor: pointer;
      }
    }

    tbody tr {
      background-color: #fff;
    }
  }
}
</style>
