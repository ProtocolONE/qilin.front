<template>
<PageNavbar
  :logo-link="logoLink"
  title="Qilin"
  :is-authorised="hasAuth"
  :user-name="userName"
  :navigation-links="navigationLinks"
  @login="isShowLogin = true"
  @register="isShowLogin = true"
  @logout="$emit('logout')"
>
  <IconLogo slot="logo" />
  <LocaleChanger 
    slot="bottom"
    class="locales"
  />

  <Login
    v-if="isShowLogin"
    @close="isShowLogin = false"
    @login="$emit('login', $event)"
  />
</PageNavbar>
</template>

<script type="ts">
import Vue from 'vue';
import { PageNavbar } from '@protocol-one/ui-kit'
import IconLogo from '@/components/IconLogo.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import ResetPass from '@/components/ResetPass.vue';

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
    isShowLogin: false,
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
