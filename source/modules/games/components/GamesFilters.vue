<template>
<div class="games-filters">
  <span
    class="name _active"
    @click="toggleSort('technicalName')"
  >
    {{ $t('name') }}
  </span>
  <span class="genre">
    {{ $t('genre') }}
  </span>
  <span class="price">
    {{ $t('price') }}
  </span>
  <span
    class="release _active"
    @click="toggleSort('releaseDate')"
  >
    {{ $t('release') }}
  </span>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button, TextField } from '@protocol-one/ui-kit';
import i18n from './i18nGamesFilters';

export default Vue.extend({
  i18n,
  components: { Button, TextField },
  methods: {
    toggleSort(propName: string) {
      this.$emit('toggleSort', propName);
    }
  },
});
</script>

<style lang="scss" scoped>
.games-filters {
  height: 40px;
  padding: 0 32px;
  width: 100%;
  display: flex;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.07);
  color: #b1b1b1;
  background-color: #f6f6f6;
  font-size: 14px;
}
.name,
.genre,
.price,
.release {
  display: inline-block;
  line-height: 40px;

  &._active {
    color: #0c2441;
    cursor: pointer;
  }
}
.name {
  min-width: 292px;
  max-width: 292px;
}
.genre {
  min-width: 216px;
  max-width: 216px;
}
.price {
  min-width: 106px;
  max-width: 106px;
}
.release {
  min-width: 216px;
  max-width: 216px;
}
</style>
