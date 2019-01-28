<i18n>
{
  "en": {
    "about": "About Us",
    "login": "Log in",
    "profile": "Profile",
    "qilin": "Qilin",
    "quit": "Logout",
    "register": "Sign in",
    "resetpass": "Reset passwd"
  },
  "ru": {
    "about": "О нас",
    "login": "Войти",
    "profile": "Профиль",
    "qilin": "Qilin",
    "quit": "Выход",
    "register": "Регистрация",
    "resetpass": "Сбос пароля"
  }
}
</i18n>

<template>
<div class="main-navbar">
  <router-link
    class="logo-link"
    to="/"
  >
    <Logo />
    <span class="logo-text">
      {{ $t('qilin') }}
    </span>
  </router-link>

  <div class="links">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :class="['link', link.isActive ? '_active' : '']"
      :title="link.title"
      :to="link.href"
    >
      <span class="dummy-logo" />
      {{ link.title }}
    </router-link>
  </div>

  <div class="bottom">
    <LocaleChanger class="locales" />
    <div class="auth-logo">
      <AuthLogo />
    </div>
    <div class="auth">
      <span
        v-if="!hasAuth"
        v-b-modal.login
        class="auth-item"
      >
        {{ $t('login') }}
      </span>
      <span
        v-if="!hasAuth"
        v-b-modal.register
        class="auth-item"
      >
        {{ $t('register') }}
      </span>

      <div
        v-if="hasAuth"
        class="logout"
      >
        <span>{{ userName }}</span>
        <router-link to="#">
          {{ $t('profile') }}
        </router-link>
        <span @click="$emit('logout')">
          {{ $t('quit') }}
        </span>
      </div>
    </div>
  </div>

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
</div>
</template>

<script type="ts">
import Vue from 'vue';
import AuthLogo from '@/icons/AuthLogo.vue';
import Logo from '@/icons/Logo.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import ResetPass from '@/components/ResetPass.vue';

export default Vue.extend({
  components: { AuthLogo, Logo, LocaleChanger, Login, Register, ResetPass },
  props: {
    /** User has auth */
    hasAuth: {
      default: false,
      type: Boolean,
    },
    /** Links for routing */
    links: {
      default: () => [],
      type: Array,
    },
    /** Name by auth user */
    userName: {
      default: '',
      type: String,
    },
  },
});
</script>

<style scoped lang="scss">
$navbar-color: #203d5f;
$hover-navbar-item-color: #2f6ecd;
$font-color: #6b85a2;
$hover-font-color: #fff;

.main-navbar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 80px;
  background-color: $navbar-color;
  z-index: 1;
  transition: width 0.2s ease-out 0.1s;
  color: $font-color;

  &:before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    pointer-events: none;
    transition: background-color 0.2s ease-out 0.1s;
    z-index: -1;
  }

  &:after {
    content: '';
    pointer-events: none;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: opacity 0.3s ease-out;
    box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.25);
  }

  &:hover {
    width: 224px;

    &:before {
      background-color: rgba($navbar-color, 0.4);
    }

    &:after {
      opacity: 1;
    }
  }
}
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
  transition: background-color 0.2s ease-out 0.1s;
}
.logo-link {
  cursor: pointer;
  display: block;
  height: 80px;
  width: 100%;
  padding: 16px;
  text-decoration: none;
  color: $hover-font-color;
  white-space: nowrap;
  overflow: hidden;
}
.logo-text {
  margin-left: 16px;
  font-weight: 500;
  font-size: 24px;
  vertical-align: middle;
}
.links {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.link {
  padding: 16px;
  display: block;
  text-decoration: none;
  color: $font-color;

  &:hover {
    color: $hover-font-color;
    background-color: rgba($navbar-color, 0.5);

    & > .dummy-logo {
      border-color: $hover-font-color;
    }
  }

  &._active,
  &._active:hover {
    color: $hover-font-color;
    background-color: $hover-navbar-item-color;

    & > .dummy-logo {
      background-color: $hover-font-color;
      border-color: $hover-font-color;
    }
  }
}
.dummy-logo {
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 0 30px 0 14px;
  border: 2px solid $font-color;
}
.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
.locales {
  padding-left: 16px;
}
.auth-logo {
  padding: 16px;
  cursor: pointer;
  max-width: 80px;
  width: 100%;

  &:hover ~ .auth {
    visibility: visible;
    opacity: 1;
  }
}
.auth {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease-out;
  position: absolute;
  width: 144px;
  bottom: 0;
  left: 80px;

  &:hover {
    visibility: visible;
    opacity: 1;
  }
}
.auth-item {
  display: block;
  height: 40px;
  line-height: 40px;
  cursor: pointer;

  &:hover {
    color: $hover-font-color;
  }
}
</style>
