<i18n>
{
    "en": {
        "title": "Home",
        "descr": "Header home descr"
    },
    "ru": {
        "title": "Начало",
        "descr": "Мета описание"
    }
}
</i18n>

<template>
    <div>
        <h1>{{ $t('title') }}</h1>
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

</style>