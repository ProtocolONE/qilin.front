<i18n>
{
  "en": {
    "title": "Tell us more",
    "descr": "These question will help us better tailor you Qilin experience to fit your needs",
    "step": "STEP 2 OF 2",
    "how-many-products": "Please tell us how many digital products your company will work with.",
    "products": "Products",
    "create-account": "Create account"
  },
  "ru": {
    "title": "Tell us more",
    "descr": "These question will help us better tailor you Qilin experience to fit your needs",
    "step": "STEP 2 OF 2",
    "how-many-products": "Please tell us how many digital products your company will work with.",
    "products": "Products",
    "create-account": "Create account"
  }
}
</i18n>

<template>
<div class="page">
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
          <div class="how-many-products">
            <b-form-group
              :label="$t('products')"
              label-for="how-many-products"
            >
              <select
                id="how-many-products"
                v-model="form.howManyProds"
                class="form-control"
              >
                <option value="1-10">
                  1 - 10
                </option>
                <option value="10-50">
                  10 - 50
                </option>
                <option value="50-200">
                  50 - 200
                </option>
                <option value="200-500">
                  200 - 500
                </option>
                <option value="500-1000">
                  500 - 1000
                </option>
                <option value="+1000">
                  > 1000
                </option>
              </select>
            </b-form-group>
            <small class="form-text text-muted">
              {{ $t('how-many-products') }}
            </small>
          </div>
          <b-btn
            class="float-left"
            variant="primary"
            @click="$emit('createVendor', form.howManyProds)"
          >
            {{ $t('create-account') }}
          </b-btn>
        </b-form>
      </div>
    </b-col>
  </b-row>
</div>
</template>

<script type="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'OnBoardingStep2',
  data: () => ({
    form: {
      howManyProds: '1-10',
    },
  }),
});
</script>

<style scoped lang="scss">
@import '@/layouts/consts.scss';

.page {
  position: relative;
  min-height: 100vh;

  > .row {
    position: absolute;
    height: 100%;
    width: 100%;

    .left {
      position: relative;
      background-color: black;
      .center {
        @media (min-width: $screen-sm-min) {
          position: relative;
          top: calc(50% - 96px);
          margin-left: 80px;
        }
        h1 {
          font-size: 48px;
          color: white;
        }
        p {
          font-size: 20px;
          color: white;
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
        .how-many-products {
          small {
            margin-bottom: 74px;
          }
          select {
            box-sizing: content-box;
            width: 260px;
            padding: 7px 25px;
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
