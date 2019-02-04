
<template>
  <div class="page">
      <p class="top-descr"></p>
      <h2>{{$t('title')}}</h2>

  </div>
</template>
<script type="ts" src="./index.ts"></script>
<style scoped lang="scss">
  .page {
    width: 735px;
    padding: 33px 30px;

    font-size: 16px;
    font-family: Lato;
    color: #333333;
  }
  h2 {
    font-size: 21px;
  }
  p.top-descr {
    color: #B1B1B1;
    font-size: 14px;
    margin-bottom: 4px;
  }
</style>
