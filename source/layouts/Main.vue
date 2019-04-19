<template>
<div :class="['main-wrapper', { '_with-navbar': hasNavbar }]">
  <template v-if="hasAccessToModule()">
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
  </template>

  <div
    v-else
    class="loader"
  >
    <IconLoader class="preloader" />
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { get } from 'lodash-es';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import TipWithNotifications from '@/components/TipWithNotifications.vue';
import IconLoader from '@/components/IconLoader.vue';
import Navbar from './Navbar.vue';

import './bootstrap';

export default Vue.extend({
  components: { IconLoader, Navbar, TipWithNotifications },
  computed: {
    ...mapGetters(['currentVendorId', 'hasAccessToModule', 'hasAuth', 'navbarLinks']),
    ...mapState(['user']),

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

    if (!this.hasAccessToModule()) {
      this.$router.replace({ name: 'home' });
    }
  },
  watch: {
    $route(to, from) {
      this.nextRoute(to);
    },
    hasAccessToModule(hasAccess) {
      if (!hasAccess()) {
        const module = this.$route.name === 'onBoarding' ? 'documents' : 'home';

        this.$router.replace({
          name: module,
          params: { vendorId: this.currentVendorId },
        });
      }
    }
  },
  methods: {
    ...mapActions(['initUser', 'logout', 'setToken']),
    ...mapMutations(['nextRoute']),

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
.loader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 10000;
}
.preloader {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
