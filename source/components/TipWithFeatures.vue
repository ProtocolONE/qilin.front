<template>
<div
  v-clickaway="blurFeatures"
  class="features"
  @click="toggleFeature"
  @mouseenter="isFilled = true"
  @mouseleave="isFilled = false"
>
  <SettingsIcon :color="featuresColor"/>
  <Tip :visible="isVisibleTip">
    <label
      v-for="(f, idx) in features"
      :class="['feature-row', f.checked ? '' : '_in-active']"
      :key="idx"
    >
      {{ f.label }}
      <SwitchBox
        class="switch"
        :checked="f.checked"
        @change="$emit('switch', idx)"
      />
    </label>
  </Tip>
</div>
</template>

<script type="ts">
import { TextField, Tip, SwitchBox } from '@protocol-one/ui-kit';
import SettingsIcon from '@/components/SettingsIcon.vue';

export default {
  components: {
    TextField,
    Tip,
    SwitchBox,
    SettingsIcon,
  },
  props: {
    features: {
      default: () => [],
      type: Array,
      validator(value) {
        if (!value.length) {
          return true;
        }
        if (value[0].label !== undefined && value[0].checked !== undefined) {
          return true;
        }
        return false;
      },
    },
  },
  data() {
    return {
      isVisibleTip: false,
      isFilled: false,
    };
  },
  computed: {
    featuresColor() {
      return this.isFilled || this.isVisibleTip ? '#3672b9' : '#d0d0d0';
    },
  },
  methods: {
    blurFeatures() {
      this.isVisibleTip = false;
    },
    toggleFeature() {
      this.isVisibleTip = !this.isVisibleTip;
    },
  },
}
</script>

<style scoped lang="scss">
.features {
  margin-left: 6px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  z-index: 4;
}
.feature-row {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
  height: 24px;
  min-width: 150px;
  margin-bottom: 24px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &._in-active {
    color: #cfcfcf;
  }
}
</style>