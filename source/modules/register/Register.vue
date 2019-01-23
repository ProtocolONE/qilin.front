<i18n>
{
    "en": {
        "title": "Protocol One Qilin Account",
        "submit_btn": "Sign in",

        "login_label": "Enter Email",
        "login_place": "Email address",

        "pass_label": "Set Password",
        "pass_place": "Password",

        "not_found": "User not found",
        "body": "By having a Qilin account, you can import or add your games to Qilin Data Hub ecosystem and use amazing distribution abilities. Sign up in just seconds.",
        "have-acc": ["Already have an account?", "Log in"],
        "policy": ["By signing up, you agree to our Terms and that you have read our", "Privacy Policy", "and", "Content Policy."]
    },
    "ru": {
        "title": "Регистрация",
        "submit_btn": "Регистрация",

        "login_label": "Почта",
        "login_place": "Укажите Email",

        "pass_label": "Пароль",
        "pass_place": "Пароль",

        "not_found": "Пользователь не найден",
        "body": "С помощью аккаунта Qilin, Вы сможете добавлять игры в экосистему Qilin Data Hub и пользоваться уникальнми возможностями дистрибьюции. Заходите! Это займет нескольк секунд.",

        "have-acc": ["Уже есть аккаунт?", "Войдите"],
        "policy": ["Входя в систему вы соглашаетесь с нашими правилами пользования, для этого пожалуйста прочтите документы", "Политика конфиденциальности", "и", "Правила размещения контента."]
    }
}
</i18n>

<template>
<b-modal
  :id="id"
  ref="modal"
  :title="$t('title')"
  class="qilin-modal"
  centered
  hide-header-close
  @ok.prevent="clickOk"
>
  <p style="padding-top: 0;">
    {{ $t('body') }}
  </p>

  <b-form
    method="post"
    @submit.prevent="submit"
  >
    <b-form-group
      :label="$t('login_label')"
      label-for="reg-login"
    >
      <ValidateInput
        id="reg-login"
        v-model="form.login"
        type="email"
        :validate="(val) => val.length > 3 && val.indexOf('@') > 1"
        :placeholder="$t('login_place')"
      />
    </b-form-group>
    <b-form-group
      :label="$t('pass_label')"
      label-for="reg-password"
    >
      <ValidateInput
        id="reg-password"
        v-model="form.password"
        type="password"
        :validate="(val) => val.length > 3"
        :placeholder="$t('pass_place')"
      />
    </b-form-group>

    <small class="form-text q-have-acc">
      {{ $t('have-acc.0') }} <a
        href="/"
        @click.prevent="goto_login"
      >
        {{ $t('have-acc.1') }}
      </a>
    </small>

    <b-button
      v-show="false"
      ref="submit"
      type="submit"
    />
  </b-form>

  <div
    slot="modal-footer"
    class="w-100"
  >
    <b-btn
      class="float-left"
      variant="primary"
      @click="clickOk"
    >
      {{ $t('submit_btn') }}
    </b-btn>

    <div style="clear: both;" />

    <small class="form-text text-muted q-policy">
      {{ $t('policy.0') }} <a href="/">
        {{ $t('policy.1') }}
      </a> {{ $t('policy.2') }} <a href="/">
        {{ $t('policy.3') }}
      </a>.
    </small>
  </div>
</b-modal>
</template>

<script lang="ts">
import axios from 'axios';
import * as qs from 'querystring';
import Vue from 'vue';
import config from '@/config';
import ValidateInput from '@/components/ValidateInput/ValidateInput.vue';

export default Vue.extend({
  components: { ValidateInput },
  props: ['id', 'openLogin'],
  data: () => ({
    form: {
      login: '',
      password: '',
    },
  }),
  methods: {
    goto_login() {
      this.$refs.modal.hide();
      this.openLogin();
    },
    submit() {
      axios
        .post(`${config.api}/auth-api/register`, qs.stringify(this.form))
        .then(() => {
          this.goto_login();
        })
        .catch(() => {
          alert(this.$t('not_found'));
        });
    },
    clickOk() {
      this.$refs.submit.click();
      return false;
    },
  },
});
</script>

<style scoped lang="scss">
.q-have-acc {
  font-size: 16px;
}
.q-policy {
  margin-top: 90px;
  font-size: 12px;
  a {
    font-weight: bold;
    color: #757575;
  }
}
</style>
