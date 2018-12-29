<template>
    <footer class="page-footer font-small">
        <div class="footer-copyright text-right py-3">
            <a href="">Terms of Use</a> <span>|</span> <a href="">Privacy Policy</a> <span>|</span> <a href="">Content Policy</a> <span>|</span> © 2018 - {{ new Date().getFullYear() }} Protocol One Inc.
        </div>
    </footer>
</template>

<script type="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: "Footer",
        data: () => ({
            enabled: true
        }),
    })
</script>

<style scoped lang="scss">
    footer * {
        font-size: 14px;
        color: #B7B7B7;
        span {
            margin: 0 8px;
        }
    }
</style>