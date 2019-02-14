<template>
<PageNavbar
  :logo-link="logoLink"
  title="Qilin"
  :is-authorised="hasAuth"
  :user-name="userName"
  :navigation-links="navigationLinks"
  @login="$refs.login.$refs.modal.show()"
  @register="$refs.reg.$refs.modal.show()"
  @logout="$emit('logout')"
>
  <IconLogo slot="logo" />
  <LocaleChanger 
    slot="bottom"
    class="locales"
  />

  <Login
    id="login"
    ref="login"
    :open-reg="() => $refs.reg.$refs.modal.show()"
    :open-reset="() => $refs.resetpass.$refs.modal.show()"
    @login="$emit('login', $event)"
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
</PageNavbar>
</template>

<script type="ts">
import Vue from 'vue';
import IconLogo from '@/components/IconLogo.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import ResetPass from '@/components/ResetPass.vue';
import {PageNavbar} from '@protocol-one/ui-kit'

export default Vue.extend({
  components: { IconLogo, LocaleChanger, Login, Register, ResetPass, PageNavbar },
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

  data: () => ({
    logoLink: {
      url: '/',
      router: true
    }
  }),

  computed: {
    navigationLinks() {
      return this.links.map((item) => ({
          url: item.href,
          label: item.title,
          isActive: item.isActive,
          router: true,
        }))
    }
  }
});
</script>

<style scoped lang="scss">
.locales {
  padding-left: 16px;
}
</style>
