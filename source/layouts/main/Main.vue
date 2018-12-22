<template>
    <div>
        <b-container>
            <Navbar></Navbar>

            <h1>{{ $t('QILIN') }}</h1>

            <hr>

            <router-view></router-view>

            <Login id="login"></Login>

            <hr>
        </b-container>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Login from '../../app/login/Login.vue'
    import Navbar from './Navbar.vue'
    import axios from 'axios'
    import config from '../../config'

    import './bootstrap'

    export default Vue.extend({
        components: {Login, Navbar},
        name: "Appl",
        data: () => ({
            user: null,
        }),
        mounted(){
            if (this.$cookie.get('token')) {
                axios.get(config.api + '/api/v1/me').then(res => {
                    this.user = res.data.user;
                }).catch(err => {
                    /// ignore...
                });
            }
        },
        methods: {
            logout(){
                this.$cookie.delete('token');
                document.location = document.location;
            },
            changeLang(lang: string){
                window.localStorage.lang = lang;
                document.location = document.location;
            }
        }
    })
</script>

<style scoped lang="scss">

    h1 {
        color: red;
        font-weight: bold;
    }

</style>