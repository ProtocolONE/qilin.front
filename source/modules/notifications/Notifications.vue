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
        <IconDummy />
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
  import IconDummy from '@/components/IconDummy.vue';
  import NotifyItem from './components/NotifyItem.vue';
  import NotifysHeader from './components/NotifysHeader.vue';
  import NotifyFilters from './components/NotifyFilters.vue';
  import { NUM_ROWS } from './constants';
  import i18n from './i18n';

  export default Vue.extend({
    i18n,
    components: { IconDummy, NotifyItem, NotifysHeader, NotifyFilters, UiTable, UiPaginator },
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
