<template>
<div class="game-langs">
  <div class="table">
    <div class="header">
      <span class="title-lang">{{ $t('language') }}</span>
      <span class="type">{{ $t('interface') }}</span>
      <span class="type">{{ $t('voice') }}</span>
      <span class="type">{{ $t('subtitles') }}</span>
    </div>
    <div class="body">
      <div
        v-for="(lang, key) in localLanguages"
        class="lang-row"
        :key="key"
      >
        <span class="lang">{{ $t(`languages.${key}`) }}</span>
        <div class="checkbox">
          <Checkbox
            class="check"
            :checked="lang.interface"
            @change="changeLang(key, 'interface')"
          />
        </div>
        <div class="checkbox">
          <Checkbox
            class="check"
            :checked="lang.voice"
            @change="changeLang(key, 'voice')"
          />
        </div>
        <div class="checkbox">
          <Checkbox
            class="check"
            :checked="lang.subtitles"
            @change="changeLang(key, 'subtitles')"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Checkbox } from '@protocol-one/ui-kit';
import i18n from './i18nSupportedLanguages';

export default Vue.extend({
  i18n,
  components: { Checkbox },
  props: {
    languages: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      localLanguages: this.languages,
    };
  },
  watch: {
    languages(value) {
      this.localLanguages = value;
    },
  },
  methods: {
    changeLang(key: string, type: string) {
      this.localLanguages[key][type] = !this.localLanguages[key][type];
      this.$emit('change', this.localLanguages);
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  color: #b1b1b1;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  margin-bottom: 12px;
  border-bottom: 1px solid #e2e2e2;
}
.title-lang,
.lang {
  display: inline-block;
  flex-basis: 180px;
  min-width: 100px;
}
.type {
  display: inline-block;
  flex-basis: 120px;
  min-width: 80px;
  text-align: center;
}
.lang-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 120px;
  text-align: center;
}
.check {
  height: 20px;
}
</style>
