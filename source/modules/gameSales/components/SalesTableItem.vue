<template>
<tr class="table-item">

  <td width="200" class="table-item__cell">
    <a href="#" class="table-item__title" @click.prevent="$emit('edit')">
      {{ title }}
    </a>
  </td>

  <td class="table-item__cell">{{ start | localize }} - {{ end | localize }}</td>
  <td width="120" class="table-item__cell">{{ days }}</td>
  <td width="100" class="table-item__cell">{{ rate }}%</td>
  <!-- TODO: hardcode for usd currency -->
  <td width="100" class="table-item__cell">$ {{ price.discount }}</td>

  <td width="50" class="table-item__cell table-item__cell--actions">

    <a
      v-clickaway="hideActions"
      href="#"
      class="actions-link"
      @click="actions = true"
    >
      <icon name="dots" height="10" fill="#C4C4C4" class="actions-icon"/>
    </a>

    <transition name="fade">
      <ul v-show="actions" class="shadow actions-list">
        <li @click="$emit('edit')" class="actions-list__item">{{ $t('edit') }}</li>
        <li @click="$emit('remove')" class="actions-list__item">{{ $t('delete') }}</li>
      </ul>
    </transition>

  </td>

</tr>
</template>

<script lang="ts">
import Icon from '@/icons'

export default {
  name: 'SalesTableItem',

  inject: ['$i18n'],

  filters: {
    localize: v => {
      let date = new Date(v)
      return `${ date.toDateString() } (${ date.toLocaleTimeString() })`
    }
  },

  components: { Icon },

  props: {
    id: [String, Number],
    title: String,
    description: String,
    date: Object,
    price: Object,
    days: Number,
    rate: Number
  },

  data () {
    return {
      actions: false
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
    hideActions () {
      this.actions = false
    }
  }
}
</script>

<style lang="scss" scoped>
.table-item {
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, .08);

  &__cell {
    padding: 10px;
    padding-left: 15px;
    vertical-align: top;

    &--actions {
      position: relative;
    }
  }

  &__title {
    color: #333;
  }
}

.actions-link:active .actions-icon,
.actions-link:focus .actions-icon {
  fill: #2275D7;
}

.actions-icon {
  transition: fill .2s linear;
}

.actions-list {
  position: absolute;
  right: 0;
  z-index: 100;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: #FFF;
  border: 1px solid rgba(0, 0, 0, .05);

  &__item {
    padding: 10px 20px;
    color: #B1B1B1;
    cursor: pointer;
    transition: color .2s linear, background-color .2s linear;

    &:hover {
      color: #333;
      background-color: #E3EEFF;
    }
  }
}
</style>
