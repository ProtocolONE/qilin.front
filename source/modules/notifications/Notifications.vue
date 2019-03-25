<template>
<div class="notifications-page">
  <NotifysHeader
    :searchValue="search"
    @search="inputSearch"
  />
  <div>
    <UiTable>
      <NotifyFilters
        :sort="sort"
        @toggleSort="toggleSort"
      />
      <NotifyItem
        v-for="notify in notifications"
        :key="notify.id"
        :notify="notify"
        @selectNotify="selectNotify"
      />
    </UiTable>
    <div
      v-if="noAnyNotification"
      class="no-results"
      :style="{ height: `${57 * NUM_ROWS}px` }"
    >
      <div class="no-results-warning">
        <svg width="130" height="92" viewBox="0 0 130 92" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M76.5586 60.376H53.4472C52.6475 60.376 52.002 61.02 52.002 61.8143C52.002 62.6086 52.6475 63.2526 53.4472 63.2526H76.5586C77.3582 63.2526 78.0038 62.6086 78.0038 61.8143C78.0038 61.02 77.3582 60.376 76.5586 60.376Z" fill="#B1B1B1"/>
          <path d="M50.5588 50.0826C52.1544 50.0826 53.4478 48.1521 53.4478 45.7708C53.4478 43.3894 52.1544 41.459 50.5588 41.459C48.9633 41.459 47.6699 43.3894 47.6699 45.7708C47.6699 48.1521 48.9633 50.0826 50.5588 50.0826Z" fill="#B1B1B1"/>
          <path d="M79.4485 50.0826C81.044 50.0826 82.3374 48.1521 82.3374 45.7708C82.3374 43.3894 81.044 41.459 79.4485 41.459C77.853 41.459 76.5596 43.3894 76.5596 45.7708C76.5596 48.1521 77.853 50.0826 79.4485 50.0826Z" fill="#B1B1B1"/>
          <path d="M13.0028 77.6264H117.004C117.804 77.6264 118.449 76.9824 118.449 76.1881V8.63141C118.449 7.83559 117.804 7.19312 117.004 7.19312H13.0028C12.2032 7.19312 11.5576 7.83559 11.5576 8.63141V76.1897C11.5576 76.9824 12.2032 77.6264 13.0028 77.6264ZM14.4481 10.0682H115.56V74.7514H14.4481V10.0682Z" fill="#B1B1B1"/>
          <path d="M125.67 80.5013H124.225V7.18839C124.225 3.22312 120.987 0 117.002 0H13.0009C9.01652 0 5.77785 3.22312 5.77785 7.18839V80.5013H4.33261C1.9429 80.5013 0 82.4364 0 84.8131V87.6882C0 90.0664 1.94444 92 4.33261 92H125.667C128.057 92 130 90.0649 130 87.6882V84.8131C130.005 82.4364 128.06 80.5013 125.67 80.5013ZM13.0025 2.87505H117.004C119.393 2.87505 121.336 4.81015 121.336 7.18685V80.5013H73.6698C72.8702 80.5013 72.2246 81.1454 72.2246 81.9396C72.2246 82.2954 72.2246 83.3779 67.892 83.3779H62.1142C57.7815 83.3779 57.7815 82.2969 57.7815 81.9396C57.7815 81.1454 57.136 80.5013 56.3363 80.5013H8.66985V7.18839C8.66985 4.81015 10.6127 2.87505 13.0025 2.87505ZM125.67 89.1265H4.3357C3.53912 89.1265 2.89046 88.4809 2.89046 87.6882V84.8131C2.89046 84.0204 3.53912 83.3749 4.3357 83.3749H55.1376C56.2131 86.2468 60.5549 86.2499 62.1142 86.2499H67.892C69.4528 86.2499 73.7931 86.2468 74.8686 83.3749H125.67C126.467 83.3749 127.116 84.0204 127.116 84.8131V87.6882C127.114 88.4809 126.467 89.1265 125.67 89.1265Z" fill="#B1B1B1"/>
        </svg>
        <h2 class="no-results-label">{{ $t('no_result') }}</h2>
      </div>
    </div>
    <UiPaginator
      :count="itemsCount"
      :limit="NUM_ROWS"
      :offset="page * NUM_ROWS"
      @pageChanged="pageChanged"
    />
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { mapState, mapActions, mapMutations } from 'vuex';
  import { UiTable, UiPaginator } from '@protocol-one/ui-kit';
  import NotifyItem from './components/NotifyItem.vue';
  import NotifysHeader from './components/NotifysHeader.vue';
  import NotifyFilters from './components/NotifyFilters.vue';
  import { NUM_ROWS } from './constants';
  import i18n from './i18n';

  export default Vue.extend({
    i18n,
    components: { NotifyItem, NotifysHeader, NotifyFilters, UiTable, UiPaginator },
    data: () => ({
      NUM_ROWS,
      unreadTimeout: null,
      searchTimeout: null,
      updateTimeout: null,
    }),
    computed: {
      ...mapState('Notifications', ['notifications', 'page', 'sort', 'search', 'itemsCount']),
      ...mapState({wsNotifies: 'notifications'}), // from global notifications store
      noAnyNotification() {
        return !this.notifications.length;
      },
    },
    mounted() {
      this.initState();
    },
    watch: {
      wsNotifies() {
        clearTimeout(this.updateTimeout);
        this.updateTimeout = setTimeout(this.fetchNotifys.bind(this), 200);
      },
      notifications(notifys) {
        clearTimeout(this.unreadTimeout);
        this.unreadTimeout = setTimeout(
          () => this.clearUnreadMark(
            notifys.filter(n => !n.isRead && n.message === '')
          ),
          2000
        );
      },
    },
    methods: {
      ...mapActions('Notifications', ['initState', 'fetchNotifys']),
      ...mapMutations('Notifications', ['setPage', 'setSort', 'setNotifys', 'setSearch', 'setItemsCount']),
      ...mapActions(['readNotifys']),
      ...mapMutations(['updateSelectedNotify']),
      pageChanged({ offset }) {
        this.setPage(Math.ceil(offset / NUM_ROWS));
        this.fetchNotifys();
      },
      toggleSort(propName) {
        this.setPage(0);
        this.setSort(propName);
        this.fetchNotifys();
      },
      selectNotify(notify) {
        if (!notify.message) {
          return;
        }
        // Layouts open modal window by selected notificaton
        this.updateSelectedNotify(notify);
        this.clearUnreadMark([notify]);
      },
      inputSearch(value) {
        this.setPage(0);
        this.setSearch(value);
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => this.fetchNotifys(), 400);
      },
      clearUnreadMark(notifys) {
        const ids = notifys.map(n => n.id);
        this.setNotifys(this.notifications
          .map(n => ids.indexOf(n.id) > -1
            ? {...n, isRead: true}
            : n
          ));
        this.readNotifys(ids);
      }
    },
  });
</script>

<style scoped lang="scss">
.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-results-warning {
  text-align: center;
}
.no-results-label {
  color: #B1B1B1;
}
</style>
