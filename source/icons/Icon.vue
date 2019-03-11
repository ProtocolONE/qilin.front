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
import IconCheck from './IconCheck'
import IconEye from './IconEye'
import IconEyeSlash from './IconEyeSlash'

const ICONS = [
  'table',
  'calendar',
  'times',
  'sort',
  'dots',
  'edit',
  'check',
  'eye',
  'eye-slash'
]

export default {
  name: 'PriceIcon',

  components: {
    IconTable,
    IconCalendar,
    IconTimes,
    IconSort,
    IconDots,
    IconEdit,
    IconCheck,
    IconEye,
    IconEyeSlash
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
