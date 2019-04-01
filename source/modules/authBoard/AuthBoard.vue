<template>
<div class="auth-board">
  <IconDummy />
  <span
    v-html="$t('title')"
    class="title"
  />
  <span
    class="text"
    v-html="$t('text')"
  />
  <UiButton
    class="button"
    :text="$t('buttonReg')"
    @click="showAuth('register')"
  />
  <UiButton
    class="button"
    :isTransparent="true"
    :text="$t('buttonLogin')"
    @click="showAuth('login')"
  />

  <Auth
    v-if="hasShownAuth"
    :type="authType"
    @close="hasShownAuth = false"
    @message="message"
  />

  <LocaleChanger class="locales" />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { UiButton } from '@protocol-one/ui-kit';
import Auth from '@/components/Auth.vue';
import LocaleChanger from '@/components/LocaleChanger.vue';
import IconDummy from '@/components/IconDummy.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { Auth, IconDummy, LocaleChanger, UiButton },
  data() {
    return {
      authType: 'login',
      hasShownAuth: false,
    };
  },
  methods: {
    ...mapActions(['setToken']),

    showAuth(type: string) {
      this.authType = type;
      this.hasShownAuth = true;
    },
    message(event: any) {
      if (event.success) {
        this.setToken(event.accessToken);
        this.$router.go();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.auth-board {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  color: #b1b1b1;
  flex: 1;
}
.title {
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  display: block;
  margin-top: 12px;
}
.text {
  display: block;
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 16px;
  text-align: center;
}
.button {
  margin-bottom: 8px;
}
.locales {
  position: fixed;
  top: 24px;
  right: 24px;
}
</style>
