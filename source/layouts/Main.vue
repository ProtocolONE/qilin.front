<template>
<div :class="['main-wrapper', { '_with-navbar': !isAuthPage }]">
  <Navbar
    v-if="!isAuthPage"
    :hasAuth="hasAuth"
    :links="links"
    @logout="logout"
    @authMessage="authMessage"
  />
  <TipWithNotifications v-if="hasAuth && !isAuthPage" />
  <router-view />
</div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState, mapActions, mapGetters } from 'vuex';
  import Navbar from './Navbar.vue';
  import TipWithNotifications from '@/components/TipWithNotifications.vue';

  import './bootstrap';

  export default Vue.extend({
    components: { Navbar, TipWithNotifications },
    computed: {
      ...mapGetters(['hasAuth']),
      ...mapState(['navbarLinks', 'user']),

      isAuthPage() {
        return this.$route.name === 'authBoard';
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
}
</style>
