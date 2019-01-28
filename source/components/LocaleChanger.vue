<template>
<div class="locale-changer">
  <span class="label">
    {{ label }}
  </span>
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
import changeI18nMeta from '@/helpers/changeI18nMeta';

export default Vue.extend({
  data() {
    return {
      locale: this.$i18n.locale,
    };
  },
  computed: {
    /**
     * Label for localeChanger
     * @return {string}
     */
    label(): string {
      return this.$i18n.t('lang');
    },
    /**
     * Langs array for localeChanger
     * @return {Array<string>}
     */
    langs(): Array<string> {
      return [...Object.keys(this.$i18n.messages)];
    },
  },
  watch: {
    locale(val: string) {
      this.$i18n.locale = val;
      // Change i18n meta data by rout
      changeI18nMeta(`routes.${this.$route.name}.meta`);
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
