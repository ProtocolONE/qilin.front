<template>
<div class="main-wrapper">
  <Navbar />
  <router-view />
</div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import config from '@/config';
import Navbar from './Navbar.vue';

import './bootstrap';

export default Vue.extend({
  components: { Navbar },
  data: () => ({
    user: null,
  }),
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

<style scoped lang="scss">
h1 {
  color: red;
  font-weight: bold;
}
</style>
