<template>
    <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#" to="/">
            Qilin
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item to="/about">About</b-nav-item>
                <b-nav-item @click="$parent.cart += 1">Test + 1</b-nav-item>
                <b-nav-item disabled class="score">{{ $parent.cart }}</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">DE</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item v-if="!$parent.user" v-b-modal.login>Login</b-nav-item>

                <b-nav-item-dropdown v-if="$parent.user" right>
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item @click="$parent.logout">Signout</b-dropdown-item>
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