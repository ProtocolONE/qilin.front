<template>
<div :class="['main-wrapper', { '_with-navbar': hasNavbar }]">
  <Navbar
    v-if="hasNavbar"
    :hasAuth="hasAuth"
    :links="links"
    :userName="userName"
    @logout="logout"
    @authMessage="authMessage"
  />
  <TipWithNotifications v-if="hasAuth && hasNavbar" />
  <router-view />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { get, isEmpty } from 'lodash-es';
import { mapState, mapActions, mapGetters } from 'vuex';
import Navbar from './Navbar.vue';
import TipWithNotifications from '@/components/TipWithNotifications.vue';

import './bootstrap';

export default Vue.extend({
  components: { Navbar, TipWithNotifications },
  computed: {
    ...mapGetters(['hasAccessToModule', 'hasAuth']),
    ...mapState(['navbarLinks', 'user', 'permissions']),

    hasNavbar() {
      return this.$route.name !== 'authBoard';
    },
    userName() {
      return get(this.user, 'name', '');
    },
    links() {
      // @TODO - Add type for navbarLinks/links
      return this.navbarLinks.map(link => ({
        ...link,
        title: this.$i18n.t(link.titlePath),
        isActive: this.$route.name === link.name,
      }));
    },
  },
  async created() {
    await this.initUser();
  },
  watch: {
    $route(to, from) {
      const hasPermissions = !isEmpty(this.permissions);
      const requiresPermissions = get(to, 'meta.requiresPermissions', true);

      if (
        !hasPermissions && requiresPermissions ||
        hasPermissions && !this.hasAccessToModule
      ) {
        this.$router.replace({ name: 'home' });
      }
    },
  },
  methods: {
    ...mapActions(['initUser', 'logout', 'setToken']),

    authMessage(event: any) {
      if (event.success) {
        this.setToken(event.accessToken);
        this.$router.go();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.main-wrapper {
  &._with-navbar {
    margin-left: 80px;
  }

  @media print {
    margin-left: 0;
  }
}
</style>
