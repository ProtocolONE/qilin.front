<template>
<table class="calendar">

  <thead>

    <tr class="calendar__months">
      <th
        v-for="(label, i) in monthsLabels"
        :key="`${ label }-${ i }`"
        :colspan="daysList[i].length"
      >
        {{ label }}
      </th>
    </tr>

    <tr class="calendar__days">
      <template v-for="(days, i) in daysList">
        <th
          v-for="{ day, holiday } in days"
          :key="`${ day }-${ i }`"
          :class="{ holiday }"
        >
          {{ day }}
        </th>
      </template>
    </tr>

  </thead>

  <tbody>
    <tr v-for="item in items" :key="item.id">
      <td :colspan="daysCount">
        <div
          class="calendar__sale"
          :style="getSaleStyles(item)"
        >

          <!-- TODO: hardcode for currency -->
          -{{ item.rate }}% ( $ <del>{{ item.price }}</del> {{ item.defaultPrice }} )

          <ul class="actions">
            <li class="shadow-sm" @click="$emit('edit', item)">
              <icon name="edit" width="14" height="14" fill="#000"/>
            </li>
            <li class="shadow-sm" @click="$emit('remove', item)">
              <icon name="times" width="12" height="12" fill="#000"/>
            </li>
          </ul>

        </div>
      </td>
    </tr>
  </tbody>

</table>
</template>

<script lang="ts">
import moment from 'moment'
import Icon from './Icon'

export default {
  name: 'SalesCalendarTable',

  components: { Icon },

  props: {
    months: Array,
    items: Array
  },

  data () {
    return {
      cellWidth: 25,
      showActions: false
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
    },

    startDate () {
      let firstMonth = this.monthsLabels[0]
      return moment().month(firstMonth).startOf('month')
    }
  },

  methods: {
    getSaleStyles ({ date }) {
      let [start, end] = [moment(date.start), moment(date.end)]
      let diffBetweenDates = Math.ceil(end.diff(start, 'days', true))
      let diffFromStart = Math.ceil(start.diff(this.startDate, 'days', true))
      return {
        width: diffBetweenDates * this.cellWidth + 'px',
        left: diffFromStart * this.cellWidth + 'px',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$sale-height: 65px;

.calendar {
  &__months th {
    padding: 5px 10px;
    outline: 1px solid rgba(0, 0, 0, .05);
    font-weight: normal;
    color: #0C2441;
  }

  &__days th {
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

  tbody tr {
    height: $sale-height;
    border: 1px solid rgba(0, 0, 0, .05);

    td {
      position: relative;
    }
  }
}

.actions {
  position: absolute;
  right: 16px;
  display: none;
  margin: 0;
  padding: 0;
  list-style-type: none;
  align-items: center;

  li {
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
