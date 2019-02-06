<template>
<div class="game">
  <div class="head">
    <div class="left">
      <ul
        v-if="!!gameInfo"
        class="bcrumb"
      >
        <li class="bcrumb-item">
          <router-link to="/games">
            {{ $t('all_games') }}
          </router-link>
        </li><li
          class="bcrumb-item active"
        >{{ gameInfo.internalName.trim() }}</li>
      </ul>
      <h1>Media</h1>
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
    <Contents />
  </div>
</div>
</template>

<script type="ts">
import Vue from 'vue'
import {mapActions, mapState} from 'vuex';
import {Button} from '@protocol-one/ui-kit'
import Menu from './components/Menu.vue'
import Contents from './components/Contents.vue'
import i18n from './i18n'

export default Vue.extend({
  i18n,
  components: {Menu, Contents, Button},
  computed: {
    ...mapState('Game', ['gameInfo', 'contents']),
  },
  mounted(){
    this.initState(this.$route.params.id);
  },
  methods: {
    ...mapActions('Game', ['saveGame', 'initState']),
    clickSave(){
      this.saveGame(this.$route.params.id);
    }
  }
})
</script>

<style scoped lang="scss">
.game {
  hr {
    margin-top: 0px;
  }
  .head {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .left {
      flex: 1;
      margin-left: 32px;
      margin-top: 18px;
    }
    .right {
      flex: 0 0 300px;

      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    h1 {
      font-size:24px;
    }
  }
  .body {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 100vh;
    width: 100%;
    .menu {
      flex: 0 0 230px;
      height: 3126px;
    }
    .content {
      width: 100%;
    }
    .table-of {
      flex: 0 0 230px;
    }
  }
  .bcrumb {
    list-style: none;
    font-size: 14px;
    margin: 0;
    padding: 0;
    margin-bottom: 3px;
    .bcrumb-item {
      color: #b1b1b1;
      a {
        color: inherit;
      }
      display: inline-block;
      &:first-child:before {
        content: url('data:image/svg+xml; utf8, <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 1L2 4.95506L6 9" stroke="#999999" stroke-width="2" stroke-linecap="round"/>
        </svg>');
        margin-right: 8px;
        font-weight: bold;
      }
      &:after {
        content: '/';
        margin: 0px 8px;
      }
      &.active:after {
        content: '';
      }
    }
    clear: left;
  }
}
</style>
