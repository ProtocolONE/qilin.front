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

            <b-button type="submit" ref="submit" v-show="false">Submit</b-button>
        </b-form>

        <div slot="modal-footer" class="w-100">
            <b-btn class="float-left" variant="primary" @click="clickOk">{{ $t('submit_btn') }}</b-btn>

            <div style="clear: both;"></div>

            <small class="form-text text-muted q-policy">
                By signing up, you agree to our Terms and that you have read our <a href="/">Privacy Policy</a> and <a href="/">Content Policy</a>.
            </small>
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
    .q-policy {
        margin-top: 90px;
        font-size: 12px;
        a {
            font-weight: bold;
            color: #757575;
        }
    }
</style>