<template>
<header class="packages-header">
  <h1 class="title">
    {{ $t('title') }}
  </h1>
  <template v-if="hasPackages">
    <div class="search">
      <TextField
        :label="$t('search')"
        :value="searchValue"
        @input="$emit('search', $event)"
      />
    </div>
    <div
      class="info"
      v-html="$t('info')"
    />
    <Button
      :text="$t('buttonText')"
      @click="$emit('clickCreate')"
    />
  </template>
</header>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Button, TextField} from '@protocol-one/ui-kit';
  import i18n from './i18nHeader';

  export default Vue.extend({
  i18n,
  components: { Button, TextField },
  props: {
    searchValue: {
      type: String,
      required: true,
    },
    hasPackages: {
      default: false,
      type: Boolean,
    },
  }
});
</script>

<style lang="scss" scoped>
.packages-header {
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  width: 100%;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.07);
}
.title {
  font-weight: bold;
  font-size: 24px;
  margin: 0;
}
.search {
  max-width: 190px;
}
.info {
  color: #b1b1b1;
  font-size: 12px;
  line-height: 17px;
}
</style>
