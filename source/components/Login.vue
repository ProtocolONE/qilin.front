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
  <iframe
    src="/auth1/login"
    class="auth1"
    @message="message"
  />
</b-modal>
</template>

<script lang="ts">
  import Vue from 'vue';
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
      message(event){
        console.log(event);
      },
      goto_reg() {
        this.$refs.modal.hide();
        this.openReg();
      },
      goto_reset() {
        this.$refs.modal.hide();
        this.openReset();
      },
      submit() {
        this.$emit('login', this.form);
      },
      clickOk() {
        this.$refs.submit.click();
        return false;
      },
    },
  });
</script>

<style scoped lang="scss">
.auth1 {
  width: 358px;
  height: 455px;
}
</style>