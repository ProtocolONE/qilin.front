<template>
<div class="game-creators">
  <span class="title">{{ $t('title') }}</span>
  <TextField
    :label="$t('developers')"
    :value="developers"
  />
  <TextField
    :label="$t('publishers')"
    :value="publishers"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TextField } from '@protocol-one/ui-kit';
import i18n from './i18nCreators';

export default Vue.extend({
  i18n,
  components: { TextField },
  props: {
    developers: {
      default: '',
      type: String,
    },
    publishers: {
      default: '',
      type: String,
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  display: block;
  font-size: 20px;
  margin-bottom: 24px;
  font-weight: 500;
}
</style>
