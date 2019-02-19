<template>
<section class="search-empty">
  <p>
    <b>{{ $t('searchEmpty') }}.</b>
    &nbsp;
    <a href="javascript:void(0)" @click="$emit('reset-search', '', 0)">
      {{ $t('resetSearch') }}?
    </a>
  </p>
</section>
</template>

<script lang="ts">
import i18n from '../i18n'
export default {
  name: 'SearchEmpty',
  i18n
}
</script>

<style lang="scss" scoped>
.search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 33px 30px;
}
</style>
