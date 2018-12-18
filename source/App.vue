<template>
    <div>
        <h1>{{ name }}</h1>
        <button @click="login">Login</button>
    </div>
</template>

<script lang="ts">
    export default {
        data: () => ({
            name: "QILIN-9",
        }),
        methods: {
            login: function() {
                this.name = '....';
            }
        }
    }
</script>

<style scoped lang="scss">

    h1 {
        color: red;
        font-weight: bold;
    }

</style>