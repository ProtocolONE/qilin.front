<template>
<div>
    <b-container fluid>
        <Navbar />
        <router-view />

        <Login
            id="login"
            ref="login"
            :open-reg="() => $refs.reg.$refs.modal.show()"
            :open-reset="() => $refs.resetpass.$refs.modal.show()"
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
    </b-container>
</div>
</template>

<script lang="ts">
import axios from 'axios';
import Vue from 'vue';
import config from '@/config';
import Login from '@/modules/login/Login.vue';
import Register from '@/modules/register/Register.vue';
import ResetPass from '@/modules/resetpass/ResetPass.vue';
import Navbar from './Navbar.vue';

import './bootstrap';

export default Vue.extend({
    name: 'Appl',
    components: { Login, Navbar, Register, ResetPass },
    data: () => ({
        user: null,
    }),
    mounted() {
        if (!window.localStorage.lang) {
            window.localStorage.lang = window.navigator.language;
        }
        if (this.$cookie.get('token')) {
            axios
                .get(`${config.api}/api/v1/me`)
                .then(res => {
                    this.user = res.data.user;
                })
                .catch(() => {
                    // / ignore...
                });
        }
    },
    methods: {
        logout() {
            this.$cookie.delete('token');
            document.location = document.location;
        },
        changeLang(lang: string) {
            window.localStorage.lang = `${window.navigator.language}`.replace(/^\w+/, lang);
            document.location = document.location;
        },
    },
});
</script>

<style scoped lang="scss">
h1 {
    color: red;
    font-weight: bold;
}
</style>
