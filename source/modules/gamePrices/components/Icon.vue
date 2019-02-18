<template>
<component :is="icon" v-bind="{ ...$props, ...$attrs }"/>
</template>

<script lang="ts">
import IconTable from './IconTable'
import IconCalendar from './IconCalendar'

const ICONS = ['table', 'calendar']

export default {
  name: 'PriceIcon',

  components: { IconTable, IconCalendar },

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
