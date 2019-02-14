<template>
<div class="game-tags">
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
