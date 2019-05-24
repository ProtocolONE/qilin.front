<template>
<div class="packages-wrapper">
  <PackagesHeader
    :hasPackages="hasPackages"
    @search="filterByName"
    @clickCreate="showModal = true"
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
    @clickCreate="showModal = true"
  />
  <CreatePackage
    v-if="showModal"
    :vendorId="currentVendorId"
    @close="showModal = false"
    @create="packageCreated"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapGetters, mapState, mapActions } from 'vuex';
import { includes } from 'lodash-es';
import { UiTable } from '@protocol-one/ui-kit';
import CreatePackage from './components/CreatePackage.vue';
import CreatePackageDummy from './components/CreatePackageDummy.vue';
import PackagesFilters from './components/PackagesFilters.vue';
import PackagesHeader from './components/PackagesHeader.vue';
import PackageItem from './components/PackageItem.vue';

export default Vue.extend({
  components: { CreatePackage, CreatePackageDummy, PackagesFilters, PackagesHeader, PackageItem, UiTable },
  data: () => ({
    innerPackages: [],
    sortingProps: {},
    showModal: false,
  }),
  computed: {
    ...mapGetters(['currentVendorId']),
    ...mapState('Packages', ['packages', 'genres']),

    hasPackages() {
      return !!this.packages.length;
    },
  },
  mounted() {
    this.initState({ vendorId: this.currentVendorId });
  },
  methods: {
    ...mapActions('Packages', ['initState', 'fetchPackages']),

    filterByName(namePart) {
      this.innerPackages = this.packages.filter(
        pkg => includes(pkg.internalName.toLowerCase(), namePart.toLowerCase())
      );
    },
    packageCreated(packageId) {
      this.$router.push({ name: 'pkg', params: { id: packageId } });
    },
    toggleSort(propName) {
      this.sortingProps[propName] = !this.sortingProps[propName];

      this.fetchPackages({
        sort: `${this.sortingProps[propName] ? '+' : '-'}${propName}`,
        vendorId: this.currentVendorId,
      });
    },
  },
  watch: {
    packages(val) {
      this.innerPackages = val;
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
