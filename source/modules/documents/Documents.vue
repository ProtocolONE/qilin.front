<template>
<div class="documents">
  <PageHeader>
    <Header
      slot="title"
      level="1"
    >
      {{ $t('title') }}
    </Header>
  </PageHeader>

  <FormByStep
    v-model="currentStep"
    class="content"
    :steps="formSteps"
  >
    <KeepAlive>
      <Company
        v-if="currentStep === 'company'"
        class="main"
        :countries="countries"
        :fields="companyFields"
        @change="changeFields('company', $event)"
      />
      <Contact
        v-if="currentStep === 'contact'"
        class="main"
        :fields="contactFields"
        @change="changeFields('contact', $event)"
      />
      <Banking
        v-if="currentStep === 'banking'"
        class="main"
        :currencies="currencies"
        :fields="bankingFields"
        @change="changeFields('banking', $event)"
      />
    </KeepAlive>

    <div slot="side-footer" v-if="isFormComplete">
      {{ $t(`status.${documentsStatus}.title`) }}
      <div class="submit-box">
        <Button
          :text="$t(`status.${documentsStatus}.submit`)"
          @click="saveDocuments"
        />
      </div>
    </div>
  </FormByStep>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, includes, reduce } from 'lodash-es';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { Button, FormByStep, Header, PageHeader } from '@protocol-one/ui-kit';
import Banking from './components/Banking.vue';
import Company from './components/Company.vue';
import Contact from './components/Contact.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { Banking, Button, Company, Contact, FormByStep, Header, PageHeader },
  data() {
    return {
      currentStep: 'company',
    };
  },
  computed: {
    ...mapState('Documents', ['countries', 'currencies', 'documents', 'requiredFields']),
    ...mapGetters('Documents', [
      'disabled',
      'steps',
      'isStepFieldsEmpty',
      'isStepRequiredFieldsFilled',
    ]),

    documentsStatus() {
      return get(this.documents, 'status', 'draft');
    },
    bankingFields() {
      return this.fields('banking');
    },
    companyFields() {
      return this.fields('company');
    },
    contactFields() {
      return {
        authorized: this.fields('contact.authorized'),
        technical: this.fields('contact.technical'),
      };
    },
    formSteps() {
      return this.steps.map(step => ({
        value: step,
        label: this.$i18n.t(step),
        status: this.stepStatus(step),
      }));
    },
    isFormComplete() {
      return !this.formSteps.filter(item => item.status !== 'complete').length;
    },
  },
  mounted() {
    this.initState(this.$route.params.vendorId);
  },
  methods: {
    ...mapActions('Documents', ['save', 'initState']),
    ...mapMutations('Documents', ['banking', 'company', 'contact']),

    changeFields(step, fields) {
      const preparedFields = step === 'contact'
        ? {
          authorized: this.prepareFields(fields.authorized),
          technical: this.prepareFields(fields.technical),
        } : this.prepareFields(fields);

      this[step](preparedFields);
    },
    fields(path) {
      return reduce(
        get(this.documents, path, {}),
        (preValue, value, key) => ({
          ...preValue,
          [key]: {
            disabled: this.disabled,
            required: includes(get(this.requiredFields, path, []), key),
            value,
          },
        }),
        {},
      );
    },
    prepareFields(fields) {
      return reduce(fields, (preFields, field, key) => ({
        ...preFields,
        [key]: field.value,
      }), {});
    },
    saveDocuments() {
      this.save(this.$route.params.vendorId);
    },
    stepStatus(step) {
      return this.isStepFieldsEmpty(step)
        ? 'initial'
        : this.isStepRequiredFieldsFilled(step) ? 'complete' : 'incomplete';
    },
  }
});
</script>

<style scoped lang="scss">
.documents {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex-grow: 1;
}
.main {
  max-width: 600px;
}
.submit-box {
  margin-top: 20px;
  text-align: center;
}
</style>
