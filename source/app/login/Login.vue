<i18n>
{"en": {
    "title": "Login",
    "login_name": "Email address:",
    "login_place": "Enter email",
    "pass_name": "Password",
    "pass_place": "Password"
},
"ru": {
    "title": "Авторизация",
    "login_name": "Почта:",
    "login_place": "Укажите Email",
    "pass_name": "Пароль",
    "pass_place": "Пароль"
}}
</i18n>

<template>
    <b-modal :id="id"
             :title="$t('title')"
             @ok="handleOk">

        <b-form @submit="handleOk">
            <b-form-group :label="$t('login_name')" label-for="login">
                <b-form-input id="login"
                              type="email"
                              v-model="form.login"
                              required
                              :placeholder="$t('login_place')">
                </b-form-input>
            </b-form-group>
            <b-form-group :label="$t('pass_name')" label-for="password">
                <b-form-input id="password"
                              type="password"
                              v-model="form.password"
                              required
                              :placeholder="$t('pass_place')">
                </b-form-input>
            </b-form-group>
        </b-form>

    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue'
    import axios from 'axios'
    import * as qs from 'querystring'

    export default Vue.extend({
        props: ['id'],
        data: () => ({
            form: {
                login: 'admin',
                password: 'password',
            },
        }),
        methods: {
            handleOk(){
                axios.post('/auth-api/login', qs.stringify(this.form)).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    alert(err);
                });
            }
        }
    })
</script>

<style scoped lang="scss">

</style>