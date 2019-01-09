<template>
    <div>
        <input  v-bind="{ id, type, placeholder }"
                class="form-control"
                v-model="inputVal"
                @change="change"
                @keydown="change"
                required/>
        <span v-show="is_valid">
<svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.663 3.77342C12.8902 2.98352 10.9096 2.78783 9.01657 3.21555C7.12351 3.64326 5.41942 4.67145 4.15845 6.14678C2.89749 7.62211 2.14721 9.46552 2.01951 11.4021C1.89181 13.3387 2.39354 15.2646 3.44987 16.8928C4.50619 18.5209 6.06051 19.764 7.88102 20.4365C9.70153 21.1091 11.6907 21.1752 13.5518 20.6249C15.413 20.0746 17.0464 18.9375 18.2084 17.3831C19.3705 15.8286 19.9989 13.9402 20 11.9994V11.08C20 10.5277 20.4477 10.08 21 10.08C21.5523 10.08 22 10.5277 22 11.08V12C21.9986 14.3721 21.2306 16.6807 19.8103 18.5806C18.39 20.4804 16.3936 21.8703 14.1189 22.5428C11.8442 23.2154 9.41299 23.1346 7.18792 22.3126C4.96285 21.4906 3.06312 19.9713 1.77206 17.9813C0.480993 15.9914 -0.13223 13.6374 0.0238445 11.2705C0.179919 8.90358 1.09693 6.65052 2.63811 4.84734C4.17929 3.04416 6.26206 1.78748 8.57581 1.26472C10.8896 0.74196 13.3103 0.981129 15.477 1.94656C15.9815 2.17134 16.2082 2.76252 15.9834 3.26699C15.7587 3.77146 15.1675 3.9982 14.663 3.77342Z" fill="#4FA662"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.7068 3.29254C22.0975 3.68287 22.0978 4.31603 21.7075 4.70675L11.7075 14.7168C11.52 14.9044 11.2656 15.0099 11.0002 15.01C10.7349 15.0101 10.4805 14.9047 10.2929 14.7171L7.29289 11.7171C6.90237 11.3266 6.90237 10.6934 7.29289 10.3029C7.68342 9.91237 8.31658 9.91237 8.70711 10.3029L10.9996 12.5954L20.2925 3.29325C20.6829 2.90253 21.316 2.90221 21.7068 3.29254Z" fill="#4FA662"/>
</svg>
        </span>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: ['value', 'id', 'type', 'placeholder', 'validate'],
        name: 'ValidateInput',
        data: () => ({
            inputVal: '',
            is_valid: false,
        }),
        watch: {
            inputVal(val: string) {
                this.$emit('input', val);
            }
        },
        methods: {
            change(event: any) {
                this.$nextTick(() =>
                    this.is_valid = this.validate(event.target.value));
            }
        }
    })
</script>

<style scoped lang="scss">
    input {
        width: calc(100% - 40px);
        display: inline-block;
        margin-right: 8px;
    }
</style>