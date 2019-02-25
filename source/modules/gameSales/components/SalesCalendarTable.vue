<template>
<table class="calendar">

  <thead>
    <tr class="calendar__row calendar__row--months">
      <th
        v-for="(label, i) in monthsLabels"
        :key="`${ label }-${ i }`"
        :colspan="daysList[i].length"
        class="calendar__cell calendar__cell--month"
      >
        {{ label }}
      </th>
    </tr>
    <tr class="calendar__row calendar__row--days">
      <template v-for="(days, i) in daysList">
        <th
          v-for="{ day, holiday } in days"
          :key="`${ day }-${ i }`"
          :class="{ holiday }"
          class="calendar__cell calendar__cell--day"
        >
          {{ day }}
        </th>
      </template>
    </tr>
  </thead>

  <tbody>
    <tr v-for="item in items" :key="item.id" class="calendar__row">
      <td :colspan="daysCount" class="calendar__cell">
        <div class="calendar__sale" :style="getDiscountStyles(item)">
          <div>
            <!-- TODO: hardcode for currency -->
            -{{ item.rate }}% ( $ <del>{{ item.price.discount }}</del> {{ item.price.default }} )
          </div>
          <ul class="calendar__actions actions">
            <li class="shadow-sm actions__item" @click="editDiscount(item)">
              <icon name="edit" width="14" height="14" fill="#000" class="actions__icon"/>
            </li>
            <li class="shadow-sm actions__item" @click="removeDiscount(item.id)">
              <icon name="times" width="12" height="12" fill="#000" class="actions__icon"/>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  </tbody>

</table>
</template>

<script lang="ts">
import Icon from '@/icons'
import Discounts from '../types/discounts'

import {
  differenceInDays,
  getYear,
  getMonth
} from 'date-fns'

export default {
  name: 'SalesCalendarTable',

  inject: ['editDiscount', 'removeDiscount'],

  components: { Icon },

  props: {
    months: Array,
    items: Discounts
  },

  data () {
    return {
      cellWidth: 25
    }
  },

  computed: {
    monthsLabels () {
      return this.months.map(({ month }) => month)
    },

    daysList () {
      return this.months.map(({ days }) => days)
    },

    daysCount () {
      return this.daysList.reduce((result, { length }) => {
        result += length
        return result
      }, 0)
    }
  },

  methods: {
    getDiscountStyles (item: Discounts) {
      let date = item.date
      let [start, end] = [new Date(date.start), new Date(date.end)]
      return {
        width: differenceInDays(end, start) * this.cellWidth + 'px',
        left: differenceInDays(start, new Date(getYear(start), getMonth(start), 1)) * this.cellWidth + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$sale-height: 65px;

.calendar {
  &__row:not(&__row--months):not(&__row--days) {
    height: $sale-height;
    border: 1px solid rgba(0, 0, 0, .05);
  }

  &__cell {
    position: relative;

    &--month {
      padding: 5px 10px;
      outline: 1px solid rgba(0, 0, 0, .05);
      font-weight: normal;
      color: #0C2441;
    }

    &--day {
      min-width: 25px;
      padding: 0;
      vertical-align: middle;
      font-size: 12px;
      font-weight: normal;
      line-height: 25px;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-top: 0;

      &.holiday {
        background-color: #FFEDDC;
      }
    }
  }

  &__sale {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $sale-height;
    white-space: nowrap;
    text-align: center;
    background-color: rgba(55, 135, 255, .3);

    &:hover .actions {
      display: flex;
    }
  }

  &__actions {
    position: absolute;
    right: 16px;
    display: none;
  }
}

.actions {
  margin: 0;
  padding: 0;
  list-style-type: none;
  align-items: center;

  &__item {
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
