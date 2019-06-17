<template>
<div class="game">
  <PageHeader
    :breadcrumbs="breadcrumbs"
  >
    <span slot="title">
      Media
    </span>
    <div slot="right">
      <a v-show="$route.name === 'gamePrices'" href="#" class="game-prices-details" @click.prevent="toggleGamePricesDetails">
        <icon
          :name="(!$route.query.details || $route.query.details === 'true') ? 'eye-slash' : 'eye'"
          width="16"
          height="16"
          fill="rgba(51, 51, 51, 0.5)"
          class="game-prices-details__icon"
        />
        <span class="game-prices-details__label">
          {{ $t((!$route.query.details || $route.query.details === 'true') ? 'hideDetails' : 'showDetails') }}
        </span>
      </a>
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
  import {mapActions, mapState} from 'vuex';
  import {Button, PageHeader} from '@protocol-one/ui-kit';
  import Menu from './components/Menu.vue';
  import Contents from './components/Contents.vue';
  import Icon from '@/icons';
  import i18n from './i18n';

  export default Vue.extend({
  i18n,
  components: { Menu, Contents, Button, Icon, PageHeader },
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
    this.initState(this.$route.params.resourceId);
  },
  methods: {
    ...mapActions('Game', ['save', 'initState']),
    saveGame() {
      this.save(this.$route.params.resourceId);
    },

    toggleGamePricesDetails () {
      let details;
      if (!this.$route.query.details || this.$route.query.details === 'true') {
        details = 'false'
      }
      else {
        details = 'true'
      }
      this.$router.replace({
        ...this.$route,
        query: { ...this.$route.query, details }
      })
    }
  }
})
</script>

<style scoped lang="scss">
.game {
  &-save-btn {
    align-self: center;
  }
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

.game-prices-details {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0;
  margin-right: 16px;

  &__icon {
    margin-right: 8px;
  }
}
</style>
