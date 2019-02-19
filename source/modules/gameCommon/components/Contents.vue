<template>
<div class="table-of">
  <div class="borders">
    <h3>{{ $t('contents') }}</h3>
    <ul>
      <li
        v-for="item in contents"
        :key="item.anchor"
      >
        <a :href="'#' + item.anchor">
          {{ item.text() }}
        </a>
      </li>
    </ul>
  </div>
</div>
</template>

<script type="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import i18n from '../i18n'

export default Vue.extend({
  i18n,
  computed: {
    ...mapState('Game', ['gameInfo', 'contents']),
  },
})
</script>

<style scoped lang="scss">
.borders {
  box-shadow: 0px 15px 36px #d4d4d4;
  margin: 25px;
}
h3 {
  font-size: 16px;
  height: 40px;
  background: #f6f6f6;
  border: 1px solid #ededed;
  box-sizing: border-box;
  padding-left: 24px;
  padding-top: 9px;
}
ul {
  list-style: none;
  margin-left: 24px;
  padding: 0 0 14px 0;
  li {
    font-size: 14px;
    margin-top:17px;
    a {
      color: #999999;
    }
  }
}
</style>