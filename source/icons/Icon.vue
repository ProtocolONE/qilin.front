<template>
<component
  :is="component"
  v-bind="{ ...$props, ...$attrs }"
/>
</template>

<script lang="ts">
import IconTable from './IconTable'
import IconCalendar from './IconCalendar'
import IconTimes from './IconTimes'
import IconSort from './IconSort'
import IconDots from './IconDots'
import IconEdit from './IconEdit'

const ICONS = [
  'table',
  'calendar',
  'times',
  'sort',
  'dots',
  'edit'
]

export default {
  name: 'PriceIcon',

  components: {
    IconTable,
    IconCalendar,
    IconTimes,
    IconSort,
    IconDots,
    IconEdit
  },

  props: {
    name: {
      type: String,
      required: true,
      validator: v => ICONS.includes(v)
    }
  },

  computed: {
    component () {
      let name = this.name.replace(/^\w/, c => c.toUpperCase())
      return 'Icon' + name
    }
  }
}
</script>
