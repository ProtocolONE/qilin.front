<template>
<div class="packages-wrapper">
  <PackagesHeader
    :has-packages="hasPackages"
    @search="filterByName"
    @clickCreate="showPackageModal = true"
  />

  <UiTable v-if="hasPackages">
    <PackagesFilters @toggleSort="toggleSort" />

    <PackageItem
      v-for="pkg in innerPackages"
      :key="pkg.id"
      v-bind="{ pkg, genres }"
    />
  </UiTable>

  <CreatePackageDummy
    v-else
    @clickCreate="showGameModal = true"
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
  import {mapActions, mapGetters, mapState} from 'vuex';
  import {UiTable} from '@protocol-one/ui-kit';
  import CreatePackage from './components/CreatePackage.vue';
  import CreatePackageDummy from './components/CreatePackageDummy.vue';
  import PackagesFilters from './components/PackagesFilters.vue';
  import PackagesHeader from './components/PackagesHeader.vue';
  import PackageItem from './components/PackageItem.vue';
  import CreateGame from '@/modules/gameCreate/CreateGame.vue';

  export default Vue.extend({
  components: {
    CreatePackage,
    CreatePackageDummy,
    PackagesFilters,
    PackagesHeader,
    PackageItem,
    UiTable,
    CreateGame,
  },
  data: () => ({
    searchTimeout: null,
    innerPackages: [],
    sortingProps: {},
    showPackageModal: false,
    showGameModal: false, 
    sort: '',
    search: '',
  }),
  computed: {
    ...mapGetters(['currentVendorId']),
    ...mapState('Packages', ['packages', 'genres']),

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
    this.initState({vendorId: this.currentVendorId});
  },
  methods: {
    ...mapActions('Packages', ['initState', 'fetchPackages']),

    filterByName(namePart) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.search = namePart;
        this.fetchList();
      }, 300);
    },
    packageCreated(packageId) {
      this.$router.push({ name: 'package', params: { resourceId: packageId } });
    },
    gameCreated(gameId) {
      this.$router.push({ name: 'game', params: { resourceId: gameId } });
    },
    toggleSort(propName) {
      this.sortingProps[propName] = !this.sortingProps[propName];
      this.sort = `${this.sortingProps[propName] ? '+' : '-'}${propName}`;
      this.fetchList();
    },
    fetchList() {
      this.fetchPackages({
        search: this.search,
        sort: this.sort,
        vendorId: this.currentVendorId,
      });
    }
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
