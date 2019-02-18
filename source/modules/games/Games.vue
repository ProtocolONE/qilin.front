<template>
<div class="games-wrapper">
  <GamesHeader
    :has-games="hasGames"
    @search="filterByName"
    @clickCreate="showModal = true"
  />

  <template v-if="hasGames">
    <GamesFilters @toggleSort="toggleSort" />

    <GameItem
      v-for="game in innerGames"
      :key="game.id"
      v-bind="{ game, genres }"
    />
  </template>

  <CreateGameDummy
    v-else
    @clickCreate="showModal = true"
  />
  <CreateGame
    v-if="showModal"
    :vendor-id="vendorId"
    @close="showModal = false"
    @create="gameCreated"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import includes from 'lodash-es/includes';
import orderBy from 'lodash-es/orderBy';
import map from 'lodash-es/map';
import { mapState, mapActions } from 'vuex';
import CreateGame from '@/modules/gameCreate/CreateGame.vue';
import CreateGameDummy from './components/CreateGameDummy.vue';
import GamesFilters from './components/GamesFilters.vue';
import GamesHeader from './components/GamesHeader.vue';
import GameItem from './components/GameItem.vue';

export default Vue.extend({
  components: { CreateGameDummy, GamesFilters, GamesHeader, GameItem, CreateGame },
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
    this.initState({router: this.$router});
  },
  methods: {
    ...mapActions('Games', ['initState']),

    filterByName(namePart) {
      this.innerGames = this.games.filter(
        game => includes(game.internalName.toLowerCase(), namePart.toLowerCase())
      );
    },
    toggleSort(propName) {
      this.sortingProps[propName] = !this.sortingProps[propName];

      // @TODO - add sorting by genres and price
      this.innerGames = orderBy(
        this.games,
        Object.keys(this.sortingProps),
        map(this.sortingProps, prop => prop ? 'asc' : 'desc'),
      );
    },
    gameCreated(gameId) {
      this.$router.push({ name: 'gameGeneral', params: { id: gameId } });
    }
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
