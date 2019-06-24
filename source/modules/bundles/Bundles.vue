<template>
<div class="bundles-wrapper">
  <BundlesHeader
    :hasBundles="hasBundles"
    :searchValue="search"
    @search="filterByName"
    @clickCreate="showBundleModal = true"
  />

  <UiTable v-if="hasBundles">
    <BundlesFilters
      :sort="sort"
      @toggleSort="toggleSort"
    />
    <BundleItem
      v-for="bundle in innerBundles"
      :key="bundle.id"
      :bundle="bundle"
    />
  </UiTable>
  <CreateBundleDummy
    v-else
    @clickCreate="showBundleModal = true"
  />
  <UiPaginator
    :count="itemsCount"
    :limit="NUM_ROWS"
    :offset="page * NUM_ROWS"
    @pageChanged="pageChanged"
  />
  <CreateBundle
    v-if="showBundleModal"
    :vendor-id="currentVendorId"
    @close="showBundleModal = false"
    @create="bundleCreated"
  />
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
  import {UiPaginator, UiTable} from '@protocol-one/ui-kit';
  import CreateBundle from './components/CreateBundle.vue';
  import CreateBundleDummy from './components/CreateBundleDummy.vue';
  import BundlesFilters from './components/BundlesFilters.vue';
  import BundlesHeader from './components/BundlesHeader.vue';
  import BundleItem from './components/BundleItem.vue';
  import {NUM_ROWS} from './constants';

  export default Vue.extend({
  components: {
    CreateBundle,
    CreateBundleDummy,
    BundlesFilters,
    BundlesHeader,
    BundleItem,
    UiTable,
    UiPaginator,
  },
  data: () => ({
    NUM_ROWS,
    searchTimeout: null,
    innerBundles: [],
    showBundleModal: false,
    showGameModal: false, 
  }),
  computed: {
    ...mapGetters(['currentVendorId']),
    ...mapState('Bundles', ['bundles', 'page', 'sort', 'search', 'itemsCount']),

    hasBundles() {
      return !!this.bundles.length;
    },
  },
  watch: {
    bundles(val) {
      this.innerBundles = val;
    },
  },
  mounted() {
    this.initState({ vendorId: this.currentVendorId });
  },
  methods: {
    ...mapActions('Bundles', ['initState', 'fetchBundles']),
    ...mapMutations('Bundles', ['setPage', 'setSort', 'setSearch']),

    filterByName(value) {
      this.setPage(0);
      this.setSearch(value);
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(
        () => this.fetchBundles({ vendorId: this.currentVendorId }),
        400,
      );
    },
    bundleCreated(bundleId) {
      this.$router.push({ name: 'bundle', params: { resourceId: bundleId } });
    },
    toggleSort(propName) {
      this.setPage(0);
      this.setSort(propName);
      this.fetchBundles({ vendorId: this.currentVendorId });
    },
    pageChanged({ offset }) {
      this.setPage(Math.ceil(offset / NUM_ROWS));
      this.fetchBundles({ vendorId: this.currentVendorId });
    },
  },
});
</script>

<style scoped lang="scss">
.bundles-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
