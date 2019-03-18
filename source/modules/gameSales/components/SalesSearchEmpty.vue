<template>
<section class="sales-search-empty">
  <p>
    <b>{{ $t('searchEmpty') }}.</b>&nbsp;
    <a href="#" @click.prevent="$emit('reset-search', '', 0)">
      {{ $t('resetSearch') }}?
    </a>
  </p>
</section>
</template>

<script>
export default {
  name: 'SalesSearchEmpty',

  inject: ['$i18n']
}
</script>

<style lang="scss" scoped>
.sales-search-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 33px 30px;
}
</style>
