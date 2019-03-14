<template>
<div class="main-wrapper">
  <Navbar
    :links="links"
    :hasAuth="hasAuth"
    @login="login"
    @logout="logout"
  />
  <TipWithNotifications />
  <router-view />
</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex';
  import Navbar from './Navbar.vue';
  import TipWithNotifications from '@/components/TipWithNotifications.vue';

  import './bootstrap';

  export default Vue.extend({
    components: { Navbar, TipWithNotifications },
    computed: {
      ...mapState(['navbarLinks', 'user']),
      hasAuth() {
        return !!localStorage.getItem('accessToken');
      },
      links() {
        // @TODO - Add type for navbarLinks/links
        return this.navbarLinks.map(link => ({
          ...link,
          title: this.$i18n.t(`routes.${link.name}.title`),
          isActive: this.$route.name === link.name,
        }));
      },
    },
    mounted() {
      this.initUser();
    },
    methods: {
      ...mapActions(['initUser', 'login']),
      logout() {
        localStorage.removeItem('accessToken');
        document.location.reload();
      },
    },
  });
</script>

<style lang="scss" scoped>
  .main-wrapper {
    margin-left: 80px;
  }
</style>