<template>
<div class="bundle">
  <PageHeader
    :breadcrumbs="breadcrumbs"
  >
    <Header
      slot="title"
      level="1"
    >
      {{ $t('title') }}
    </Header>

    <div slot="right">
      <Button
        :text="$t('save')"
        @click="save"
      />
    </div>
  </PageHeader>

  <FormByStep
    v-if="bundle !== null"
    v-model="currentStep"
    class="content"
    :steps="formSteps"
  >
    <KeepAlive>
      <General
        v-if="currentStep === 'general'"
        :bundle="bundle"
        @change="updateBundle($event)"
      />
    </KeepAlive>
    <KeepAlive>
      <Discount
        v-if="currentStep === 'discount'"
        :discount="bundle.discountPolicy"
        @change="updateDiscount($event)"
      />
    </KeepAlive>
    <KeepAlive>
      <Regional
        v-if="currentStep === 'regional'"
        :region="bundle.regionalRestrinctions"
        @change="updateRegional($event)"
      />
    </KeepAlive>
  </FormByStep>
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import {mapActions, mapGetters, mapMutations, mapState} from 'vuex';
  import {Button, FormByStep, Header, PageHeader} from '@protocol-one/ui-kit';
  import General from './components/General.vue';
  import Discount from './components/Discount.vue';
  import Regional from './components/Regional.vue';
  import i18n from './i18n';

  export default Vue.extend({
  i18n,

  components: {
    General,
    Button,
    FormByStep,
    Header,
    PageHeader,
    Discount,
    Regional,
  },

  data: () => ({
      currentStep: 'general',
  }),

  computed: {
    ...mapState('Bundle', ['bundle']),
    ...mapGetters('Bundle', ['steps']),

    formSteps() {
      return this.steps.map(step => ({
        value: step,
        label: this.$i18n.t(`tabs.${step}`),
      }));
    },
    breadcrumbs() {
      return [
        {
          url: '/bundles',
          label: this.$t('allBundles'),
          router: true
        },
        ...(
          this.bundle ?
            [{ label: this.bundle.name[this.$i18n.locale] || this.bundle.name.en }] :
            []
        )
      ];
    }
  },

  mounted() {
    this.initState(this.$route.params.resourceId);
  },

  methods: {
    ...mapActions('Bundle', ['initState', 'save']),
    ...mapMutations('Bundle', [
      'updateBundle',
      'updateDiscount',
      'updateRegional',
    ]),
  }
});
</script>

<style scoped lang="scss">
.bundle {
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
.bundle-prices-details {
  display: inline-flex;
  align-items: center;
  margin-bottom: 0;
  margin-right: 16px;

  &__icon {
    margin-right: 8px;
  }
}
</style>
