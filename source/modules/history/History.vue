<template>
<div class="history-wrapper">
  <HistoryHeader
    :hasHistory="hasHistory"
    @search="filterByName"
  />

  <div class="content">
    <UiTable
      v-if="hasHistory"
      class="table"
    >
      <HistoryFilters
        :sortingProps="sortingProps"
        @toggleSort="toggleSort"
      />

      <HistoryItem
        v-for="historyItem in innerHistory"
        :key="historyItem.id"
        :historyItem="historyItem"
        @click.native="showMessage(historyItem)"
      />
    </UiTable>
  </div>

  <UiPaginator
    v-if="historyCount > rowsLimit"
    :count="historyCount"
    :limit="rowsLimit"
    :offset="offset"
    @pageChanged="pageChanged"
  >
    <div
      class="left"
      slot="left"
    >
      {{ $t('total', { count: historyCount }) }}
    </div>
  </UiPaginator>

  <UiModal
    v-if="hasModal"
    @close="hasModal = false"
  >
    <UiHeader
      slot="header"
      level="1"
    >
      {{ dataModal.title }}
    </UiHeader>
    <div
      slot="main"
      class="ui-modal-main"
    >
      {{ dataModal.message }}
    </div>
    <div
      slot="footer"
      class="ui-modal-footer"
    >
      <div class="date">{{ formatCreatedDate(dataModal.createdAt) }}</div>
      <UiButton @click="hasModal = false">
        {{ $t('ok') }}
      </UiButton>
    </div>
  </UiModal>
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import {filter, get, includes} from 'lodash-es';
  import {mapActions, mapState} from 'vuex';
  import {UiButton, UiHeader, UiModal, UiPaginator, UiTable} from '@protocol-one/ui-kit';
  import formatDate from '@/helpers/formatDate';
  import i18n from './i18n';
  import HistoryFilters from './components/HistoryFilters.vue';
  import HistoryHeader from './components/HistoryHeader.vue';
  import HistoryItem from './components/HistoryItem.vue';

  export default Vue.extend({
  i18n,
  components: { HistoryFilters, HistoryHeader, HistoryItem, UiButton, UiHeader, UiModal, UiPaginator, UiTable },
  data() {
    return {
      innerHistory: [],
      sortingProps: {},
      hasModal: false,
      dataModal: {},
      offset: 0,
    };
  },
  computed: {
    ...mapState('History', ['history', 'historyCount', 'rowsLimit']),

    hasHistory() {
      return !!this.historyCount;
    },
  },
  mounted() {
    this.initState(this.$route.params.vendorId);
  },
  methods: {
    ...mapActions('History', ['initState', 'fetchHistory']),

    filterByName(namePart) {
      this.innerHistory = filter(
        this.history,
        ({ title, message, createdAt }) => includes(
          `${title} ${message} ${createdAt}`.toLowerCase(),
          namePart.trim().toLowerCase(),
        ),
      );
    },
    formatCreatedDate(date) {
      return formatDate(
        date,
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale,
      );
    },
    pageChanged({ offset }) {
      const propName = get(Object.keys(this.sortingProps), '0', '');
      this.offset = offset;

      this.fetchHistory({
        offset,
        sort: propName ? `${this.sortingProps[propName] ? '+' : '-'}${propName}` : '',
      });
    },
    toggleSort(propName) {
      this.sortingProps = {
        [propName]: !this.sortingProps[propName],
      };

      this.fetchHistory({
        sort: `${this.sortingProps[propName] ? '+' : '-'}${propName}`,
      });
    },
    showMessage(item) {
      this.dataModal = item;
      this.hasModal = true;
    },
  },
  watch: {
    history(val) {
      this.innerHistory = val;
    },
  },
});
</script>

<style scoped lang="scss">
.history-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex-grow: 1;
}
.table {
  table-layout: fixed;
}
.left {
  color: #333;
}
.ui-modal-main {
  max-width: 460px;
  min-width: 360px;
  color: #b1b1b1;
}
.ui-modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date {
  color: #b1b1b1;
}
</style>
