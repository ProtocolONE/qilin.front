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
      v-if="isFormComplete"
      slot="right"
      :text="$t('submit')"
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
        :fields="companyFields"
        @change="changeFields('company', $event)"
      />
      <Contacts
        v-if="currentStep === 'contacts'"
        :fields="contactsFields"
        @change="changeFields('contacts', $event)"
      />
      <Banking
        v-if="currentStep === 'banking'"
        :fields="bankingFields"
        @change="changeFields('banking', $event)"
      />
    </KeepAlive>
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
import Contacts from './components/Contacts.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { Banking, Button, Company, Contacts, FormByStep, Header, PageHeader },
  data() {
    return {
      currentStep: 'company',
    };
  },
  computed: {
    ...mapState('Documents', ['documents', 'requiredFields']),
    ...mapGetters('Documents', ['disabled', 'steps']),

    bankingFields() {
      return this.fields('banking');
    },

    companyFields() {
      return this.fields('company');
    },

    contactsFields() {
      return {
        authorized: this.fields('contacts.authorized'),
        technical: this.fields('contacts.technical'),
      };
    },

    formSteps() {
      return this.steps.map(step => ({
        value: step,
        label: this.$i18n.t(step),
        status: 'initial',
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
    ...mapMutations('Documents', ['banking', 'company', 'contacts']),

    changeFields(step, fields) {
      const preparedFields = step === 'contacts'
        ? {
          authorized: this.prepareFields(fields.authorized),
          technical: this.prepareFields(fields.technical),
        } : this.prepareFields(fields);

      this[step](preparedFields);
    },

    fields(path) {
      console.error(this.documents);
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
    }
  }
})
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
</style>
