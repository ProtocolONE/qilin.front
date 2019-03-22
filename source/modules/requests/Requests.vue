<template>
<div class="requests-wrapper">
  <RequestsHeader
    :hasRequests="hasRequests"
    @search="filterByName"
  />

  <UiTable v-if="hasRequests">
    <RequestsFilters
      :sortingProps="sortingProps"
      @toggleSort="toggleSort"
    />

    <RequestsItem
      v-for="request in innerRequests"
      :key="request.vendorId"
      :request="request"
    />
  </UiTable>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, filter, includes, map, orderBy } from 'lodash-es';
import { mapState, mapActions } from 'vuex';
import { UiTable } from '@protocol-one/ui-kit';
import RequestsFilters from './components/RequestsFilters.vue';
import RequestsHeader from './components/RequestsHeader.vue';
import RequestsItem from './components/RequestsItem.vue';

export default Vue.extend({
  components: { RequestsFilters, RequestsHeader, RequestsItem, UiTable },
  data: () => ({
    innerRequests: [],
    sortingProps: {},
  }),
  computed: {
    ...mapState('Requests', ['requests']),

    hasRequests() {
      return !!this.requests.length;
    },
  },
  mounted() {
    this.initState();
  },
  methods: {
    ...mapActions('Requests', ['initState', 'fetchRequests']),

    filterByName(namePart) {
      this.innerRequests = this.requests.filter(
        ({ country, name, person, status, updatedAt }) => includes(
          `${country} ${name} ${person} ${status} ${updatedAt}`.toLowerCase(),
          namePart.toLowerCase(),
        ),
      );
    },
    toggleSort(propName) {
      this.sortingProps = {
        [propName]: !this.sortingProps[propName],
      };

      this.fetchRequests(`${this.sortingProps[propName] ? '+' : '-'}${propName}`);
    },
  },
  watch: {
    requests(val) {
      this.innerRequests = val;
    },
  },
});
</script>

<style scoped lang="scss">
.requests-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
