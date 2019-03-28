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
    <div
      v-if="formatUpdatedDate"
      class="date"
    >
      {{ formatUpdatedDate }}
    </div>
    <UiSelect
      class="select"
      :label="$t('status.title')"
      :options="statusOptions"
      :value="requestStatus"
      @input="showModalStatusChange"
    />
    <div
      v-clickaway="hideTip"
      class="dots"
    >
      <IconSimpleDots @click.native="toggleTipVisible" />
      <UiTip
        :visible="isTipVisible"
        :withoutPadding="true"
      >
        <RouterLink
          :to="{ name: 'history', params: { id: vendorId }}"
          class="event-item"
        >
          {{ $t('showHistory') }}
        </RouterLink>
        <div
          @click="openMessageModal"
          class="event-item"
        >
          {{ $t('sendMessage') }}
        </div>
      </UiTip>
    </div>
  </div>

  <div
    v-if="request"
    class="content"
  >
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
      <UiTextField
        v-if="modalType === 'sendMessage'"
        class="title-message"
        v-model="titleMessage"
        :label="$t(`modal.${modalType}.titleMessage`)"
      />
      <UiTextarea
        v-model="message"
        :label="$t(`modal.${modalType}.optional`)"
      />
    </div>
    <div
      slot="footer"
      class="ui-modal-footer"
    >
      <UiButton @click="sendHandler">
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
import {
  UiButton,
  UiHeader,
  UiModal,
  UiPageHeader,
  UiSelect,
  UiTextarea,
  UiTextField,
  UiTip,
} from '@protocol-one/ui-kit';
import formatDate from '@/helpers/formatDate';
import IconSimpleDots from '@/components/IconSimpleDots.vue';
import Banking from '@/components/Banking.vue';
import Company from '@/components/Company.vue';
import Contact from '@/components/Contact.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: {
    Banking,
    Company,
    Contact,
    IconSimpleDots,
    UiButton,
    UiHeader,
    UiModal,
    UiPageHeader,
    UiSelect,
    UiTextarea,
    UiTextField,
    UiTip,
  },
  data() {
    return {
      titleMessage: '',
      message: '',
      hasModal: false,
      isTipVisible: false,
      modalType: 'changeStatus',
      newStatus: '',
    };
  },
  computed: {
    ...mapState('Request', ['countries', 'currencies', 'request', 'updatedAt', 'vendorId']),

    formatUpdatedDate() {
      return this.updatedAt
        ? formatDate(
          new Date(this.updatedAt),
          'dd LLLL yyyy, HH:mm',
          this.$i18n.locale,
          this.$i18n.fallbackLocale
        )
        : null;
    },

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
      return get(this.request, 'company.name', 'Company') || 'Company';
    },
    contactFields() {
      return {
        authorized: this.fields('contact.authorized'),
        technical: this.fields('contact.technical'),
      };
    },
    statusOptions() {
      const statuses = ['new', 'checking', 'approved', 'returned', 'archive'];

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
    ...mapActions('Request', ['initState', 'changeStatus', 'sendMessage']),
    ...mapMutations('Request', ['banking', 'company', 'contact']),

    changeFields(type, fields) {
      const preparedFields = type === 'contact'
        ? {
          authorized: this.prepareFields(fields.authorized),
          technical: this.prepareFields(fields.technical),
        } : this.prepareFields(fields);

      this[type](preparedFields);
    },
    sendHandler() {
      if (this.modalType === 'changeStatus') {
        this.changeStatus({ status: this.newStatus, message: this.message });
      } else {
        this.sendMessage({ title: this.titleMessage, message: this.message });
      }

      this.hasModal = false;
    },
    fields(path) {
      return reduce(
        get(this.request, path, {}),
        (preValue, value, key) => ({
          ...preValue,
          [key]: {
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
    openMessageModal() {
      this.modalType = 'sendMessage';
      this.hasModal = true;
    },
    showModalStatusChange(newStatus) {
      this.newStatus = newStatus;
      this.modalType = 'changeStatus';
      this.hasModal = true;
    },
    toggleTipVisible() {
      this.isTipVisible = !this.isTipVisible;
    },
    hideTip() {
      this.isTipVisible = false;
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
  max-width: 520px;
  padding: 0 32px;
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.date {
  font-size: 16px;
  color: #0c2441;
  margin-right: 32px;
}
.select {
  flex-basis: 160px;
  margin-right: 32px;
}
.dots {
  position: relative;
  width: 20px;
  cursor: pointer;
}
.event-item {
  font-size: 16px;
  color: #999;
  line-height: 40px;
  display: block;
  padding: 0;
  background-color: #fff;
  text-decoration: none;
  min-width: 200px;
  padding: 0 24px;

  &:hover {
    background-color: rgba(#2f6ecd, 0.2);
  }
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
.step {
  margin-bottom: 54px;
}
.title-message {
  margin-bottom: 16px;
}
.ui-modal-main {
  max-width: 460px;
}
.ui-modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
