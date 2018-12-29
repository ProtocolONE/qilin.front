<template>
    <div>
        <b-container fluid>
            <Navbar></Navbar>
            <router-view></router-view>

            <Login ref="login" id="login"
                   :openReg="() => $refs.reg.$refs.modal.show()"
                   :openReset="() => $refs.resetpass.$refs.modal.show()"></Login>
            <Register ref="reg" id="register" :openLogin="() => $refs.login.$refs.modal.show()"></Register>
            <ResetPass ref="resetpass" id="resetpass" :openLogin="() => $refs.login.$refs.modal.show()"></ResetPass>

            <hr>
            <Footer></Footer>
        </b-container>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Login from '../../app/login/Login.vue'
    import Register from '../../app/register/Register.vue'
    import ResetPass from '../../app/resetpass/ResetPass.vue'
    import Footer from './Footer.vue'
    import Navbar from './Navbar.vue'
    import axios from 'axios'
    import config from '../../config'

    import './bootstrap'

    export default Vue.extend({
        components: {Login, Navbar, Register, ResetPass, Footer},
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