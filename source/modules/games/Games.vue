<template>
<div class="games-wrapper">
  <GamesHeader
    :hasGames="hasGames"
    @search="filterByName"
    @clickCreate="showModal = true"
  />

  <UiTable v-if="hasGames">
    <GamesFilters @toggleSort="toggleSort" />

    <GameItem
      v-for="game in innerGames"
      :key="game.id"
      v-bind="{ game, genres }"
    />
  </UiTable>

  <CreateGameDummy
    v-else
    @clickCreate="showModal = true"
  />
  <CreateGame
    v-if="showModal"
    :vendorId="vendorId"
    @close="showModal = false"
    @create="gameCreated"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { includes, map, orderBy } from 'lodash-es';
import { UiTable } from '@protocol-one/ui-kit';
import CreateGame from '@/modules/gameCreate/CreateGame.vue';
import CreateGameDummy from './components/CreateGameDummy.vue';
import GamesFilters from './components/GamesFilters.vue';
import GamesHeader from './components/GamesHeader.vue';
import GameItem from './components/GameItem.vue';

export default Vue.extend({
  components: { CreateGame, CreateGameDummy, GamesFilters, GamesHeader, GameItem, UiTable },
  data: () => ({
    innerGames: [],
    sortingProps: {},
    showModal: false,
  }),
  computed: {
    ...mapState('Games', ['games', 'vendorId', 'genres']),

    hasGames() {
      return !!this.games.length;
    },
  },
  mounted() {
    this.initState({ router: this.$router });
  },
  methods: {
    ...mapActions('Games', ['initState', 'fetchGames']),

    filterByName(namePart) {
      this.innerGames = this.games.filter(
        game => includes(game.internalName.toLowerCase(), namePart.toLowerCase())
      );
    },
    gameCreated(gameId) {
      this.$router.push({ name: 'game', params: { id: gameId } });
    },
    toggleSort(propName) {
      this.sortingProps[propName] = !this.sortingProps[propName];

      this.fetchGames(`${this.sortingProps[propName] ? '+' : '-'}${propName}`);
    },
  },
  watch: {
    games(val) {
      this.innerGames = val;
    },
  },
});
</script>

<style scoped lang="scss">
.games-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
