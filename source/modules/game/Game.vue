<template>

  <div class="game">

    <ul class="menu">
      <li v-for="item in ['General', 'Description', 'Ratings', 'Media', 'Price', 'Sales']"
          :class="item === currentTab ? 'select' : ''">
        <a  href="/" @click.prevent="selectTab(item)">{{ $t('tab_' + item.toLowerCase()) }}</a>
      </li>
    </ul>

    <div class="body">
      <div class="sidebar">
        <ul class="anchors">
          <li v-for="_, key in anchors[currentTab]">
            <a :href="'#' + key">{{ $t(currentTab + '.' + key) }}</a>
          </li>
        </ul>
        <Button color="orange" :text="$t('save')" @click="clickSave"></Button>
      </div>
      <div class="content">
        <keep-alive>
          <component v-bind:is="currentTab" :gameId="$route.params.id" ref="tabObj">
            <!-- component changes when currentTab changes! -->
          </component>
        </keep-alive>
      </div>
    </div>

  </div>

</template>

<script type="ts">
  import Vue from 'vue'
  import Media from '../game_media/Media'
  import General from '../game_general/General'
  import i18n from './i18n'
  import {mapActions, mapMutations, mapState} from "vuex";
  import Button from '../../components/ui-kit/Button'

  export default Vue.extend({
    i18n,
    components: {General, Media, Button},
    name: "Game",
    mounted() {
      this.preload(this.$route.params.id);
    },
    computed: {
      ...mapState('Game', ['game', 'currentTab', 'anchors']),
    },
    methods: {
      ...mapActions('Game', ['preload']),
      ...mapMutations('Game', ['selectTab']),
      clickSave(){
        this.$refs.tabObj.clickSave(this.$route.params.id);
      }
    }
  })
</script>

<style scoped lang="scss">

  .game {

    .body {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      height: 100vh;
      width: 100%;
      .sidebar {
        width: 170px;
        height: 100%;
        text-align: center;
        .anchors {
          list-style: none;
          padding-left: 18px;
          li {
            text-align: left;
            a {
              color: #111111;
              font-size: 19px;
              &:hover {text-decoration: none}
            }
          }
        }
      }
      .content {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    }

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
          color: #2FA7D3;
          font-size: 22px;
          &:hover {text-decoration: none}
        }
      }
    }
  }


</style>
