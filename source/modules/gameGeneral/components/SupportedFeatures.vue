<template>
<div class="game-features">
  <span class="title">{{ $t('title') }}</span>
  <span class="features-title">{{ $t('featuresTitle') }}</span>
  <label
    v-for="(feature, key) in listFeatures"
    class="checkbox"
    :key="key"
  >
    <Checkbox
      class="check"
      :checked="feature"
      @change="changeFeature(key)"
    />
    <span class="label">
      {{ key }}
    </span>
  </label>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { concat, includes, without } from 'lodash-es';
import { Checkbox } from '@protocol-one/ui-kit';
import i18n from './i18nSupportedFeatures';

export default Vue.extend({
  i18n,
  components: { Checkbox },
  props: {
    features: {
      default: () => [],
      type: Array,
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
    listFeatures() {
      return {
        [this.$t('singlePlayer')]: includes(this.localFeatures, 'singlePlayer'),
        [this.$t('multiPlayer')]: includes(this.localFeatures, 'multiPlayer'),
      };
    },
  },
  methods: {
    changeFeature(key: string) {
      if (this.listFeatures[key]) {
        this.localFeatures = without(this.localFeatures, key);
      } else {
        this.localFeatures = concat(this.localFeatures, key);
      }

      this.$emit('change', this.localFeatures);
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  display: block;
  font-size: 20px;
  margin-bottom: 24px;
  font-weight: bold;
}
.features-title {
  display: block;
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 16px;
}
.checkbox {
  display: flex;
  align-items: center;
  flex-basis: 180px;
  max-width: 300px;
  padding: 8px 0;
  cursor: pointer;
}
.check {
  height: 20px;
  margin-right: 16px;
}
</style>
