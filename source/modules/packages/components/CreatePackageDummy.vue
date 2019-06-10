<template>
<div class="create-package-dummy">
  <IconDummy />
  <span class="title">
    {{ $t('title') }}
  </span>
  <span
    class="text"
    v-html="$t('text')"
  />
  <Button
    :text="$t('buttonText')"
    @click="$emit('clickCreate')"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button } from '@protocol-one/ui-kit';
import IconDummy from '@/components/IconDummy.vue';
import i18n from './i18nCreatePackageDummy';

export default Vue.extend({
  i18n,
  components: { Button, IconDummy },
});
</script>

<style lang="scss" scoped>
.create-package-dummy {
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
.text {
  display: block;
  font-size: 12px;
  margin-top: 8px;
  margin-bottom: 24px;
  text-align: center;
}
</style>
