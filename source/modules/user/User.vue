<template>
<div class="users-wrapper">
  <UserHeader
    :currentUser="currentUser"
    :hasChangePermission="hasChangePermission"
    @openPopupAddRole="openPopup('addRole')"
  />

  <div class="content">
    <UiTable v-if="currentUser">
      <UserFilters
        :sortingProps="sortingProps"
        @toggleSort="toggleSort"
      />

      <UserItem
        v-for="game in actualGames"
        :key="game.id"
        :game="game"
        @removeAllRoles="removeAllRoles"
      />
    </UiTable>
  </div>

  <UiPaginator
    v-if="gamesCount > rowsLimit"
    :count="gamesCount"
    :limit="rowsLimit"
    :offset="offset"
    @pageChanged="pageChanged"
  >
    <div
      class="paginator-left-content"
      slot="left"
    >
      {{ $t('total', { count }) }}
    </div>
  </UiPaginator>

  <AddRole
    :games="games"
    :hasModal="hasModal"
    :isLastStep="modalStep === 'last'"
    :modalType="modalType"
    @cancel="hasModal = false"
    @changeStep="changeStep"
    @submit="addRolesSubmit"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, filter, find, includes, map } from 'lodash-es';
import { mapState, mapActions, mapGetters } from 'vuex';
import { UiPaginator, UiTable } from '@protocol-one/ui-kit';
import AddRole from '@/components/AddRole.vue';
import UserFilters from './components/UserFilters.vue';
import UserHeader from './components/UserHeader.vue';
import UserItem from './components/UserItem.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: {
    AddRole,
    UiPaginator,
    UiTable,
    UserFilters,
    UserHeader,
    UserItem,
  },  
  data() {
    return {
      hasModal: false,
      modalType: 'addRole',
      modalStep: 'first',
      sortingProps: {},
      offset: 0,
    };
  },
  computed: {
    ...mapState(['permissions']),
    ...mapGetters(['currentVendorId']),
    ...mapState('Games', ['games']),
    ...mapState('Users', ['rowsLimit', 'users']),

    actualGames() {
      return filter(
        this.innerGames,
        (user, index) => index >= this.offset && index < this.offset + this.rowsLimit,
      );
    },
    innerGames() {
      const roles = this.currentUser.roles;
      const globalRole = find(roles, ({ resource }) => resource.id === '*');
      console.error(globalRole);
      return [
        {
          id: globalRole.resource.id,
          internalName: globalRole.resource.meta.internalName,
          icon: globalRole.resource.meta.preview,
          roles: [ { role: globalRole.role, internalName: globalRole.role } ],
        },
        ...map(this.games, ({ id, internalName, icon }) => ({
          id,
          internalName,
          icon,
          roles: map(
            filter(roles, ({ resource }) => resource.id === id),
            ({ role, resource }) => ({ role, internalName: resource.meta.internalName })
          ),
        })),
      ];
    },
    gamesCount() {
      return this.games.length;
    },
    currentUser() {
      return find(this.users, ({ id }) => this.$route.params.userId === id) || {};
    },
    hasChangePermission() {
      return includes(
        ['any', '*', 'write'],
        get(
          this.permissions,
          ['vendors.memberships', '*', 'action'],
          get(this.permissions, ['vendors.memberships', 'skip', 'action'], ''),
        ),
      );
    },
    hasUser() {
      return !!this.users.length;
    },
  },
  mounted() {
    if (!this.users.length) {
      this.initState({ vendorId: this.currentVendorId });
    }

    if (!this.games.length) {
      this.fetchGames({ vendorId: this.currentVendorId });
    }
  },
  methods: {
    ...mapActions('Games', ['fetchGames']),
    ...mapActions('Users', ['initState', 'changeRoles', 'sendInvite']),

    addRolesSubmit({ selectedGameId, rolesList, email }) {
      this.sendInvite({
        selectedGameId,
        rolesList,
        email,
        vendorId: this.currentVendorId,
      });
    },
    changeStep(step) {
      this.modalStep = step;
    },
    openPopup(type) {
      this.modalType = type;
      this.hasModal = true;
    },
    pageChanged({ offset }) {
      const propName = get(Object.keys(this.sortingProps), '0', '');
      this.offset = offset;

      this.fetchGames({
        sort: propName ? `${this.sortingProps[propName] ? '+' : '-'}${propName}` : '',
        vendorId: this.currentVendorId,
      });
    },
    removeAllRoles() {
      this.changeRoles({ userId: this.currentUser.id, vendorId: this.currentVendorId, roles: [] });
    },
    toggleSort(propName) {
      this.sortingProps = {
        [propName]: !this.sortingProps[propName],
      };

      this.fetchGames({
        sort: `${this.sortingProps[propName] ? '+' : '-'}${propName}`,
        vendorId: this.currentVendorId,
      });
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
.paginator-left-content {
  color: #333;
}
</style>
