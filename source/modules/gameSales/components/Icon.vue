<template>
<component :is="icon" v-bind="{ ...$props, ...$attrs }"/>
</template>

<script lang="ts">
import IconTable from './IconTable'
import IconCalendar from './IconCalendar'
import IconTimes from './IconTimes'
import IconSort from './IconSort'
import IconDots from './IconDots'

const ICONS = ['table', 'calendar', 'times', 'sort', 'dots']

export default {
  name: 'PriceIcon',

  components: {
    IconTable,
    IconCalendar,
    IconTimes,
    IconSort,
    IconDots
  },

  props: {
    name: {
      type: String,
      required: true,
      validator: v => ICONS.includes(v)
    }
  },

  computed: {
    icon () {
      let name = this.name.replace(/^\w/, c => c.toUpperCase())
      return `Icon${ name }`
    }
  }
}
</script>
