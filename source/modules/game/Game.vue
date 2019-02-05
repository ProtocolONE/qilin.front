<template>
<div class="game">
  <div class="head">
    <div class="left">
      Media
    </div>
    <div class="right">
      <Button
        :text="$t('save')"
        @click="clickSave"
      />
    </div>
  </div>
  <hr>
  <div class="body">
    <Menu />
    <div class="content">
      <router-view />
    </div>
  </div>
</div>
</template>

<script type="ts">
import Vue from 'vue'
import {Button} from '@protocol-one/ui-kit'
import Menu from './components/Menu.vue'
import i18n from './i18n'

export default Vue.extend({
  i18n,
  components: {Menu, Button},
  computed: {},
  methods: {
    clickSave(){}
  }
})
</script>

<style scoped lang="scss">
.game {
  .head {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .left {
      flex: 1;
    }
    .right {
      flex: 0 0 300px;
    }
  }
  .body {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 100vh;
    width: 100%;
    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
