<template>
<div class="game-creators">
  <span class="title">{{ $t('title') }}</span>
  <TagInput
    :label="$t('labelTags')"
    :tags="tags"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TagInput } from '@protocol-one/ui-kit';
import i18n from './i18nTags';

export default Vue.extend({
  i18n,
  components: { TagInput },
  props: {
    selectedTags: {
      default: () => [],
      type: Array,
    },
    tags: {
      default: () => [],
      type: Array,
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
