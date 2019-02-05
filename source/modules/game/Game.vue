<template>
<div class="game">
  <Menu
    :current-tab="currentTab"
    @selectTab="selectTab"
  ></Menu>
  <div class="body">
    <div class="sidebar">
      <ul class="anchors">
        <li :v-for="(_, key) in anchors[currentTab]">
          <a :href="'#' + key">
            {{ $t(currentTab + '.' + key) }}
          </a>
        </li>
      </ul>
      <Button
        color="orange"
        :text="$t('save')"
        @click="clickSave"
      ></Button>
    </div>
    <div class="content">
      <keep-alive>
        <component
          :is="currentTab"
          ref="tabObj"
          :game-id="$route.params.id"
        >
          <!-- component changes when currentTab changes! -->
        </component>
      </keep-alive>
    </div>
  </div>
</div>
</template>

<script type="ts">
import Vue from 'vue'
import {mapActions, mapMutations, mapState} from 'vuex'
import Button from '@protocol-one/ui-kit/src/Button.vue'
import Media from '../game_media/Media'
import General from '../game_general/General'
import Menu from './components/Menu.vue'
import i18n from './i18n'

export default Vue.extend({
  i18n,
    name: "Game",
    components: {General, Media, Button, Menu},
  computed: {
    ...mapState('Game', ['game', 'currentTab', 'anchors']),
  },
  mounted() {
    this.preload(this.$route.params.id);
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
            &:hover {
              text-decoration: none;
            }
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
}
</style>
