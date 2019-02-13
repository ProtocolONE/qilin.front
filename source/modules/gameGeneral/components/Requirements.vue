<template>
<div class="platforms-requirements">
  <span class="title">{{ title }}</span>
  <div class="requirements-row">
    <TextField
      :label="$t('cpu')"
      :value="localRequirements.processor"
      @input="change('processor', $event)"
    />
  </div>
  <div class="requirements-row">
    <TextField
      :label="$t('graphics')"
      :value="localRequirements.graphics"
      @input="change('graphics', $event)"
    />
  </div>
  <div class="requirements-row">
    <Select
      :hasEmptyValue="true"
      :label="$t('ram')"
      :options="ramList"
      :value="ramString"
      @input="change('ram', $event, 'number')"
    />
  </div>
  <div class="requirements-row">
    <Select
      :hasEmptyValue="true"
      :label="$t('storage')"
      :options="storageList"
      :value="storageString"
      @input="change('storage', $event, 'number')"
    />
  </div>
  <div class="requirements-row">
    <Select
      :hasEmptyValue="true"
      :label="$t('osVersion')"
      :options="osVersionList[os]"
      :value="localRequirements.system"
      @input="change('system', $event)"
    />
  </div>
  <div class="requirements-row">
    <TextField
      :label="$t('additional')"
      :value="localRequirements.other"
      @input="change('other', $event)"
    />
  </div>
  
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Select, TextField } from '@protocol-one/ui-kit';
import i18n from './i18nRequirements';

export default Vue.extend({
  i18n,
  components: {
    Select,
    TextField,
  },
  props: {
    requirements: {
      default: () => ({
        system: '',
        processor: '',
        graphics: '',
        ram: 0,
        storage: 0,
        other: '',
      }),
      type: Object,
    },
    title: {
      default: '',
      type: String,
    },
    os: {
      default: 'windows',
      type: String,
    },
  },
  data() {
    return {
      localRequirements: this.requirements,
      ramList: [
        { label: '1GB', value: '1024' },
        { label: '2GB', value: '2048' },
        { label: '4GB', value: '4096' },
        { label: '6GB', value: '6144' },
        { label: '8GB', value: '8192' },
        { label: '12GB', value: '12288' },
        { label: '16GB', value: '16384' },
      ],
      storageList: [
        { label: '1GB', value: '1024' },
        { label: '2GB', value: '2048' },
        { label: '5GB', value: '5120' },
        { label: '10GB', value: '10240' },
        { label: '15GB', value: '15360' },
        { label: '20GB', value: '20480' },
        { label: '30GB', value: '30720' },
        { label: '40GB', value: '40960' },
        { label: '50GB', value: '51200' },
        { label: '75GB', value: '76800' },
        { label: '100GB', value: '102400' },
      ],
      osVersionList: {
        windows: [
          { label: 'Windows 8', value: 'Windows 8' },
          { label: 'Windows 8.1', value: 'Windows 8.1' },
          { label: 'Windows 10', value: 'Windows 10' },
        ],
        macOs: [
          { label: 'MacOS 10.12', value: 'MacOS 10.12' },
          { label: 'MacOS 10.13', value: 'MacOS 10.13' },
          { label: 'MacOS 10.14', value: 'MacOS 10.14' },
        ],
        linux: [
          { label: 'Ubuntu 16.10', value: 'Ubuntu 16.10' },
          { label: 'Ubuntu 18.4', value: 'Ubuntu 18.4' },
          { label: 'Ubuntu 18.10', value: 'Ubuntu 18.10' },
        ],
      }
    };
  },
  watch: {
    requirements(value) {
      this.localRequirements = value;
    },
  },
  computed: {
    ramString() {
      return this.localRequirements.ram ? this.localRequirements.ram.toString() : '';
    },
    storageString() {
      return this.localRequirements.storage ? this.localRequirements.storage.toString() : '';
    },
  },
  methods: {
    change(key: string, value: string, type: string = 'string') {
      this.localRequirements[key] = type === 'number' ? parseInt(value) : value;

      this.$emit('change', this.localRequirements);
    },
  }
});
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  font-weight: 500;
  display: block;
  margin: 24px 0 16px;
}
.requirements-row {
  min-height: 80px;
}
</style>
