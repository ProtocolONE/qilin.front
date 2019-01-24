<template>
<div class="locale-changer">
  <select v-model="$i18n.locale">
    <option
      v-for="(lang, i) in langs"
      :key="`Lang${i}`"
      :value="lang"
    >
      {{ lang }}
    </option>
  </select>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import locales from '@/locales';

export default Vue.extend({
  data() {
    return { langs: [ ...Object.keys(locales) ] };
  },
});
</script>
