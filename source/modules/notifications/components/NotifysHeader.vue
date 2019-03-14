<template>
  <header class="header">
    <h1 class="title">
      {{ $t('title') }}
    </h1>
    <SearchInput
      class="search"
      :label="$t('search')"
      :value="searchValue"
      @input="$emit('search', $event)"
    />
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchInput from './SearchInput.vue';
import i18n from '../i18n';

export default Vue.extend({
  i18n,
  components: { SearchInput },
  props: {
    searchValue: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
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
  max-width: 200px;
}
</style>
