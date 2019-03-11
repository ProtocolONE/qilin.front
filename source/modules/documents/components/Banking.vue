<template>
<div class="documents-banking">
  <Header level="2">
    {{ $t('title') }}
  </Header>

  <Select
    v-bind="preparedFields.currency"
    :options="preparedCurrencies"
    :hasEmptyValue="true"
    :placeholder="$t('currenciesPlaceholder')"
    @input="change('currency', $event)"
  />
  <TextField
    v-bind="preparedFields.name"
    @input="change('name', $event)"
  />
  <TextField
    v-bind="preparedFields.accountNumber"
    @input="change('accountNumber', $event)"
  />
  <TextField
    v-bind="preparedFields.swift"
    @input="change('swift', $event)"
  />
  <UiTextarea
    v-bind="preparedFields.address"
    :isBordered="true"
    @input="change('address', $event)"
  />
  <UiTextarea
    v-bind="preparedFields.details"
    :isBordered="true"
    @input="change('details', $event)"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapValues } from 'lodash-es';
import { Header, Select, TextField, UiTextarea } from '@protocol-one/ui-kit';
import i18n from './i18nBanking';

export default Vue.extend({
  i18n,
  components: { Header, Select, TextField, UiTextarea },
  props: {
    currencies: {
      default: () => [{ value: 'USD', name: 'United States Dollar' }],
      type: Array,
    },
    fields: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    preparedFields() {
      console.error(this.fields);
      return mapValues(this.fields, (field, key) => ({ ...field, label: this.$i18n.t(key) }));
    },
    preparedCurrencies() {
      return this.currencies.map(({ name, value }) => ({ label: `${value} (${name})`, value }));
    },
  },
  methods: {
    change(fieldName, value) {
      const field = this.fields[fieldName];

      this.$emit('change', {
        ...this.fields,
        [fieldName]: { ...field, value },
      });
    },
  },
});
</script>
