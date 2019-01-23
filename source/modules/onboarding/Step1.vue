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
                id="company-name"
                v-model="form.name"
                :label="$t('name')"
                :has-error="hasError"
                :error-text="errorText"
                @input="changeCompanyName"
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
        </b-form>
      </div>
    </b-col>
  </b-row>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import $ from 'jquery';
import { TextField } from 'ui-kit';

export default Vue.extend({
  name: 'OnBoardingStep1',
  components: { TextField },
  data: () => ({
    enabled: true,
    form: {
      name: '',
    },
    hasError: false,
    errorText: '',
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
    changeCompanyName(name) {
      console.error(name);
      if (name.length < 3) {
        this.hasError = true;
        this.errorText = 'Name must be more 2 symbols';
        return;
      }

      this.hasError = false;
      this.errorText = '';

      this.form.name = name;
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/layouts/consts.scss';

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
