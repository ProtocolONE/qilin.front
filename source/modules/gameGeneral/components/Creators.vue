<template>
<div class="game-creators">
  <span class="title">{{ $t('title') }}</span>
  <TextField
    :label="$t('developers')"
    :value="localDevelopers"
    @input="changeDevelopers"
  />
  <TextField
    :label="$t('publishers')"
    :value="localPublishers"
    @input="changePublishers"
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
  data() {
    return {
      localDevelopers: this.developers,
      localPublishers: this.publishers,
    };
  },
  methods: {
    changeDevelopers(developers: string) {
      this.localDevelopers = developers;
      this.emitChange();
    },
    changePublishers(publishers: string) {
      this.localPublishers = publishers;
      this.emitChange();
    },
    emitChange() {
      this.$emit('change', {
        developers: this.localDevelopers,
        publishers: this.localPublishers,
      })
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  display: block;
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 500;
}
</style>
