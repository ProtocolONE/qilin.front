<template>
<div class="package">
  <PageHeader
    :breadcrumbs="breadcrumbs"
  >
    <Header
      slot="title"
      level="1"
    >
      {{ $t('title') }}
    </Header>

    <Button
      slot="right"
      :text="$t('save')"
      @click="save"
    />
  </PageHeader>

  <FormByStep
    v-if="packageObj !== null"
    v-model="currentStep"
    class="content"
    :steps="formSteps"
  >
    <KeepAlive>
      <General
        v-if="currentStep === 'general'"
        :value="packageObj"
        @change="updatePackage($event)"
      />
    </KeepAlive>
    <KeepAlive>
      <Media
        v-if="currentStep === 'media'"
        :media="packageObj.media"
        @change="updateMedia($event)"
      />
    </KeepAlive>
    <KeepAlive>
      <Prices
        v-if="currentStep === 'prices'"
        :commercial="packageObj.commercial"
        @change="updatePrices($event)"
        @addCurrency="addCurrency($event)"
        @removeCurrency="removeCurrency($event)"
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
  import Media from './components/Media.vue';
  import Prices from '@/modules/packagePrices/Prices.vue';
  import i18n from './i18n';

  export default Vue.extend({
  i18n,
    components: {General, Button, FormByStep, Header, PageHeader, Media, Prices},
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
          label: this.$t('all_packages'),
          router: true
        },
      ].concat(this.packageObj
        ? [
            {
              label: this.packageObj.name[this.$i18n.locale] || this.packageObj.name.en,
            },
          ]
        : []);
    }
  },
  mounted() {
    this.initState(this.$route.params.resourceId);
  },
  methods: {
    ...mapActions('Package', ['initState', 'save']),
    ...mapMutations('Package', ['updatePackage', 'updateMedia', 'updatePrices', 'removeCurrency', 'addCurrency']),
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
</style>
