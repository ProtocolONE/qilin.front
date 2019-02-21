<template>
<tr v-if="type === 'table'" class="item-table">
  <td width="200">
    <a href="javascript:void(0)" class="item-table__title" @click="$emit('edit')">
      {{ title }}
    </a>
  </td>
  <td>{{ localize(start) }} - {{ localize(end) }}</td>
  <td width="120">{{ days }}</td>
  <td width="100">{{ rate }}%</td>
  <!-- TODO: hardcode for currency -->
  <td width="100">$ {{ price }}</td>
  <td width="50" class="actions">
    <a
      v-clickaway="hideActions"
      href="javascript:void(0)"
      class="actions__link"
      @click="showActions = true"
    >
      <icon name="dots" height="10" fill="#C4C4C4"/>
    </a>
    <transition name="fade">
      <ul v-show="showActions" class="shadow actions__list">
        <li @click="$emit('edit')">{{ $t('edit') }}</li>
        <li @click="$emit('remove')">{{ $t('delete') }}</li>
      </ul>
    </transition>
  </td>
</tr>
</template>

<script lang="ts">
import moment from 'moment'
import i18n from '../i18n'

import Icon from './Icon'

export default {
  name: 'SalesItemTable',

  i18n,

  components: { Icon },

  props: {
    type: String,
    id: [String, Number],
    title: String,
    description: String,
    date: Object,
    days: Number,
    price: [Number, String],
    defaultPrice: [Number, String],
    rate: Number
  },

  data () {
    return {
      showActions: false
    }
  },
  
  computed: {
    start () {
      return this.date.start
    },
    
    end () {
      return this.date.end
    }
  },

  methods: {
    localize (date) {
      return  moment(date).locale(this.$i18n.locale).format('LLL')
    },

    hideActions () {
      this.showActions = false
    }
  }
}
</script>

<style lang="scss" scoped>
.item-table {
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.08);

  td {
    padding: 10px;
    padding-left: 15px;
    vertical-align: top;
  }

  &__title {
    color: #333;
  }
}

.actions {
  position: relative;

  &__link {
    svg {
      transition: fill .2s ease;
    }
    &:active svg,
    &:focus svg {
      fill: #2275D7;
    }
  }

  &__list {
    position: absolute;
    right: 0;
    z-index: 100;
    margin: 0;
    padding: 0;
    list-style-type: none;
    background-color: #FFF;
    border: 1px solid rgba(0, 0, 0, 0.05);

    li {
      padding: 10px 20px;
      color: #B1B1B1;
      cursor: pointer;
      transition: color .2s ease, background-color .2s ease;

      &:hover {
        color: #333;
        background-color: #E3EEFF;
      }
    }
  }
}
</style>
