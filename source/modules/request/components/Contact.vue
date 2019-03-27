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
    :hasError="$isFieldInvalid('authorizedEmail')"
    @input="change('authorized', 'email', $event)"
  />
  <TextField
    v-bind="authorizedFields.phone"
    :errorText="$t('invalidPhone')"
    :hasError="$isFieldInvalid('authorizedPhone')"
    @input="change('authorized', 'phone', $event)"
  />

  <TextField
    v-bind="technicalFields.fullName"
    @input="change('technical', 'fullName', $event)"
  />
  <TextField
    v-bind="technicalFields.email"
    :errorText="$t('invalidEmail')"
    :hasError="$isFieldInvalid('technicalEmail')"
    @input="change('technical', 'email', $event)"
  />
  <TextField
    v-bind="technicalFields.phone"
    :errorText="$t('invalidPhone')"
    :hasError="$isFieldInvalid('technicalPhone')"
    @input="change('technical', 'phone', $event)"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { email, required } from 'vuelidate/lib/validators';
import { capitalize, includes, mapValues } from 'lodash-es';
import { Header, TextField } from '@protocol-one/ui-kit';
import i18n from './i18nContact';

function isPhone(value) {
  const regex = /^[+]{0,1}[0-9]{0,1}[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  return regex.test(value);
}

export default Vue.extend({
  i18n,
  components: { Header, TextField },
  props: {
    fields: {
      default: () => {},
      type: Object,
    },
  },
  validations: {
    authorizedEmail: { email, required },
    authorizedPhone: { isPhone, required },
    technicalEmail: { email },
    technicalPhone: { isPhone },
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

      if (
        includes(['email', 'phone'], fieldName) &&
        (
          this.$isFieldInvalid(`${path}${capitalize(fieldName)}`) ||
          (field.required && value === '')
        )
      ) {
        return;
      }

      this.$emit('change', {
        ...this.fields,
        [path]: {
          ...this.fields[path],
          [fieldName]: { ...field, value },
        },
      });
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
