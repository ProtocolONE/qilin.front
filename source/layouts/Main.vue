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
import { get } from 'lodash-es';
import { mapState, mapActions, mapGetters } from 'vuex';
import Navbar from './Navbar.vue';
import TipWithNotifications from '@/components/TipWithNotifications.vue';

import './bootstrap';

export default Vue.extend({
  components: { Navbar, TipWithNotifications },
  computed: {
    ...mapGetters(['hasAuth', 'permissions']),
    ...mapState(['navbarLinks', 'user']),

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
    if (this.isAuthPage && this.hasAuth) {
      this.$router.replace({ name: 'main' });
      return;
    }

    if (this.hasAuth) {
      await this.initUser({ router: this.$router });
    } else {
      this.$router.replace({ name: 'authBoard' });
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
