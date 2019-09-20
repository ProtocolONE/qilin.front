<template>
<div class="users-wrapper">
  <UsersHeader
    :hasUsers="hasUsers"
    :hasChangePermission="hasChangePermission"
    :showInvites="showInvites"
    @openPopupInvite="openPopup('invite')"
    @search="filterByName"
    @switchInvites="switchInvites"
  />

  <div v-if="!showInvites">
    <div class="content">
      <UiTable v-if="hasUsers">
        <UsersFilters
          :sortingProps="sortingProps"
          @toggleSort="toggleSort"
        />
        <UsersItem
          v-for="user in actualUsers"
          :key="user.id"
          :user="user"
          @removeAllRoles="removeAllRoles(user.id)"
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
        class="paginator-left-content"
        slot="left"
      >
        {{ $t('total', { count: usersCount }) }}
      </div>
    </UiPaginator>
  </div>
  <div v-else>
    <div class="content">
      <UiTable>
        <InvitesFilters/>
        <InvitesItem
          v-for="invite in invites"
          :key="invite.email"
          :invite="invite"
          @resend="clickResendInvite"
          @cancel="clickCancelInvite"
        />
      </UiTable>
    </div>
  </div>

  <AddRole
    :games="userGames"
    :hasModal="hasModal"
    :isLastStep="modalStep === 'last'"
    :modalType="modalType"
    @cancel="hasModal = false"
    @changeStep="changeStep"
    @submit="addRolesSubmit"
  />

  <MessageBox
    v-if="isInviteSent"
    @close="isInviteSent = false"
    :message="$t('inviteSent')"
  />

</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, filter, includes } from 'lodash-es';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import { UiPaginator, UiTable } from '@protocol-one/ui-kit';
import AddRole from '@/components/AddRole.vue';
import MessageBox from '@/components/MessageBox.vue';
import UsersFilters from './components/UsersFilters.vue';
import UsersHeader from './components/UsersHeader.vue';
import UsersItem from './components/UsersItem.vue';
import InvitesItem from './components/InvitesItem.vue';
import InvitesFilters from './components/InvitesFilters.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: {
    AddRole,
    UiPaginator,
    UiTable,
    UsersFilters,
    UsersHeader,
    UsersItem,
    InvitesFilters,
    InvitesItem,
    MessageBox,
  },  
  data() {
    return {
      hasModal: false,
      modalType: 'invite',
      modalStep: 'first',
      innerUsers: [],
      sortingProps: {},
      offset: 0,
      isInviteSent: false,
    };
  },
  computed: {
    ...mapState(['permissions']),
    ...mapGetters(['currentVendorId']),
    ...mapState('Games', ['games']),
    ...mapState('Users', ['rowsLimit', 'users', 'usersCount', 'showInvites', 'invites']),

    actualUsers() {
      return filter(
        this.innerUsers,
        (user, index) => index >= this.offset && index < this.offset + this.rowsLimit,
      );
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
    hasUsers() {
      return !!this.users.length;
    },
    userGames() {
      return [{
        id: '*',
        internalName: this.$t('global'),
      }, ...this.games];
    }
  },
  mounted() {
    this.initState({ vendorId: this.currentVendorId });
    this.fetchGames({ vendorId: this.currentVendorId });
  },
  methods: {
    ...mapMutations('Users', ['switchInvites']),
    ...mapActions('Games', ['fetchGames']),
    ...mapActions('Users', ['initState', 'fetchUsers', 'changeRoles', 'sendInvite', 'resendInvite', 'cancelInvite', 'fetchInvites']),

    addRolesSubmit({ selectedGameId, rolesList, email }) {
      this.sendInvite({
        selectedGameId,
        rolesList,
        email,
        vendorId: this.currentVendorId,
      });
      this.hasModal = false;
    },
    changeStep(step) {
      this.modalStep = step;
    },
    openPopup(type) {
      this.modalType = type;
      this.hasModal = true;
    },
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
      const propName = get(Object.keys(this.sortingProps), '0', '');
      this.offset = offset;

      this.fetchUsers({
        sort: propName ? `${this.sortingProps[propName] ? '+' : '-'}${propName}` : '',
        vendorId: this.currentVendorId,
      });
    },
    removeAllRoles(userId) {
      this.changeRoles({ userId, vendorId: this.currentVendorId, roles: [] });
    },
    toggleSort(propName) {
      this.sortingProps = {
        [propName]: !this.sortingProps[propName],
      };

      this.fetchUsers({
        sort: `${this.sortingProps[propName] ? '+' : '-'}${propName}`,
        vendorId: this.currentVendorId,
      });
    },
    async clickResendInvite(inviteId) {
      await this.resendInvite({
        vendorId: this.currentVendorId,
        inviteId,
      });
      this.isInviteSent = true;
    },
    async clickCancelInvite(inviteId) {
      await this.cancelInvite({
        vendorId: this.currentVendorId,
        inviteId,
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
.paginator-left-content {
  color: #333;
}
</style>
