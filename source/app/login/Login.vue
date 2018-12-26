<i18n>
{"en": {
    "title": "Protocol One Qilin Account",
    "submit_btn": "Log in",
    "login_name": "Enter Email",
    "login_place": "Email address",
    "pass_name": "Password",
    "pass_place": "Password",
    "not_found": "User not found",
    "body": "By having a Qilin account, you can import or add your games to Qilin Data Hub ecosystem and use amazing distribution abilities. Sign up in just seconds.",


    "---":""
},
"ru": {
    "title": "Protocol One Qilin Account",
    "login_name": "Почта:",
    "login_place": "Укажите Email",
    "pass_name": "Пароль",
    "pass_place": "Пароль",
    "not_found": "Пользователь не найден",
    "body": "By having a Qilin account, you can import or add your games to Qilin Data Hub ecosystem and use amazing distribution abilities. Sign up in just seconds.",

    "---":""
}}
</i18n>

<template>
    <b-modal :id="id"
             :title="$t('title')"
             class="qilin-modal"
             centered
             hide-header-close
             @ok.prevent="clickOk">

        <p style="padding-top: 0;">{{ $t('body') }}</p>

        <b-form @submit.prevent="submit" method="post">
            <b-form-group :label="$t('login_name')" label-for="login">
                <b-form-input id="login"
                              type="email"
                              v-model="form.login"
                              required
                              :placeholder="$t('login_place')">
                </b-form-input>
            </b-form-group>
            <b-form-group label-for="password">
                <b-form-input id="password"
                              type="password"
                              v-model="form.password"
                              required
                              :placeholder="$t('pass_place')">
                </b-form-input>

                <b-tooltip target="password" placement="right">
                    Hello <strong>World!</strong>
                </b-tooltip>
            </b-form-group>

            <small class="form-text">
                Don`t have an account? <a href="/">Sign Up</a> | <a href="/">Reset password</a>
            </small>


            <b-button type="submit" variant="primary" ref="submit" v-show="false">Submit</b-button>
        </b-form>

        <div slot="modal-footer" class="w-100">
            <b-btn size="sm" class="float-right" variant="primary" @click="show=false">{{ $t('submit_btn') }}</b-btn>
        </div>
    </b-modal>
</template>

<script lang="ts">
    import Vue from 'vue'
    import axios from 'axios'
    import * as qs from 'querystring'
    import config from '../../config'

    export default Vue.extend({
        props: ['id'],
        data: () => ({
            form: {
                login: '',
                password: '',
            },
        }),
        methods: {
            submit(){
                axios.post(config.api + '/auth-api/login', qs.stringify(this.form)).then(res => {

                    // Cuz withCredentials didn't works here.
                    this.$cookie.set('token', res.data.access_token, { expires: '24h' });

                    document.location = document.location;
                }).catch(err => {
                    alert(this.$t('not_found'));
                });
            },
            clickOk(){
                this.$refs.submit.click();
                return false;
            }
        }
    })
</script>

<style scoped lang="scss">

</style>