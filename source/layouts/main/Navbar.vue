<i18n>
    {
        "en": {
            "lang": "Language",
            "profile": "Profile",
            "quit": "Logout",
            "login": "Log in",
            "about": "About Us"
        },
        "ru": {
            "lang": "Язык",
            "profile": "Профиль",
            "quit": "Выход",
            "login": "Войти",
            "about": "О нас"
        }
    }
</i18n>

<template>
    <b-navbar toggleable="md" class="nav-qilin">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#" to="/">
            <svg width="43" height="45" viewBox="0 0 43 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 9.375C9.76049 9.375 8.95833 10.2145 8.95833 11.25V33.75C8.95833 34.7855 9.76049 35.625 10.75 35.625H32.25C33.2395 35.625 34.0417 34.7855 34.0417 33.75V11.25C34.0417 10.2145 33.2395 9.375 32.25 9.375H10.75ZM5.375 11.25C5.375 8.1434 7.78147 5.625 10.75 5.625H32.25C35.2185 5.625 37.625 8.1434 37.625 11.25V33.75C37.625 36.8566 35.2185 39.375 32.25 39.375H10.75C7.78147 39.375 5.375 36.8566 5.375 33.75V11.25Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3333 16.875C14.3333 15.8395 15.1355 15 16.125 15H26.875C27.8645 15 28.6667 15.8395 28.6667 16.875V28.125C28.6667 29.1605 27.8645 30 26.875 30H16.125C15.1355 30 14.3333 29.1605 14.3333 28.125V16.875ZM17.9167 18.75V26.25H25.0833V18.75H17.9167Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.125 0C17.1145 0 17.9167 0.839466 17.9167 1.875V7.5C17.9167 8.53553 17.1145 9.375 16.125 9.375C15.1355 9.375 14.3333 8.53553 14.3333 7.5V1.875C14.3333 0.839466 15.1355 0 16.125 0Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.875 0C27.8645 0 28.6667 0.839466 28.6667 1.875V7.5C28.6667 8.53553 27.8645 9.375 26.875 9.375C25.8855 9.375 25.0833 8.53553 25.0833 7.5V1.875C25.0833 0.839466 25.8855 0 26.875 0Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.125 35.625C17.1145 35.625 17.9167 36.4645 17.9167 37.5V43.125C17.9167 44.1605 17.1145 45 16.125 45C15.1355 45 14.3333 44.1605 14.3333 43.125V37.5C14.3333 36.4645 15.1355 35.625 16.125 35.625Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.875 35.625C27.8645 35.625 28.6667 36.4645 28.6667 37.5V43.125C28.6667 44.1605 27.8645 45 26.875 45C25.8855 45 25.0833 44.1605 25.0833 43.125V37.5C25.0833 36.4645 25.8855 35.625 26.875 35.625Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M34.0417 16.875C34.0417 15.8395 34.8438 15 35.8333 15H41.2083C42.1978 15 43 15.8395 43 16.875C43 17.9105 42.1978 18.75 41.2083 18.75H35.8333C34.8438 18.75 34.0417 17.9105 34.0417 16.875Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M34.0417 26.25C34.0417 25.2145 34.8438 24.375 35.8333 24.375H41.2083C42.1978 24.375 43 25.2145 43 26.25C43 27.2855 42.1978 28.125 41.2083 28.125H35.8333C34.8438 28.125 34.0417 27.2855 34.0417 26.25Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.875C0 15.8395 0.802156 15 1.79167 15H7.16667C8.15618 15 8.95833 15.8395 8.95833 16.875C8.95833 17.9105 8.15618 18.75 7.16667 18.75H1.79167C0.802156 18.75 0 17.9105 0 16.875Z" fill="#EA7E00"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 26.25C0 25.2145 0.802156 24.375 1.79167 24.375H7.16667C8.15618 24.375 8.95833 25.2145 8.95833 26.25C8.95833 27.2855 8.15618 28.125 7.16667 28.125H1.79167C0.802156 28.125 0 27.2855 0 26.25Z" fill="#EA7E00"/>
            </svg>

        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item to="/about">{{ $t('about') }}</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown :text="$t('lang')" right>
                    <b-dropdown-item @click="$parent.changeLang('en')">EN</b-dropdown-item>
                    <b-dropdown-item @click="$parent.changeLang('ru')">RU</b-dropdown-item>
                    <b-dropdown-item @click="$parent.changeLang('de')">DE</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item v-if="!$parent.user" v-b-modal.login>{{ $t('login') }}</b-nav-item>

                <b-nav-item-dropdown v-if="$parent.user" right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em>{{ $parent.user.nickname }}</em>
                    </template>
                    <b-dropdown-item href="#">{{ $t('profile') }}</b-dropdown-item>
                    <b-dropdown-item @click="$parent.logout">{{ $t('quit') }}</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script type="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: "navbar",
        data: () => ({
            enabled: true
        }),
    })
</script>

<style scoped lang="scss">

    .score a {
        color: white !important;
    }
</style>