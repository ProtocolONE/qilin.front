<template>
<div class="request">
  <UiPageHeader :breadcrumbs="breadcrumbs">
    <UiHeader
      slot="title"
      level="1"
    >
      {{ request.company.name }}
    </UiHeader>

    <UiButton
      slot="right"
      :text="$t('printable')"
      @click="printPage"
    />
  </UiPageHeader>

  <div></div>

  <div class="content">
    <Company
      class="step"
      :countries="countries"
      :fields="companyFields"
      @change="changeFields('company', $event)"
    />
    <Contact
      class="step"
      :fields="contactFields"
      @change="changeFields('contact', $event)"
    />
    <Banking
      class="step"
      :currencies="currencies"
      :fields="bankingFields"
      @change="changeFields('banking', $event)"
    />
  </div>

  <UiModal
    v-show="hasModal"
    @close="hasModal = false"
  >
    <UiHeader
      slot="header"
      level="1"
    >
      {{ $t(`modal.${modalType}.title`) }}
    </UiHeader>
    <div
      slot="main"
      class="ui-modal-main"
    >
      <UiTextarea
        :label="$t(`modal.${modalType}.optional`)"
      />
    </div>
    <div
      slot="footer"
      class="ui-modal-footer"
    >
      <UiButton @click="hasModal = false">
        {{ $t(`modal.${modalType}.button`) }}
      </UiButton>
    </div>
  </UiModal>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { get, includes, reduce } from 'lodash-es';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import { UiButton, UiHeader, UiPageHeader, UiModal, UiTextarea } from '@protocol-one/ui-kit';
import Banking from './components/Banking.vue';
import Company from './components/Company.vue';
import Contact from './components/Contact.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { Banking, UiButton, Company, Contact, UiHeader, UiPageHeader, UiModal, UiTextarea },
  data() {
    return {
      hasModal: false,
      modalType: 'changeStatus',
    };
  },
  computed: {
    ...mapState('Request', ['countries', 'currencies', 'request']),

    bankingFields() {
      return this.fields('banking');
    },
    breadcrumbs() {
      return [{ label: this.$i18n.t('allRequests'), url: '/admin/requests' }];
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
    requestStatus() {
      return get(this.request, 'status', 'new');
    },
  },
  mounted() {
    console.error(this.$route);
    this.initState(this.$route.params.vendorId);
  },
  methods: {
    ...mapActions('Request', ['initState', 'changeStatus']),
    ...mapMutations('Request', ['banking', 'company', 'contact']),

    changeFields(type, fields) {
      const preparedFields = type === 'contact'
        ? {
          authorized: this.prepareFields(fields.authorized),
          technical: this.prepareFields(fields.technical),
        } : this.prepareFields(fields);

      this[type](preparedFields);
    },
    confirmNewStatus() {
      this.changeStatus();
    },
    fields(path) {
      return reduce(
        get(this.request, path, {}),
        (preValue, value, key) => ({
          ...preValue,
          [key]: {
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
  }
});
</script>

<style scoped lang="scss">
.request {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
}
.step {
  min-width: 300px;
  flex-basis: 50%;
}
.ui-modal-main {
  max-width: 460px;
}
.ui-modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
