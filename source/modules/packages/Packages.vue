<template>
<div class="packages-wrapper">
  <PackagesHeader
    :hasPackages="hasPackages"
    :searchValue="search"
    @search="filterByName"
    @clickCreate="showPackageModal = true"
  />

  <UiTable v-if="hasPackages">
    <PackagesFilters
      :sort="sort"
      @toggleSort="toggleSort"
    />
    <PackageItem
      v-for="pkg in innerPackages"
      :key="pkg.id"
      :pkg="pkg"
    />
  </UiTable>
  <CreatePackageDummy
    v-else
    @clickCreate="showGameModal = true"
  />
  <UiPaginator
    :count="itemsCount"
    :limit="NUM_ROWS"
    :offset="page * NUM_ROWS"
    @pageChanged="pageChanged"
  />
  <CreatePackage
    v-if="showPackageModal"
    :vendor-id="currentVendorId"
    @close="showPackageModal = false"
    @create="packageCreated"
  />
  <CreateGame
    v-if="showGameModal"
    :vendorId="currentVendorId"
    @close="showGameModal = false"
    @create="gameCreated"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import {UiPaginator, UiTable} from '@protocol-one/ui-kit';
import CreatePackage from './components/CreatePackage.vue';
import CreatePackageDummy from './components/CreatePackageDummy.vue';
import PackagesFilters from './components/PackagesFilters.vue';
import PackagesHeader from './components/PackagesHeader.vue';
import PackageItem from './components/PackageItem.vue';
import CreateGame from '@/modules/gameCreate/CreateGame.vue';
import {NUM_ROWS} from './constants';

export default Vue.extend({
  components: {
    CreatePackage,
    CreatePackageDummy,
    PackagesFilters,
    PackagesHeader,
    PackageItem,
    UiTable,
    CreateGame,
    UiPaginator,
  },
  data: () => ({
    NUM_ROWS,
    searchTimeout: null,
    innerPackages: [],
    showPackageModal: false,
    showGameModal: false, 
  }),
  computed: {
    ...mapGetters(['currentVendorId']),
    ...mapState('Packages', ['packages', 'page', 'sort', 'search', 'itemsCount']),

    hasPackages() {
      return !!this.packages.length;
    },
  },
  watch: {
    packages(val) {
      this.innerPackages = val;
    },
  },
  mounted() {
    this.initState({ vendorId: this.currentVendorId });
  },
  methods: {
    ...mapActions('Packages', ['initState', 'fetchPackages']),
    ...mapMutations('Packages', ['setPage', 'setSort', 'setSearch']),

    filterByName(value) {
      this.setPage(0);
      this.setSearch(value);
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(
        () => this.fetchPackages({ vendorId: this.currentVendorId }),
        400,
      );
    },
    packageCreated(packageId) {
      this.$router.push({ name: 'package', params: { resourceId: packageId } });
    },
    gameCreated(gameId) {
      this.$router.push({ name: 'game', params: { resourceId: gameId } });
    },
    toggleSort(propName) {
      this.setPage(0);
      this.setSort(propName);
      this.fetchPackages({ vendorId: this.currentVendorId });
    },
    pageChanged({ offset }) {
      this.setPage(Math.ceil(offset / NUM_ROWS));
      this.fetchPackages({ vendorId: this.currentVendorId });
    },
  },
});
</script>

<style scoped lang="scss">
.packages-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
