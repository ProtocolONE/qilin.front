<template>
<div class="game-tags">
  <TagInput
    :label="$t('labelTags')"
    :selectedTags="localSelectedTags"
    :tags="localTags"
    @change="changeSelectedTags"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { get } from 'lodash-es';
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
  computed: {
    localSelectedTags() {
      return this.selectedTags.map(
        (selectedTag: any) => {
          const tag = this.tags.find((value: any) => selectedTag === value.id);

          return this.getTagTitle(tag);
        },
      );
    },
    localTags() {
      return this.tags.map((tag: any) => this.getTagTitle(tag));
    },
  },
  methods: {
    changeSelectedTags(selectedTags: Array<string>) {
      this.$emit(
        'change',
        selectedTags.map(
          selectedTag => this.tags.find((tag: any) => this.getTagTitle(tag) === selectedTag).id,
        ),
      );
    },
    getTagTitle(tag: any) {
      return get(
        tag,
        `title.${this.$i18n.locale}`,
        get(tag, `title.${this.$i18n.fallbackLocale}`, ''),
      );
    },
  },
});
</script>
