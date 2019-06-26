<template>
<div class="package">
  <UiPageHeader
    :breadcrumbs="breadcrumbs"
  >
    <UiHeader
      slot="title"
      level="1"
    >
      {{ $t('title') }}
    </UiHeader>

    <div slot="right">
      <a v-show="currentStep === 'prices'" href="#" class="package-prices-details" @click.prevent="togglePackagePricesDetails">
        <Icon
          :name="(!$route.query.details || $route.query.details === 'true') ? 'eye-slash' : 'eye'"
          width="16"
          height="16"
          fill="rgba(51, 51, 51, 0.5)"
          class="package-prices-details_icon"
        />
        <span class="package-prices-details_label">
          {{ $t((!$route.query.details || $route.query.details === 'true') ? 'hideDetails' : 'showDetails') }}
        </span>
      </a>
      <UiButton
        :text="$t('save')"
        @click="save"
      />
    </div>
  </UiPageHeader>

  <FormByStep
    v-if="packageObj !== null"
    v-model="currentStep"
    class="content"
    :steps="formSteps"
  >
    <KeepAlive>
      <General
        v-if="currentStep === 'general'"
        :pkg="packageObj"
        @change="updatePackage($event)"
      />
      <Media
        v-if="currentStep === 'media'"
        :media="packageObj.media"
        @change="updateMedia($event)"
      />
      <Prices
        v-if="currentStep === 'prices'"
        :commercial="packageObj.commercial"
        @change="updatePrices($event)"
        @addCurrency="addCurrency($event)"
        @removeCurrency="removeCurrency($event)"
      />
      <Discount
        v-if="currentStep === 'discount'"
        :discount="packageObj.discountPolicy"
        @change="updateDiscount($event)"
      />
    </KeepAlive>
    <KeepAlive>
      <Regional
        v-if="currentStep === 'regional'"
        :region="packageObj.regionalRestrinctions"
        @change="updateRegional($event)"
      />
    </KeepAlive>
  </FormByStep>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
import {FormByStep, UiButton, UiHeader, UiPageHeader} from '@protocol-one/ui-kit';
import General from './components/General.vue';
import Media from './components/Media.vue';
import Discount from './components/Discount.vue';
import Regional from './components/Regional.vue';
import Prices from '@/modules/packagePrices/Prices.vue';
import Icon from '@/icons';
import i18n from './i18n';

export default Vue.extend({
  i18n,

  components: {
    General,
    UiButton,
    FormByStep,
    UiHeader,
    UiPageHeader,
    Media,
    Prices,
    Icon,
    Discount,
    Regional,
  },

  data: () => ({
      currentStep: 'general',
  }),

  computed: {
    ...mapState('Package', ['packageObj']),
    ...mapGetters('Package', ['steps']),

    formSteps() {
      return this.steps.map(step => ({
        value: step,
        label: this.$i18n.t(`tabs.${step}`),
      }));
    },
    breadcrumbs () {
      return [
        {
          url: '/packages',
          label: this.$t('allPackages'),
          router: true
        },
        ...(
          this.packageObj ?
            [{ label: this.packageObj.name[this.$i18n.locale] || this.packageObj.name.en }] :
            []
        )
      ];
    }
  },

  mounted() {
    this.initState(this.$route.params.resourceId);
  },

  methods: {
    ...mapActions('Package', ['initState', 'save']),
    ...mapMutations('Package', [
      'updatePackage',
      'updateMedia',
      'updatePrices',
      'removeCurrency',
      'addCurrency',
      'updateDiscount',
      'updateRegional',
    ]),
    togglePackagePricesDetails () {
      let details;
      if (!this.$route.query.details || this.$route.query.details === 'true') {
        details = 'false'
      }
      else {
        details = 'true'
      }
      this.$router.replace({
        ...this.$route,
        query: { ...this.$route.query, details }
      })
    }
  }
});
</script>

<style scoped lang="scss">
.package {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex-grow: 1;
}
.general {
  max-width: 600px;
}
.submit-box {
  margin-top: 20px;
  text-align: center;
}
.ui-modal-main {
  color: #b1b1b1;
  max-width: 480px;
}
.ui-modal-footer {
  display: flex;
  justify-content: flex-end;
}
.package-prices-details {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0;
  margin-right: 16px;

  &_icon {
    margin-right: 8px;
  }
}
</style>
