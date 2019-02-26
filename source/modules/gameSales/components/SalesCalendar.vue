<template>
<section id="sales-calendar" class="sales-calendar">

  <aside class="shadow sales-calendar__aside">
    <ul class="sales-calendar__list calendar-list" ref="list">
      <li v-for="item in items" :key="item.id" class="calendar-list__item">
        <a href="#" @click.prevent="editDiscount(item)" class="calendar-list__link">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </aside>

  <div class="sales-calendar__content" @scroll="handlerScroll">
    <sales-calendar-table v-bind="{ startDate, months, items }"/>
  </div>

</section>
</template>

<script lang="ts">
import SalesCalendarTable from './SalesCalendarTable'
import Discounts from '../types/discounts'

import { map, min, max } from 'lodash-es'
import {
  differenceInCalendarMonths,
  getDaysInMonth,
  getYear,
  getMonth,
  isWeekend,
  format
} from 'date-fns'

export default {
  name: 'SalesCalendar',

  inject: ['$i18n', 'editDiscount'],

  components: { SalesCalendarTable },

  props: {
    items: Discounts
  },

  computed: {
    startDate () {
      let dates = map(this.items, 'date.start')
      return new Date(min(dates))
    },

    endDate () {
      let dates = map(this.items, 'date.end')
      return new Date(max(dates))
    },

    differenceInMonths () {
      return differenceInCalendarMonths(this.endDate, this.startDate)
    },

    months () {
      let month = getMonth(this.startDate)
      let year = getYear(this.startDate)

      let firstMonth = [{
        month: format(new Date(year, month), 'MMMM') + ` - ${ year }`,
        days: this.getDays(month, year)
      }]

      if (!this.differenceInMonths) {
        return firstMonth
      }

      let months = Array
        .apply(null, { length: this.differenceInMonths })
        .map((_, i) => {
          let nextMonth = (month + i + 1)
          let nextYear = getYear(new Date(year, nextMonth))
          return {
            month: format(new Date(year, nextMonth), 'MMMM') + ` - ${ nextYear }`,
            days: this.getDays(nextMonth, nextYear)
          }
        })

      return firstMonth.concat(months)
    }
  },

  methods: {
    getDays (month: number, year: number) {
      return Array
        .apply(null, { length: getDaysInMonth(new Date(year, month)) })
        .map((_, i) => ({
          day: (i + 1),
          holiday: isWeekend(new Date(year, month, (i + 1)))
        }))
    },

    handlerScroll (e: object) {
      requestAnimationFrame(() => {
        this.$refs.list.style.top = -(e.target.scrollTop) + 'px'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$sale-height: 65px;

.sales-calendar {
  position: relative;
  flex-grow: 1;
  display: flex;

  &__aside {
    width: 200px;
    padding-top: $sale-height - 5;
    flex: 1 0 200px;
  }

  &__content {
    width: auto;
    flex: 2 1 100%;
    overflow: auto;
  }

  &__list {
    position: relative;
    top: 0;
  }

  &__sale {
    height: $sale-height;
  }
}

.calendar-list {
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__item {
    height: $sale-height;
    padding: 20px;
    padding-left: 45px;
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, .08);
  }

  &__link {
    color: #0C2441;
    font-size: 16px;
  }
}
</style>
