<i18n>
{
  "en": {
    "about": "About Us",
    "lang": "Language",
    "login": "Log in",
    "profile": "Profile",
    "quit": "Logout",
    "register": "Sign in",
    "resetpass": "Reset passwd"
  },
  "ru": {
    "about": "О нас",
    "lang": "Язык",
    "login": "Войти",
    "profile": "Профиль",
    "quit": "Выход",
    "register": "Регистрация",
    "resetpass": "Сбос пароля"
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
      <LocaleChanger/>

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

  <Login
    id="login"
    ref="login"
    :open-reg="() => $refs.reg.$refs.modal.show()"
    :open-reset="() => $refs.resetpass.$refs.modal.show()"
  />
  <Register
    id="register"
    ref="reg"
    :open-login="() => $refs.login.$refs.modal.show()"
  />
  <ResetPass
    id="resetpass"
    ref="resetpass"
    :open-login="() => $refs.login.$refs.modal.show()"
  />
</b-navbar>
</template>

<script type="ts">
import Vue from 'vue';
import Logo from '@/icons/Logo.vue';
import Login from '@/modules/login/Login.vue';
import Register from '@/modules/register/Register.vue';
import ResetPass from '@/modules/resetpass/ResetPass.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';

export default Vue.extend({
  name: 'Navbar',
  components: { Logo, Login, Register, ResetPass, LocaleChanger },
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
