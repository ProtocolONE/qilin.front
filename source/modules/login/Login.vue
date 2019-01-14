<i18n>
{
    "en": {
        "title": "Protocol One Qilin Account",
        "submit_btn": "Log in",
        "login_name": "Enter Email",
        "login_place": "Email address",
        "pass_name": "Password",
        "pass_place": "Password",
        "not_found": "User not found",
        "body": "By having a Qilin account, you can import or add your games to Qilin Data Hub ecosystem and use amazing distribution abilities. Sign up in just seconds.",
        "have-acc": ["Don`t have an account?", "Sign Up", "Reset password"],
        "policy": ["By signing up, you agree to our Terms and that you have read our", "Privacy Policy", "and", "Content Policy."]
    },
    "ru": {
        "title": "Вход",
        "submit_btn": "Вход",
        "login_name": "Почта",
        "login_place": "Укажите Email",
        "pass_name": "Пароль",
        "pass_place": "Пароль",
        "not_found": "Пользователь не найден",
        "body": "С помощью аккаунта Qilin, Вы сможете добавлять игры в экосистему Qilin Data Hub и пользоваться уникальнми возможностями дистрибьюции. Заходите! Это займет нескольк секунд.",
        "have-acc": ["Еще нет аккаунта?", "Регистрация", "Сброс пароля"],
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
        :label="$t('login_name')"
        label-for="login-login"
      >
        <ValidateInput
          id="login-login"
          v-model="form.login"
          type="email"
          :validate="(val) => !!val.match(/.+?@.+?\..+/)"
          :placeholder="$t('login_place')"
        />
      </b-form-group>
      <b-form-group label-for="login-password">
        <ValidateInput
          id="login-password"
          v-model="form.password"
          type="password"
          :validate="(val) => val.length > 3"
          :placeholder="$t('pass_place')"
        />
        <!--
            <b-tooltip target="password" placement="right">
                Hello <strong>World!</strong>
            </b-tooltip>
            -->
      </b-form-group>

      <small class="form-text q-have-acc">
        {{ $t('have-acc.0') }} <a
          href="/"
          @click.prevent="goto_reg"
        >
          {{ $t('have-acc.1') }}
        </a> | <a
          href="/"
          @click.prevent="goto_reset"
        >
          {{ $t('have-acc.2') }}
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
    props: ['id', 'openReg', 'openReset'],
    data: () => ({
        form: {
            login: '',
            password: '',
        },
    }),
    methods: {
        goto_reg() {
            this.$refs.modal.hide();
            this.openReg();
        },
        goto_reset() {
            this.$refs.modal.hide();
            this.openReset();
        },
        submit() {
            axios
                .post(`${config.api}/auth-api/login`, qs.stringify(this.form))
                .then(res => {
                    // Cuz withCredentials didn't works here.
                    this.$cookie.set('token', res.data.access_token, { expires: '24h' });
                    window.localStorage.lang = res.data.user.lang;

                    window.location.href = '/vendor/on-boarding';
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
