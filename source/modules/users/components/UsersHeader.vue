<template>
<PageHeader>
  <span slot="title">
    {{ $t('title') }}
  </span>
  
  <div
    v-if="hasUsers"
    class="search"
  >
    <TextField
      :label="$t('search')"
      @input="$emit('search', $event)"
    />
  </div>

  <Button
    slot="right"
    :text="$t('buttonText')"
    @click="$emit('clickCreate')"
  />
</PageHeader>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button, PageHeader, TextField } from '@protocol-one/ui-kit';
import i18n from './i18nHeader';

export default Vue.extend({
  i18n,
  components: { Button, PageHeader, TextField },
  props: {
    hasUsers: {
      default: false,
      type: Boolean,
    },
  }
});
</script>

<style lang="scss" scoped>
.search {
  max-width: 190px;
}
</style>
