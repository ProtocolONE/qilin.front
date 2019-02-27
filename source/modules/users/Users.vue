<template>
<div class="users-wrapper">
  <UsersHeader
    :hasUsers="hasUsers"
    @search="filterByName"
  />

  <UiTable v-if="hasUsers">
    <UsersFilters @toggleSort="toggleSort" />

    <UsersItem
      v-for="user in innerUsers"
      :key="user.id"
      v-bind="{ user, roles }"
    />
  </UiTable>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, filter, includes, map, orderBy } from 'lodash-es';
import { mapState, mapActions } from 'vuex';
import { UiTable } from '@protocol-one/ui-kit';
import UsersFilters from './components/UsersFilters.vue';
import UsersHeader from './components/UsersHeader.vue';
import UsersItem from './components/UsersItem.vue';

export default Vue.extend({
  components: { UsersFilters, UsersHeader, UsersItem, UiTable },
  data: () => ({
    innerUsers: [],
    sortingProp: {},
  }),
  computed: {
    ...mapState('Users', ['users', 'roles']),

    hasUsers() {
      return !!this.users.length;
    },
  },
  mounted() {
    this.initState();
  },
  methods: {
    ...mapActions('Users', ['initState']),

    filterByName(namePart) {
      this.innerUsers = this.users.filter(
        game => includes(game.internalName.toLowerCase(), namePart.toLowerCase())
      );
    },
    toggleSort(propName) {
      this.sortingProps[propName] = !this.sortingProps[propName];

      // @TODO - add sorting by roles
      this.innerUsers = orderBy(
        this.users,
        propName,
        this.sortingProps[propName] ? 'asc' : 'desc',
      );
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
</style>
