<template>
<section class="sales-dummy">
  <icon-dummy/>
  <h2>{{ $t('dummyTitle') }}</h2>
  <a href="#" @click.prevent="$emit('create')">
    {{ $t('createNewSale') }}
  </a>
</section>
</template>

<script lang="ts">
import IconDummy from '@/components/IconDummy'
import { Button as UiButton } from '@protocol-one/ui-kit'

export default {
  name: 'SalesDummy',

  inject: ['$i18n'],

  components: { IconDummy, UiButton }
}
</script>

<style lang="scss" scoped>
.sales-dummy {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 33px 30px;
}
</style>
