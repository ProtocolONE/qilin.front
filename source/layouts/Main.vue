<template>
<div class="main-wrapper">
  <Navbar
    :links="links"
    @logout="logout"
  />
  <router-view />
</div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import { mapState } from 'vuex';
import config from '@/config';
import Navbar from './Navbar.vue';

import './bootstrap';

export default Vue.extend({
  components: { Navbar },
  data: () => ({
    user: null,
  }),
  computed: {
    ...mapState(['navbarLinks']),

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
    // @TODO - Move to store
    if (!window.localStorage.lang) {
      window.localStorage.lang = window.navigator.language;
    }
    if (window.localStorage.access_token) {
      axios
        .get(`${config.api}/api/v1/me`)
        .then(res => {
          this.user = res.data.user;
        })
        .catch(() => {
          // / ignore...
        });
    }
  },
  methods: {
    logout() {
      // @TODO - Move to store
      delete window.localStorage.access_token;
      document.location = document.location;
    },
  },
});
</script>

<style lang="scss" scoped>
.main-wrapper {
  margin-left: 80px;
}
</style>
