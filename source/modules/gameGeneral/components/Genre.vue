<template>
<div class="game-genre">
  <span class="title">{{ $t('title') }}</span>
  <Select
    :label="$t('genreLabel')"
    :value="genre.id"
    :options="options"
    @input="changeGenre"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { get, find } from 'lodash-es';
import { Select } from '@protocol-one/ui-kit';
import i18n from './i18nGenre';

export default Vue.extend({
  i18n,
  components: { Select },
  props: {
    genre: {
      default: () => ({
        id: '',
        title: {
          de: '',
          en: '',
          ru: '',
        },
      }),
      type: Object,
    },
    genres: {
      default: () => [],
      type: Array,
    }
  },
  computed: {
    options() {
      return this.genres.map((genre: any) => {
        const title = get(
          genre,
          `title.${this.$i18n.locale}`,
          get(genre, `title.${this.$i18n.fallbackLocale}`)
        );

        return {
          label: title,
          value: genre.id,
        };
      });
    },
  },
  methods: {
    changeGenre(genreId: string) {
      this.$emit('change', find(this.genres, { id: genreId }));
    },
  },
});
</script>

<style scoped lang="scss">
.game-genre {
  max-width: 320px;
}
.title {
  display: block;
  font-size: 20px;
  margin-bottom: 24px;
  font-weight: bold;
}
</style>
