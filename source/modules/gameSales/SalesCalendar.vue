<template>
<section class="sales-calendar">

  <aside class="shadow sales-calendar__aside">
    <ul class="calendar-list" ref="list">
      <li v-for="item in items" :key="item.id">
        <a href="javascript:void(0)" @click="$emit('edit', item)">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </aside>

  <div class="sales-calendar__content" @scroll="handlerScroll">
    <calendar
      v-bind="{ months, items }"
      @edit="$emit('edit', $event)"
      @remove="$emit('remove', $event)"
    />
  </div>

</section>
</template>

<script lang="ts">
import moment from 'moment'
import { map, min, max } from 'lodash'

import Calendar from './components/Calendar'

export default {
  name: 'PriceCalendar',

  components: { Calendar },

  props: {
    items: Array
  },

  computed: {
    startDate () {
      let dates = map(this.dates, 'date.start')
      return this.localizeDate(min(dates))
    },

    endDate () {
      let dates = map(this.items, 'date.end')
      return this.localizeDate(max(dates))
    },

    isMonthsEquals () {
      let { startDate, endDate } = this
      let [startYear, endYear] = [startDate.year(), endDate.year()]
      let [startMonth, endMonth] = [startDate.month(), endDate.month()]
      return (startYear === endYear) && (startMonth === endMonth)
    },

    months () {
      let month = this.startDate.month()
      let firstMonth = [{
        month: this.localizeDate(moment().month(month)).format('MMMM'),
        days: this.getDays(this.startDate.month())
      }]

      if (this.isMonthsEquals) {
        return firstMonth
      }

      let monthsDiff = Math.ceil(
        this.endDate.diff(this.startDate, 'months', true)
      )

      let months = Array
        .apply(null, { length: monthsDiff })
        .map((_, i) => {
          let nextMonth = (month + i + 1)
          return {
            month: this.localizeDate(moment().month(nextMonth)).format('MMMM'),
            days: this.getDays(nextMonth)
          }
        })

      return firstMonth.concat(months)
    }
  },

  methods: {
    localizeDate (date) {
      return moment(date).locale(this.$i18n.locale)
    },

    getDays (month) {
      let days = moment().month(month).daysInMonth()
      return Array
        .apply(null, { length: days })
        .map(this.getDay.call, this.getDay)
    },

    getDay (day) {
      day = day + 1
      return { day, holiday: this.isHoliday(day) }
    },

    isHoliday (day) {
      let [holidays, dayOfWeek] = [[6, 0], moment().date(day).day()]
      return holidays.includes(dayOfWeek)
    },

    handlerScroll ({ target }) {
      requestAnimationFrame(() => {
        this.$refs.list.style.top = -(target.scrollTop) + 'px'
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

  &__sale {
    height: $sale-height;
  }
}

.calendar-list {
  position: relative;
  top: 0;
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    height: $sale-height;
    padding: 20px;
    padding-left: 45px;
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, .08);

    a {
      color: #0C2441;
      font-size: 16px;
    }
  }
}
</style>
