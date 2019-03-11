<template>
<ul class="menu">
  <li
    v-for="item in items"
    :key="item"
    :class="$route.path === `/games/${$route.params.id}/${item}` ? 'select' : ''"
  >
    <router-link :to="`/games/${$route.params.id}/${item}`">
      {{ $t('tab_' + item) }}
    </router-link>
  </li>
</ul>
</template>

<script type="ts">
import Vue from 'vue'
import i18n from '../i18n'

export default Vue.extend({
  i18n,
  data: () => ({
    items: ['general', 'descriptions', 'ratings', 'media', 'prices'],
  }),
})
</script>

<style scoped lang="scss">
.menu {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #F6F6F6;
  box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.06);
  li {
    display: block;
    padding-left: 30px;
    padding-top: 12px;
    padding-bottom: 12px;
    &.select {
      background: #bcd6f4;
    }
    a {
      color: #0c2441;
      font-size: 16px;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
