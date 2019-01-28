<template>
<div class="main-wrapper">
  <Navbar :links="links" />
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
      return this.navbarLinks.map(link => ({
        ...link,
        title: this.$i18n.t(`routes.${link.name}.title`),
        isActive: this.$route.name === link.name,
      }))
    },
  },
  mounted() {
    if (!window.localStorage.lang) {
      window.localStorage.lang = window.navigator.language;
    }
    if (this.$cookie.get('token')) {
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
      this.$cookie.delete('token');
      document.location = document.location;
    },
    changeLang(lang: string) {
      window.localStorage.lang = `${window.navigator.language}`.replace(/^\w+/, lang);
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
