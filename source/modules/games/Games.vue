<template>
<div class="games-wrapper">
  <GamesHeader
    :hasGames="hasGames"
    @search="filterByName"
  />

  <template v-if="hasGames">
    <GamesFilters @toggleSort="toggleSort" />

    <GameItem
      v-for="game in innerGames"
      v-bind="{ game }"
      :key="game.id"
    />
  </template>

  <CreateGameDummy v-else />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import includes from 'lodash-es/includes';
import orderBy from 'lodash-es/orderBy';
import map from 'lodash-es/map';
import { mapState, mapActions } from 'vuex';
import CreateGameDummy from './components/CreateGameDummy.vue';
import GamesFilters from './components/GamesFilters.vue';
import GamesHeader from './components/GamesHeader.vue';
import GameItem from './components/GameItem.vue';

export default Vue.extend({
  components: { CreateGameDummy, GamesFilters, GamesHeader, GameItem },
  data: () => ({
    innerGames: [],
    sortingProps: {},
  }),
  computed: {
    ...mapState('Games', ['games']),

    hasGames() {
      return !!this.games.length;
    },
  },
  mounted() {
    // @TODO - add vendor data in user
    this.initState({ vendorId: '' });
  },
  methods: {
    ...mapActions('Games', ['initState']),

    filterByName(namePart) {
      this.innerGames = this.games.filter(game => includes(game.technicalName, namePart));
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
