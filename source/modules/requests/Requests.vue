<template>
<div class="requests-wrapper">
  <RequestsHeader
    :hasRequests="hasRequests"
    @search="filterByName"
  />

  <div class="content">
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

  <UiPaginator
    v-if="requestsCount > rowsLimit"
    class="paginator"
    :count="requestsCount"
    :limit="rowsLimit"
    :offset="offset"
    @pageChanged="pageChanged"
  >
    <div
      class="left"
      slot="left"
    >
      {{ $t('total', { count: requestsCount }) }}
    </div>
  </UiPaginator>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, filter, includes, map, orderBy } from 'lodash-es';
import { mapState, mapActions } from 'vuex';
import { UiPaginator, UiTable } from '@protocol-one/ui-kit';
import i18n from './i18n';
import RequestsFilters from './components/RequestsFilters.vue';
import RequestsHeader from './components/RequestsHeader.vue';
import RequestsItem from './components/RequestsItem.vue';

export default Vue.extend({
  i18n,
  components: { RequestsFilters, RequestsHeader, RequestsItem, UiPaginator, UiTable },
  data() {
    return {
      innerRequests: [],
      sortingProps: {},
      offset: 0,
    };
  },
  computed: {
    ...mapState('Requests', ['requests', 'rowsLimit', 'requestsCount']),

    hasRequests() {
      return !!get(this.requests, 'length', 0);
    },
  },
  mounted() {
    this.initState();
  },
  methods: {
    ...mapActions('Requests', ['initState', 'fetchRequests']),

    filterByName(namePart) {
      this.innerRequests = filter(
        this.requests,
        ({ country, name, person, status, updatedAt }) => includes(
          `${country} ${name} ${person} ${status} ${updatedAt}`.toLowerCase(),
          namePart.trim().toLowerCase(),
        ),
      );
    },
    pageChanged({ offset }) {
      const propName = get(Object.keys(this.sortingProps), '0', '');
      this.offset = offset;

      this.fetchRequests({
        offset,
        sort: propName ? `${this.sortingProps[propName] ? '+' : '-'}${propName}` : '',
      });
    },
    toggleSort(propName) {
      this.sortingProps = {
        [propName]: !this.sortingProps[propName],
      };

      this.fetchRequests({
        sort: `${this.sortingProps[propName] ? '+' : '-'}${propName}`,
      });
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
.content {
  flex-grow: 1;
}
.left {
  color: #333;
}
</style>
