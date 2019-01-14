<template>
    <div>
        <Step1 v-show="step == 1" ref="step1"></Step1>
        <Step2 v-show="step == 2" ref="step2"></Step2>
    </div>
</template>

<script type="ts">
    import Vue from 'vue'
    import axios from 'axios'
    import Step1 from './Step1.vue'
    import Step2 from './Step2.vue'

    export default Vue.extend({
        components: {Step1, Step2},
        name: "OnBoarding",
        data: () => ({
            step: 1,
        }),
        methods: {
            nextStep(){
                this.step += 1;
            },
            createAccount(){
                const domain = this.$refs.step1.form.name.toLowerCase().replace(' ', '').replace(/^\d+/, '');
                axios.post('/api/v1/vendors', {
                    name: this.$refs.step1.form.name,
                    domain3: domain,
                    email: domain + '@protocol.one',
                    howManyProducts: this.$refs.step2.form.howManyProds,
                }).then(res => {
                    window.location.href = '/vendor/games';
                })
                    .catch(err => alert(err.response.data.message))
            }
        },
        mounted(){},
    })
</script>

<style scoped lang="scss">

</style>
<style lang="scss">

</style>