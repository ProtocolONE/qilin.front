<template>
<div class="game">
  <PageHeader
    :breadcrumbs="breadcrumbs" 
  >
    <span slot="title">
      Media
    </span>
    <div slot="right">
      <Button
        :text="$t('save')"
        @click="saveGame"
      />
    </div>
  </PageHeader>
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
import { mapActions, mapState } from 'vuex';
import { Button, PageHeader } from '@protocol-one/ui-kit';
import Menu from './components/Menu.vue';
import Contents from './components/Contents.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { Menu, Contents, Button, PageHeader },
  computed: {
    ...mapState('Game', ['gameInfo', 'contents']),
    breadcrumbs () {
      if (!this.gameInfo) {
        return [];
      }
      return [
        {
          url: '/games',
          label: this.$t('all_games'),
          router: true
        },
        {
          label: this.gameInfo.internalName.trim()
        }
      ]
    }
  },
  mounted() {
    this.initState(this.$route.params.id);
  },
  methods: {
    ...mapActions('Game', ['save', 'initState']),
    saveGame() {
      this.save(this.$route.params.id);
    }
  }
})
</script>

<style scoped lang="scss">
.game {
  .body {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 100%;
    .menu {
      flex: 0 0 230px;
    }
    .content {
      width: 100%;
    }
    .table-of {
      flex: 0 0 280px;
    }
  }
}
</style>
