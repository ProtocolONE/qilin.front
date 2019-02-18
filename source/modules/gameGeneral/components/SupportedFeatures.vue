<template>
<div class="game-features">
  <span class="features-title">{{ $t('titles.numberOfPlayers') }}</span>
  <div class="box">
    <label
      v-for="(value, key) in listNumbers"
      class="checkbox"
      :key="key"
    >
      <Checkbox
        class="check"
        :checked="value"
        @change="changeFeatures('numbers', key)"
      />
      <span class="label">
        {{ $t(`numbers.${key}`) }}
      </span>
    </label>
  </div>

  <span class="features-title">{{ $t('titles.platformFeatures') }}</span>
  <div class="box">
    <label
      v-for="(feature, key) in listFeatures"
      class="checkbox"
      :key="key"
    >
      <Checkbox
        class="check"
        :checked="feature"
        @change="changeFeatures('features', key)"
      />
      <span class="label">
        {{ $t(`features.${key}`) }}
      </span>
    </label>
  </div>

  <span class="features-title">{{ $t('titles.controllersSupport') }}</span>
  <div class="box">
    <label
      v-for="(feature, key) in listControllers"
      class="checkbox"
      :key="key"
    >
      <Checkbox
        class="check"
        :checked="feature"
        @change="changeControllers(key)"
      />
      <span class="label">
        {{ $t(`controllers.${key}`) }}
      </span>
    </label>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { concat, includes, reduce, without } from 'lodash-es';
import { Checkbox } from '@protocol-one/ui-kit';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
import i18n from './i18nSupportedFeatures';

export default Vue.extend({
  i18n,
  components: { Checkbox },
  props: {
    features: {
      default: () => ({
        controllers: '',
        common: [],
      }),
      type: Object,
    },
  },
  data() {
    return {
      localFeatures: this.features,
    };
  },
  watch: {
    features(value) {
      this.localFeatures = value;
    },
  },
  computed: {
    listNumbers() {
      const list = this.$i18n.messages[this.$i18n.locale].numbers;
      const common = this.localFeatures.common;

      return reduce(
        list,
        (result, value, key) => ({
          ...result,
          [key]: includes(common, key),
        }),
        {},
      );
    },
    listFeatures() {
      const list = this.$i18n.messages[this.$i18n.locale].features;
      const common = this.localFeatures.common;

      return reduce(
        list,
        (result, value, key) => ({
          ...result,
          [key]: includes(common, key),
        }),
        {},
      );
    },
    listControllers() {
      const list = this.$i18n.messages[this.$i18n.locale].controllers;
      const controllers = this.localFeatures.controllers;

      return reduce(
        list,
        (result, value, key) => ({
          ...result,
          [key]: controllers === key,
        }),
        {},
      );
    },
  },
  methods: {
    changeFeatures(type: string, key: string) {
      const common = this.localFeatures.common;

      if (this[`list${capitalizeFirstLetter(type)}`][key]) {
        this.localFeatures.common = without(common, key);
      } else {
        this.localFeatures.common = concat(common, key);
      }

      this.$emit('change', this.localFeatures);
    },
    changeControllers(key: string) {
      this.localFeatures.controllers = key;

      this.$emit('change', this.localFeatures);
    },
  },
});
</script>

<style scoped lang="scss">
.features-title {
  display: block;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 16px;
}
.box {
  margin-bottom: 24px;
  max-height: 400px;
  max-width: 600px;
}
.checkbox {
  display: inline-flex;
  align-items: center;
  width: 260px;
  padding: 8px 0;
  cursor: pointer;
}
.check {
  height: 20px;
  margin-right: 16px;
}
</style>
