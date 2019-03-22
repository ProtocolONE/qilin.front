<template>
<div class="request">
  <UiPageHeader
    class="request-header"
    :breadcrumbs="breadcrumbs"
  >
    <UiHeader
      slot="title"
      level="1"
    >
      {{ companyName }}
    </UiHeader>

    <UiButton
      slot="right"
      :text="$t('printable')"
      @click="printPage"
    />
  </UiPageHeader>

  <div class="events">
    <UiSelect
      :label="$t('status.title')"
      :options="statusOptions"
      :value="requestStatus"
      @input="showModalStatusChange"
    />
  </div>

  <div class="content">
    <div class="content-box">
      <Company
        class="step"
        :countries="countries"
        :fields="companyFields"
        @change="changeFields('company', $event)"
      />
    </div>

    <div class="content-box">
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
        v-model="changeStatusMessage"
        :label="$t(`modal.${modalType}.optional`)"
      />
    </div>
    <div
      slot="footer"
      class="ui-modal-footer"
    >
      <UiButton @click="confirmNewStatus">
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
import { Printd } from 'printd';
import {
  UiButton,
  UiHeader,
  UiPageHeader,
  UiModal,
  UiSelect,
  UiTextarea,
} from '@protocol-one/ui-kit';
import Banking from './components/Banking.vue';
import Company from './components/Company.vue';
import Contact from './components/Contact.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: {
    Banking,
    UiButton,
    Company,
    Contact,
    UiHeader,
    UiPageHeader,
    UiModal,
    UiSelect,
    UiTextarea,
  },
  data() {
    return {
      changeStatusMessage: '',
      hasModal: false,
      newStatus: '',
      modalType: 'changeStatus',
      printd: null,
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
    companyName() {
      return get(this.request, 'company.name', 'Company');
    },
    contactFields() {
      return {
        authorized: this.fields('contact.authorized'),
        technical: this.fields('contact.technical'),
      };
    },
    statusOptions() {
      const statuses = ['new', 'checking', 'ok', 'returned', 'archive'];

      return statuses.map(status => ({ value: status, label: this.$i18n.t(`status.${status}`) }));
    },
    requestStatus() {
      return get(this.request, 'status', 'new');
    },
  },
  mounted() {
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
      this.changeStatus({ status: this.newStatus, message: this.changeStatusMessage });
      
      this.hasModal = false;
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
    printPage() {
      window.print();
    },
    showModalStatusChange(newStatus) {
      this.newStatus = newStatus;
      this.hasModal = true;
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
.request-header {
  @media print {
    display: none;
  }
}
.events {
  max-width: 320px;
  padding: 0 32px;
  margin-top: 16px;
}
.content {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0 32px;
  justify-content: space-between;
  align-items: flex-start;
}
.content-box {
  min-width: 300px;
  flex-basis: calc(50% - 16px);
}
.ui-modal-main {
  max-width: 460px;
}
.ui-modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
