<template>
<div class="game-platforms">
  <span class="title">
    <slot name="title"></slot>
    <div
      v-clickaway="blurSettings"
      class="settings"
      @click="toggleSettings"
      @mouseenter="settingFilled = true"
      @mouseleave="settingFilled = false"
    >
      <SettingsIcon :color="settingsColor"/>
      <Tip :visible="isVisibleTip">
        <label
          v-for="(value, os) in localPlatforms"
          :class="['settings-row', value ? '' : '_in-active']"
          :key="os"
        >
          {{ os }}
          <SwitchBox
            class="switch"
            :checked="value"
            @change="togglePlatform(os)"
          />
        </label>
      </Tip>
    </div>
  </span>
  
  <div class="platforms">
    <div
      v-for="(value, os) in localPlatforms"
      v-show="value"
      :class="['platform', value ? '' : '_in-active']"
      :key="os"
      @mouseenter="iconsFilled[os] = true"
      @mouseleave="iconsFilled[os] = false"
      @click="currentPlatform = os"
    >
      <component
        :is="icons[os]"
        :color="iconColor(os)"
      />
      <div class="platform-name">{{ os }}</div>
    </div>
  </div>

  <div class="requirements-box">
    <div
      v-for="(value, os) in localRequirements"
      v-show="currentPlatform == os"
      class="requirements"
      :key="os"
    >
      <Requirements
        class="minimal"
        :os="os"
        :requirements="value.minimal"
        @change="changeMinimal(os, $event)"
      >
        <Headline slot="title" level='3'>
          {{ $t('minimal') }}
        </Headline>
      </Requirements>
      <Requirements
        class="recommended"
        :os="os"
        :requirements="value.recommended"
        @change="changeRecommended(os, $event)"
      >
        <Headline slot="title" level='3'>
          {{ $t('recommended') }}
        </Headline>
      </Requirements>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { get } from 'lodash-es';
import { SwitchBox, Tip } from '@protocol-one/ui-kit';
import Headline from '@/components/Headline.vue';
import LinuxIcon from './LinuxIcon.vue';
import MacOsIcon from './MacOsIcon.vue';
import Requirements from './Requirements.vue';
import SettingsIcon from '@/components/SettingsIcon.vue';
import WindowsIcon from './WindowsIcon.vue';
import i18n from './i18nPlatforms';

function getCurrentPlatform(platforms: any): string {
  const activePlatforms = Object.keys(platforms)
    .map(key => ({ key, value: platforms[key] }))
    .filter(({ value }) => value);

  return get(activePlatforms, '[0].value', false) ? activePlatforms[0].key : '';
}

export default Vue.extend({
  i18n,
  components: {
    Headline,
    LinuxIcon,
    MacOsIcon,
    Requirements,
    SettingsIcon,
    SwitchBox,
    Tip,
    WindowsIcon,
  },
  props: {
    platforms: {
      default: () => ({
        windows: true,
        macOs: false,
        linux: false,
      }),
      type: Object,
    },
    requirements: {
      default: () => ({
        windows: {},
        macOs: {},
        linux: {}
      }),
      type: Object,
    },
  },
  data() {
    return {
      currentPlatform: getCurrentPlatform(this.platforms),
      isVisibleTip: false,
      icons: {
        linux: LinuxIcon,
        macOs: MacOsIcon,
        windows: WindowsIcon,
      },
      iconsFilled: {
        linux: false,
        macOs: false,
        windows: false,
      },
      localPlatforms: this.platforms,
      localRequirements: this.requirements,
      settingFilled: false,
    };
  },
  watch: {
    platforms(value) {
      this.currentPlatform = getCurrentPlatform(value);
      this.localPlatforms = value;
    },
    requirements(value) {
      this.localRequirements = value;
    },
  },
  computed: {
    settingsColor() {
      return this.settingFilled || this.isVisibleTip ? '#3672b9' : '#d0d0d0';
    },
  },
  methods: {
    blurSettings() {
      this.isVisibleTip = false;
    },
    changeMinimal(os: string, value: any) {
      this.localRequirements[os].minimal = value;
      this.$emit('changeRequirements', this.localRequirements);
    },
    changeRecommended(os: string, value: any) {
      this.localRequirements[os].recommended = value;
      this.$emit('changeRequirements', this.localRequirements);
    },
    iconColor(os: string) {
      return this.iconsFilled[os] || this.currentPlatform === os ? '#333333' : '#3672b9';
    },
    toggleSettings() {
      this.isVisibleTip = !this.isVisibleTip;
    },
    togglePlatform(os: string) {
      this.localPlatforms = {
        ...this.localPlatforms,
        [os]: !this.localPlatforms[os],
      };
      this.currentPlatform = getCurrentPlatform(this.localPlatforms);

      this.$emit('changePlatforms', this.localPlatforms);
    },
  }
});
</script>

<style scoped lang="scss">
.title {
  display: flex;
  margin-bottom: 32px;
}
.settings {
  margin-left: 12px;
  position: relative;
  cursor: pointer;
}
.settings-row {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  justify-content: space-between;
  height: 24px;
  min-width: 150px;
  text-transform: capitalize;
  margin-bottom: 24px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &._in-active {
    color: #cfcfcf;
  }
}
.platforms {
  display: flex;
  justify-content: flex-start;
}
.platform {
  flex-basis: 80px;
  margin-right: 32px;
  text-align: center;
  cursor: pointer;
}
.platform-name {
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 16px;
}
.requirements {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.minimal {
  margin-right: 16px;
  flex-grow: 1;
}
.recommended {
  flex-grow: 1;
}
</style>
