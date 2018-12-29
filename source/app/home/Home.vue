<i18n>
{
    "en": {
        "title": "Protocol One Qilin",
        "descr": "Header home descr"
    },
    "ru": {
        "title": "Protocol One Qilin",
        "descr": "Мета описание"
    }
}
</i18n>

<template>
    <div>
        <vue-headful :title="$t('title')" :description="$t('descr')"/>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: "Home",
        data: () => ({
            test: 1
        })
    })
</script>

<style scoped lang="scss">
    div {
        min-height: 400px;
    }
</style>