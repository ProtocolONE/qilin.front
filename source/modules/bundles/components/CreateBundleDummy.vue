<template>
<div class="create-bundle-dummy">
  <IconDummy />
  <span class="title">
    {{ $t('title') }}
  </span>
  <UiButton
    :text="$t('buttonText')"
    @click="$emit('clickCreate')"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {UiButton} from '@protocol-one/ui-kit';
import IconDummy from '@/components/IconDummy.vue';
import i18n from './i18nCreateBundleDummy';

export default Vue.extend({
  i18n,
  components: { UiButton, IconDummy },
});
</script>

<style lang="scss" scoped>
.create-bundle-dummy {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  color: #b1b1b1;
  flex: 1;
}
.title {
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  display: block;
  margin-top: 12px;
}

</style>
