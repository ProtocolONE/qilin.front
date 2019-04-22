<template>
<div class="menu">
  <router-link
    v-for="item in items"
    :key="item"
    :class="['item', {'_select': $route.name === item}]"
    :to="{ name: item, params: { resourceId: $route.params.resourceId } }"
  >
    {{ $t(`menu.${item}`) }}
  </router-link>
</div>
</template>

<script type="ts">
import Vue from 'vue'
import i18n from '../i18n'

export default Vue.extend({
  i18n,
  data() {
    return {
      items: ['gameDescriptions', 'gameGeneral', 'gameMedia', 'gamePrices', 'gameRatings'],
    };
  },
})
</script>

<style scoped lang="scss">
.menu {
  list-style: none;
  margin: 0;
  padding: 0;
  background: #F6F6F6;
  box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.06);
}
.item {
  display: block;
  padding-left: 30px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #0c2441;
  font-size: 16px;

  &:hover {
    text-decoration: none;
  }

  &._select {
    background: #bcd6f4;
  }
}
</style>
