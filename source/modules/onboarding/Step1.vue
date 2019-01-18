<i18n>
{
    "en": {
        "title": "Welcome to Qilin",
        "descr": "Help us setup your first tenant and start untegration.",
        "step": "STEP 1 OF 2",
        "name-you-choose": "The name you choose here will be used for the internal purposes and some API endpoints of your cliends. Once chosen, a company name cannot be renamed.",
        "region-laws": "We will host all of your data in EU region to comply with EU Data Protection Directive.",
        "region": "Region",
        "next": "Next",
        "name": "Name",
        "name-too-short": "Name is too short",
        "your-company-name": "Your company name"
    },
    "ru": {
        "title": "Welcome to Qilin",
        "descr": "Help us setup your first tenant and start untegration.",
        "step": "STEP 1 OF 2",
        "name-you-choose": "The name you choose here will be used for the internal purposes and some API endpoints of your cliends. Once chosen, a company name cannot be renamed.",
        "region-laws": "We will host all of your data in EU region to comply with EU Data Protection Directive.",
        "region": "Region",
        "next": "Next",
        "name": "Name",
        "name-too-short": "Name is too short",
        "your-company-name": "Your company name"
    }
}
</i18n>

<template>
  <div class="page">
    <vue-headful
      :title="$t('title')"
      :description="$t('descr')"
    />
    <b-row>
      <b-col class="left">
        <div class="center">
          <h1>{{ $t('title') }}</h1>
          <p>{{ $t('descr') }}</p>
          <br>
          <p class="step">
            {{ $t('step') }}
          </p>
        </div>
      </b-col>

      <b-col class="right">
        <div class="center">
          <b-form>
            <div class="company-name">
              <b-form-group
                :label="$t('your-company-name')"
                label-for="company-name"
              >
                <TextField
                    class="new"
                    label="some mega super puper stranger big long text"
                    additionalInfo="some mega super puper stranger big long text"
                    errorText="some mega super puper stranger big long text"
                    :hasError="hasError"
                    @input="input"
                />
                <ValidateInput
                  id="company-name"
                  v-model="form.name"
                  type="text"
                  :validate="(val) => val.length > 2"
                  :placeholder="$t('name')"
                />
              </b-form-group>
              <small class="form-text text-muted">
                {{ $t('name-you-choose') }}
              </small>
            </div>
            <div class="region">
              <label>{{ $t('region') }}</label>
              <small class="form-text text-muted">
                {{ $t('region-laws') }}
              </small>
            </div>
            <b-btn
              class="float-left"
              variant="primary"
              @click="nextStep"
            >
              {{ $t('next') }}
            </b-btn>

            <Button class="button" text="Next" />
            <Checkbox class="checkbox" />
            <SwitchBox class="switch" />
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script type="ts">
import Vue from 'vue';
import $ from 'jquery';
import ValidateInput from '@/components/ValidateInput/ValidateInput.vue';
import TextField from '@/components/TextField.vue';
import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import SwitchBox from '@/components/SwitchBox.vue';

export default Vue.extend({
    name: 'OnBoardingStep1',
    components: { ValidateInput, TextField, Button, Checkbox, SwitchBox },
    data: () => ({
        enabled: true,
        form: {
            name: '',
        },
        hasError: false,
    }),
    mounted() {
        this.$nextTick(() => {
            const h = Math.max($(window).outerHeight() - 180, 400);
            this.$el.style.minHeight = `${h}px`;
        });
    },
    methods: {
        nextStep() {
            if (this.form.name.length < 2) {
                alert(this.$t('name-too-short'));
                return;
            }
            this.$parent.nextStep();
        },
        input(value) {
            if (value === 'invalid') {
                this.hasError = true;
            } else {
                this.hasError = false;
            }
        },
    },
});
</script>

<style scoped lang="scss">
@import '../../layouts/main/consts.scss';

.new {
    margin-bottom: 20px;
}
.button,
.checkbox,
.switch {
    margin-left: 40px;
}

.page {
    position: relative;
    > .row {
        position: absolute;
        height: 100%;
        width: 100%;

        .left {
            position: relative;
            .center {
                @media (min-width: $screen-sm-min) {
                    position: relative;
                    top: calc(50% - 96px);
                    margin-left: 80px;
                }
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

        .right {
            position: relative;
            .center {
                @media (min-width: $screen-sm-min) {
                    position: relative;
                    top: calc(50% - 220px);
                    margin-left: 80px;
                    max-width: 426px;
                }
                .company-name {
                    small {
                        margin-bottom: 74px;
                    }
                }
                .region {
                    small {
                        margin-bottom: 20px;
                    }
                    label {
                        text-transform: uppercase;
                    }
                }
                .btn {
                    padding: 18px 40px;
                }
            }
        }
    }
}
</style>
