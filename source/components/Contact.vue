<template>
<div class="documents-contact">
  <Header level="2">
    {{ $t('title') }}
  </Header>

  <TextField
    v-bind="authorizedFields.fullName"
    @input="change('authorized', 'fullName', $event)"
  />
  <TextField
    v-bind="authorizedFields.position"
    @input="change('authorized', 'position', $event)"
  />
  <TextField
    v-bind="authorizedFields.email"
    :errorText="$t('invalidEmail')"
    :hasError="hasErrors.authorized.email"
    @input="change('authorized', 'email', $event)"
  />
  <TextField
    v-bind="authorizedFields.phone"
    :errorText="$t('invalidPhone')"
    :hasError="hasErrors.authorized.phone"
    @input="change('authorized', 'phone', $event)"
  />

  <TextField
    v-bind="technicalFields.fullName"
    @input="change('technical', 'fullName', $event)"
  />
  <TextField
    v-bind="technicalFields.email"
    :errorText="$t('invalidEmail')"
    :hasError="hasErrors.technical.email"
    @input="change('technical', 'email', $event)"
  />
  <TextField
    v-bind="technicalFields.phone"
    :errorText="$t('invalidPhone')"
    :hasError="hasErrors.technical.phone"
    @input="change('technical', 'phone', $event)"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapValues } from 'lodash-es';
import { Header, TextField } from '@protocol-one/ui-kit';
import i18n from './i18nContact';

export default Vue.extend({
  i18n,
  components: { Header, TextField },
  props: {
    fields: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      hasErrors: {
        authorized: {
          email: false,
          phone: false,
        },
        technical: {
          email: false,
          phone: false,
        },
      }
    };
  },
  computed: {
    authorizedFields() {
      return this.preparedFields('authorized');
    },
    technicalFields() {
      return this.preparedFields('technical');
    },
  },
  methods: {
    change(path, fieldName, value) {
      const field = this.fields[path][fieldName];

      if (fieldName === 'email' || fieldName === 'phone') {
        if (this.isFieldValid(fieldName, value) || (!field.required && value === '')) {
          this.hasErrors[path][fieldName] = false;
        } else {
          this.hasErrors[path][fieldName] = true;

          return;
        }
      }

      this.$emit('change', {
        ...this.fields,
        [path]: {
          ...this.fields[path],
          [fieldName]: { ...field, value },
        },
      });
    },
    isFieldValid(fieldName, value) {
      if (fieldName === 'email') {
        const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,11})$/;
        return regex.test(value);
      }
      if (fieldName === 'phone') {
        const regex = /^[+]{0,1}[0-9]{0,1}[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        return regex.test(value);
      }

      return true;
    },
    preparedFields(path) {
      return mapValues(
        this.fields[path],
        (field, key) => ({ ...field, label: this.$i18n.t(`${path}.${key}`) }),
      );
    },
  },
});
</script>
