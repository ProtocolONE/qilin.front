<template>
<ul class="menu">
  <li
    :v-for="item in items"
    :class="item === currentTab ? 'select' : ''"
  >
    <a
      href="/"
      @click.prevent="$emit('selectTab', item)"
    >
      {{ $t('tab_' + item.toLowerCase()) }}
    </a>
  </li>
</ul>
</template>

<script type="ts">
import Vue from 'vue'
import i18n from '../i18n'

export default Vue.extend({
  i18n,
  name: "GameMenu",
  props: {
    currentTab: {
      type: String,
      require: true,
      default: 'General',
    }
  },
  data: () => ({
    items: ['General', 'Description', 'Ratings', 'Media', 'Price', 'Sales'],
  }),
})
</script>

<style scoped lang="scss">
.menu {
  list-style: none;
  margin-top: 120px;
  li {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 6px;
    &.select {
      border-bottom: 3px solid #444444;
    }
    a {
      color: #2fa7d3;
      font-size: 22px;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
