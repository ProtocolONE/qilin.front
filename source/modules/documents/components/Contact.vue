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
    @input="change('authorized', 'email', $event)"
  />
  <TextField
    v-bind="authorizedFields.phone"
    @input="change('authorized', 'phone', $event)"
  />

  <TextField
    v-bind="technicalFields.fullName"
    @input="change('technical', 'fullName', $event)"
  />
  <TextField
    v-bind="technicalFields.email"
    @input="change('technical', 'email', $event)"
  />
  <TextField
    v-bind="technicalFields.phone"
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
      default: () => {},
      type: Object,
    },
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
