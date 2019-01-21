<i18n>
{
    "en": {
        "title": "Protocol One Qilin Account",
        "submit_btn": "Submit",

        "login_label": "Enter Email",
        "login_place": "Email address",

        "not_found": "User not found",
        "body": "Forgot you password? A link to reset you password will be send yo your email.",
        "have-acc": ["Back to", "Log in"],
        "policy": ["By signing up, you agree to our Terms and that you have read our", "Privacy Policy", "and", "Content Policy."],

        "reset-done": "Request for reset your password is send to your mailbox."
    },
    "ru": {
        "title": "Сброс пароля",
        "submit_btn": "Сброс",

        "login_label": "Почта",
        "login_place": "Укажите Email",

        "not_found": "Пользователь не найден",
        "body": "Забыли ваш пароль? Ссылка на сброс пароля будет отправлен вам на почту.",

        "have-acc": ["Назад", "Войти"],
        "policy": ["Входя в систему вы соглашаетесь с нашими правилами пользования, для этого пожалуйста прочтите документы", "Политика конфиденциальности", "и", "Правила размещения контента."],

        "reset-done": "Запрос на сброс пароля отправлен Вам на почту."
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
            label-for="reset-email"
        >
            <ValidateInput
                id="reset-email"
                v-model="form.email"
                type="email"
                :validate="(val) => val.length > 3 && val.indexOf('@') > 1"
                :placeholder="$t('login_place')"
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
            email: '',
        },
    }),
    methods: {
        goto_login() {
            this.$refs.modal.hide();
            this.openLogin();
        },
        submit() {
            axios
                .post(`${config.api}/auth-api/reset`, qs.stringify(this.form))
                .then(() => {
                    alert(this.$t('reset-done'));
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
