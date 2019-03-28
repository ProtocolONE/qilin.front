<template>
<div class="documents">
  <PageHeader>
    <Header
      slot="title"
      level="1"
    >
      {{ $t('title') }}
    </Header>

    <Button
      slot="right"
      :disabled="!isFormComplete || documentsStatus !== 'draft'"
      :text="$t('save')"
      @click="saveDocuments"
    />
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
        <Button @click="submit">
          {{ $t(`status.${documentsStatus}.submit`) }}
        </Button>
      </div>
    </div>
  </FormByStep>

  <UiModal
    v-if="hasModal"
    @close="hasModal = false"
  >
    <Header
      slot="header"
      level="1"
    >
      {{ $t(`modal.${modalType}.title`) }}
    </Header>
    <div
      slot="main"
      class="ui-modal-main"
      v-html="$t(`modal.${modalType}.text`)"
    />
    <div
      slot="footer"
      class="ui-modal-footer"
    >
      <Button @click="hasModal = false">
        {{ $t(`modal.${modalType}.button`) }}
      </Button>
    </div>
  </UiModal>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, includes, reduce } from 'lodash-es';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { Button, FormByStep, Header, PageHeader, UiModal } from '@protocol-one/ui-kit';
import Banking from '@/components/Banking.vue';
import Company from '@/components/Company.vue';
import Contact from '@/components/Contact.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { Banking, Button, Company, Contact, FormByStep, Header, PageHeader, UiModal },
  data() {
    return {
      currentStep: 'company',
      hasModal: false,
      modalType: 'welcome'
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

    const hasWelcomeBoardAlreadySeen = localStorage.getItem('hasWelcomeBoardAlreadySeen');

    if (hasWelcomeBoardAlreadySeen !== 'true' && this.documentsStatus === 'draft') {
      localStorage.setItem('hasWelcomeBoardAlreadySeen', 'true');
      this.modalType = 'welcome';
      this.hasModal = true;
    } else if (hasWelcomeBoardAlreadySeen !== 'true') {
      localStorage.setItem('hasWelcomeBoardAlreadySeen', 'true');
    }
  },
  methods: {
    ...mapActions('Documents', ['initState', 'toDraft', 'toReview', 'save']),
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
    submit() {
      if (this.documentsStatus === 'draft') {
        this.toReview(this.$route.params.vendorId);
      } else if (this.documentsStatus === 'on_review') {
        this.toDraft(this.$route.params.vendorId);
      } else if (this.documentsStatus === 'approved') {
        // @TODO - When we will create contact page, we should add routerlink for it
      }
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
.ui-modal-main {
  color: #b1b1b1;
  max-width: 480px;
}
.ui-modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
