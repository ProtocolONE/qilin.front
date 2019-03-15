<template>
<div class="main-wrapper">
  <Navbar
    :hasAuth="hasAuth"
    :links="links"
    @logout="logout"
  />
  <TipWithNotifications />
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
    },
  });
</script>

<style lang="scss" scoped>
  .main-wrapper {
    margin-left: 80px;
  }
</style>