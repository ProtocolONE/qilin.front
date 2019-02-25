<template>
<th
  class="table-head-item"
  :class="[query.order, { sorted: label === query.sort }]"
  :width="getWidth(label)"
>

  <icon
    v-show="label === query.sort"
    v-bind="icon"
    class="table-head-item__icon"
  />

  <label class="table-head-item__label" @click="$emit('sort', label)">
    {{ $t(label) }}
  </label>

</th>
</template>

<script lang="ts">
import Icon from '@/icons'

export default {
  name: 'SalesTableHead',

  inject: ['$i18n'],

  components: { Icon },

  props: {
    label: String
  },

  data () {
    return {
      icon: {
        name: 'sort',
        width: 10,
        height: 10,
        fill: '#000'
      }
    }
  },

  computed: {
    query () {
      return this.$route.query
    }
  },

  methods: {
    getWidth (label: string) {
      console.log(label)
      switch (label) {
        case 'name': return '25%'
        case 'period': return '35%'
        case 'duration': return '15%'
        case 'rate': return '15%'
        case 'price': return '15%'
        default: return 'auto'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-head-item {
  position: relative;
  height: 40px;
  padding-left: 15px;
  color: #B1B1B1;
  transition: color .2s linear;

  &__icon {
    position: absolute;
    top: 15px;
    left: 0;
    transition: transform .2s linear;
  }

  &__label {
    margin-bottom: 0;
    cursor: pointer;
  }

  &.sorted {
    color: #0C2441;

    &.desc .table-head-item__icon {
      transform: rotateX(180deg);
    }
  }
}
</style>
