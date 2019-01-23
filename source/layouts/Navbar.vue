<i18n>
{
    "en": {
        "lang": "Language",
        "profile": "Profile",
        "quit": "Logout",
        "login": "Log in",
        "register": "Sign in",
        "resetpass": "Reset passwd",
        "about": "About Us"
    },
    "ru": {
        "lang": "Язык",
        "profile": "Профиль",
        "register": "Регистрация",
        "resetpass": "Сбос пароля",
        "quit": "Выход",
        "login": "Войти",
        "about": "О нас"
    }
}
</i18n>

<template>
<b-navbar
  toggleable="md"
  class="nav-qilin"
>
  <b-navbar-toggle target="nav_collapse" />

  <b-navbar-brand
    href="#"
    to="/"
  >
    <Logo />
  </b-navbar-brand>

  <b-collapse
    id="nav_collapse"
    is-nav
  >
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown
        :text="$t('lang')"
        right
      >
        <b-dropdown-item @click="$parent.changeLang('en')">
          EN
        </b-dropdown-item>
        <b-dropdown-item @click="$parent.changeLang('ru')">
          RU
        </b-dropdown-item>
        <b-dropdown-item @click="$parent.changeLang('de')">
          DE
        </b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item
        v-if="!$parent.user"
        v-b-modal.login
      >
        {{ $t('login') }}
      </b-nav-item>
      <b-nav-item
        v-if="!$parent.user"
        v-b-modal.register
      >
        {{ $t('register') }}
      </b-nav-item>

      <b-nav-item-dropdown
        v-if="$parent.user"
        right
      >
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{ $parent.user.nickname }}</em>
        </template>
        <b-dropdown-item href="#">
          {{ $t('profile') }}
        </b-dropdown-item>
        <b-dropdown-item @click="$parent.logout">
          {{ $t('quit') }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script type="ts">
import Vue from 'vue';
import Logo from '@/icons/Logo.vue';

export default Vue.extend({
  name: 'Navbar',
  components: {
    Logo,
  },
  data: () => ({
    enabled: true,
  }),
});
</script>

<style scoped lang="scss">
.score a {
  color: white !important;
}
.nav-qilin {
  margin-top: 20px;
}
.navbar-brand {
  margin-left: 30px;
}
</style>
