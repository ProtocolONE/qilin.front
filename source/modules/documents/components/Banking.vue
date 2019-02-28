<template>
<div class="documents-banking">
  <Header level="2">
    {{ $t('title') }}
  </Header>

  <TextField
    v-bind="preparedFields.name"
    @input="change('name', $event)"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapValues } from 'lodash-es';
import { Header, Select, TextField } from '@protocol-one/ui-kit';
import i18n from './i18nBanking';

export default Vue.extend({
  i18n,
  components: { Header, Select, TextField },
  props: {
    fields: {
      default: () => {},
      type: Object,
    },
  },
  computed: {
    preparedFields() {
      return mapValues(this.fields, (field, key) => ({ ...field, label: this.$i18n.t(key) }));
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
})
</script>

<style scoped lang="scss">
</style>
