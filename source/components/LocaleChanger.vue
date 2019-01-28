<template>
<div class="locale-changer">
  <span class="label">{{ label }}</span>
  <select v-model="locale">
    <option
      v-for="(lang, i) in langs"
      :key="`Lang${i}`"
      :value="lang"
    >
      {{ lang }}
    </option>
  </select>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import get from 'lodash-es/get';
import changeI18nMeta from '@/helpers/changeI18nMeta';

export default Vue.extend({
  data() {
    return {
      locale: this.$i18n.locale,
    }
  },
  watch: {
    locale(val: string) {
      this.$i18n.locale = val;
      changeI18nMeta(`routes.${this.$route.name}.meta`);
    },
  },
  computed: {
    label(): string {
      return get(this.$i18n.t('lang'), 'Language');
    },
    langs(): Array<string> {
      return [ ...Object.keys(this.$i18n.messages) ];
    },
  },
});
</script>

<style lang="scss" scoped>
.label {
  display: block;
  font-size: 12px;
}
</style>
