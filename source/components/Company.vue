<template>
<div class="documents-company">
  <Header level="2">
    {{ $t('title') }}
  </Header>

  <TextField
    v-bind="preparedFields.name"
    @input="change('name', $event)"
  />
  <TextField
    v-bind="preparedFields.alternativeName"
    @input="change('alternativeName', $event)"
  />
  <TextField
    v-if="preparedFields.website"
    v-bind="preparedFields.website"
    @input="change('website', $event)"
  />
  <Select
    v-bind="preparedFields.country"
    :options="preparedCountries"
    :hasEmptyValue="true"
    :placeholder="$t('countriesPlaceholder')"
    @input="change('country', $event)"
  />
  <TextField
    v-bind="preparedFields.region"
    @input="change('region', $event)"
  />
  <TextField
    v-bind="preparedFields.zip"
    @input="change('zip', $event)"
  />
  <TextField
    v-bind="preparedFields.city"
    @input="change('city', $event)"
  />
  <TextField
    v-bind="preparedFields.address"
    @input="change('address', $event)"
  />
  <TextField
    v-bind="preparedFields.additionalAddress"
    @input="change('additionalAddress', $event)"
  />
  <TextField
    v-bind="preparedFields.registrationNumber"
    @input="change('registrationNumber', $event)"
  />
  <TextField
    v-bind="preparedFields.taxId"
    @input="change('taxId', $event)"
  />
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import {mapValues} from 'lodash-es';
  import {Header, Select, TextField} from '@protocol-one/ui-kit';
  import i18n from './i18nCompany';

  export default Vue.extend({
  i18n,
  components: { Header, Select, TextField },
  props: {
    countries: {
      default: () => [],
      type: Array,
    },
    fields: {
      default: () => ({}),
      type: Object,
    },
  },
  computed: {
    preparedFields() {
      return mapValues(this.fields, (field, key) => ({ ...field, label: this.$i18n.t(key) }));
    },
    preparedCountries() {
      return this.countries.map(({ name }) => ({ label: name, value: name }));
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
