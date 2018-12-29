<i18n>
{
    "en": {
        "title": "Welcome to Qilin",
        "descr": "Header home descr"
    },
    "ru": {
        "title": "Welcome to Qilin",
        "descr": "Мета описание"
    }
}
</i18n>

<template>
    <div class="page">
        <vue-headful :title="$t('title')" :description="$t('descr')"/>
        <b-row>
            <b-col class="left">
                <div class="center">
                    <h1>Welcome to Qilin</h1>
                    <p>Help us setup your first tenant and start untegration.</p>
                    <br>
                    <p class="step">STEP 1 OF 2</p>
                </div>
            </b-col>

            <b-col class="right">
                <div class="center">
                    <b-form>
                        <div class="company-name">
                            <b-form-group label="Your company name" label-for="company-name">
                                <ValidateInput  id="company-name"
                                                type="text"
                                                v-model="form.name"
                                                :validate="(val) => val.length > 2"
                                                placeholder="name">
                                </ValidateInput>
                            </b-form-group>
                            <small class="form-text text-muted">
                                The name you choose here will be used for the internal purposes and some API endpoints of your cliends. Once chosen, a company name cannot be renamed.
                            </small>
                        </div>
                        <div class="region">
                            <label>Region</label>
                            <small class="form-text text-muted">
                                We will host all of your data in EU rehion to comply with EU Data Protection Directive.
                            </small>
                        </div>
                        <b-btn class="float-left" variant="primary">Next</b-btn>
                    </b-form>
                </div>

            </b-col>
        </b-row>
    </div>
</template>

<script type="ts">
    import Vue from 'vue'
    import $ from 'jquery'
    import ValidateInput from '../../components/ValidateInput/ValidateInput.vue'

    export default Vue.extend({
        components: {ValidateInput},
        name: "OnBoarding",
        data: () => ({
            enabled: true,
            form: {
                name: '',
            }
        }),
        mounted(){
            this.$nextTick(() => {
                const h = Math.max($(window).outerHeight() - 200, 400);
                this.$el.style.minHeight = h + 'px';
            });
        },
    })
</script>

<style scoped lang="scss">
    .page {
        position: relative;
        > .row {
            position: absolute;
            height: 100%;
            width: 100%;
            .right {
                .center {
                    max-width: 426px;
                    .company-name {
                        small {
                            margin-bottom: 74px;
                        }
                    }
                    .region {
                        small {
                            margin-bottom: 20px;
                        }
                    }
                    .btn {
                        padding: 18px 40px;
                    }
                }
            }
            .left {
                .center {
                    position: relative;
                    top: calc(50% - 50px);
                    left: 50px;
                    h1 {
                        font-size: 48px;
                    }
                    p {
                        font-size: 20px;
                        color: #757575;
                    }
                    p.step {
                        font-size: 16px;
                    }
                }
            }
        }
    }

</style>

<style lang="scss">
    .company-name {
        input {
            box-sizing: content-box;
            width: 260px;
            padding: 7px 12px;
        }
        label {
            margin-bottom: 20px;
        }
    }
</style>