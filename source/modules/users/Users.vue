<template>
<div class="users-wrapper">
  <UsersHeader
    :hasUsers="hasUsers"
    @search="filterByName"
  />

  <div class="content">
    <UiTable v-if="hasUsers">
      <UsersFilters
        :sortingProps="sortingProps"
        @toggleSort="toggleSort"
      />

      <UsersItem
        v-for="user in innerUsers"
        :key="user.id"
        :user="user"
      />
    </UiTable>
  </div>

  <UiPaginator
    v-if="usersCount > rowsLimit"
    :count="usersCount"
    :limit="rowsLimit"
    :offset="offset"
    @pageChanged="pageChanged"
  >
    <div
      class="left"
      slot="left"
    >
      {{ $t('total', { count: usersCount }) }}
    </div>
  </UiPaginator>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, filter, includes, map, orderBy } from 'lodash-es';
import { mapState, mapActions, mapGetters } from 'vuex';
import { UiPaginator, UiTable } from '@protocol-one/ui-kit';
import i18n from './i18n';
import UsersFilters from './components/UsersFilters.vue';
import UsersHeader from './components/UsersHeader.vue';
import UsersItem from './components/UsersItem.vue';

export default Vue.extend({
  i18n,
  components: { UiPaginator, UiTable, UsersFilters, UsersHeader, UsersItem },
  data() {
    return {
      innerUsers: [],
      sortingProps: {},
      offset: 0,
    };
  },
  computed: {
    ...mapState(['permissions']),
    ...mapGetters(['currentVendorId']),
    ...mapState('Users', ['rowsLimit', 'users', 'usersCount']),

    hasUsers() {
      return !!this.users.length;
    },
  },
  mounted() {
    this.initState({ vendorId: this.currentVendorId });
  },
  methods: {
    ...mapActions('Users', ['initState', 'fetchUsers']),

    filterByName(namePart) {
      this.innerUsers = filter(
        this.users,
        ({ email, name, lastSeen }) => includes(
          `${email} ${name} ${lastSeen}`.toLowerCase(),
          namePart.trim().toLowerCase(),
        ),
      );
    },
    pageChanged({ offset }) {
      const propName = get(Object.keys(this.ss), '0', '');
      this.offset = offset;

      this.fetchUsers({
        offset,
        sort: propName ? `${this.sortingProps[propName] ? '+' : '-'}${propName}` : '',
      });
    },
    toggleSort(propName) {
      this.sortingProps = {
        [propName]: !this.sortingProps[propName],
      };

      this.fetchUsers({
        sort: `${this.sortingProps[propName] ? '+' : '-'}${propName}`,
      });
    },
  },
  watch: {
    users(val) {
      this.innerUsers = val;
    },
  },
});
</script>

<style scoped lang="scss">
.users-wrapper {
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
