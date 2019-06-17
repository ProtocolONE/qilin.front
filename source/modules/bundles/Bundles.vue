<template>
<div class="bundles-wrapper">
  <BundlesHeader
    :has-bundles="hasBundles"
    @search="filterByName"
    @clickCreate="showModal = true"
  />

  <UiTable v-if="hasBundles">
    <BundlesFilters @toggleSort="toggleSort" />

    <BundleItem
      v-for="bundle in innerBundles"
      :key="bundle.id"
      v-bind="{ bundle, genres }"
    />
  </UiTable>

  <CreateBundleDummy
    v-else
    @clickCreate="showModal = true"
  />
  <CreateBundle
    v-if="showModal"
    :vendor-id="currentVendorId"
    @close="showModal = false"
    @create="bundleCreated"
  />
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import {mapActions, mapGetters, mapState} from 'vuex';
  import {includes} from 'lodash-es';
  import {UiTable} from '@protocol-one/ui-kit';
  import CreateBundle from './components/CreateBundle.vue';
  import CreateBundleDummy from './components/CreateBundleDummy.vue';
  import BundlesFilters from './components/BundlesFilters.vue';
  import BundlesHeader from './components/BundlesHeader.vue';
  import BundleItem from './components/BundleItem.vue';

  export default Vue.extend({
  components: { CreateBundle, CreateBundleDummy, BundlesFilters, BundlesHeader, BundleItem, UiTable },
  data: () => ({
    innerBundles: [],
    sortingProps: {},
    showModal: false,
  }),
  computed: {
    ...mapGetters(['currentVendorId']),
    ...mapState('Bundles', ['bundles', 'genres']),

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
    this.initState({vendorId: this.currentVendorId});
  },
  methods: {
    ...mapActions('Bundles', ['initState', 'fetchBundles']),

    filterByName(namePart) {
      this.innerBundles = this.bundles.filter(
        bundle => includes(bundle.internalName.toLowerCase(), namePart.toLowerCase())
      );
    },
    bundleCreated(bundleId) {
      this.$router.push({ name: 'bundle', params: { id: bundleId } });
    },
    toggleSort(propName) {
      this.sortingProps[propName] = !this.sortingProps[propName];

      this.fetchBundles({
        sort: `${this.sortingProps[propName] ? '+' : '-'}${propName}`,
        vendorId: this.currentVendorId,
      });
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
