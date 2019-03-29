<template>
<div :class="['main-wrapper', { '_with-navbar': !isAuthPage }]">
  <Navbar
    v-if="!isAuthPage"
    :hasAuth="hasAuth"
    :links="links"
    :userName="userName"
    @logout="logout"
    @authMessage="authMessage"
  />
  <TipWithNotifications v-if="hasAuth && !isAuthPage" />
  <router-view />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { get, includes, isEmpty } from 'lodash-es';
import { mapState, mapActions, mapGetters } from 'vuex';
import Navbar from './Navbar.vue';
import TipWithNotifications from '@/components/TipWithNotifications.vue';

import './bootstrap';

export default Vue.extend({
  components: { Navbar, TipWithNotifications },
  computed: {
    ...mapGetters(['hasAuth']),
    ...mapState(['navbarLinks', 'user', 'permissions']),

    isAuthPage() {
      return this.$route.name === 'authBoard';
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
  async mounted() {
    if (this.hasAuth) {
      await this.initUser({ router: this.$router });
    } else {
      this.$router.replace({ name: 'authBoard' });
    }

    if (this.isAuthPage && this.hasAuth) {
      const moduleName = isEmpty(this.permissions) ? 'main' : 'games';
      this.$router.replace({ name: moduleName });
      return;
    }

    if (
      !isEmpty(this.permissions) &&
      !includes(['any', 'read'], get(this.permissions, `${this.$route.name}.action`, ''))
    ) {
      this.$router.replace({ name: 'games' });
    }
  },
  methods: {
    ...mapActions(['initUser', 'logout']),
    ...mapActions('Auth', ['setToken']),

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
