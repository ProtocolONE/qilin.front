<template>
<div class="game-genre">
  <Select
    class="main-genre"
    :label="$t('mainGenreLabel')"
    :value="mainGenre"
    :options="mainGenres"
    @input="changeMainGenre"
  />
  <TagInput
    :label="$t('AdditionGenresLabel')"
    :selectedTags="additionSelectedGenres"
    :tags="additionGenres"
    @change="changeAdditionGenres"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { get, without } from 'lodash-es';
import { Select, TagInput } from '@protocol-one/ui-kit';
import i18n from './i18nGenre';

export default Vue.extend({
  i18n,
  components: { Select, TagInput },
  props: {
    genres: {
      default: () => [],
      type: Array,
    },
    selectedGenres: {
      default: () => ({
        addition: [],
        main: '',
      }),
      type: Object,
    },
  },
  data() {
    return {
      localSelectedGenres: this.selectedGenres,
    };
  },
  watch: {
    selectedGenres(value) {
      this.localSelectedGenres = value;
    },
  },
  computed: {
    mainGenre() {
      return this.localSelectedGenres.main;
    },
    mainGenres() {
      return this.genres.map((genre: any) => ({
        label: this.getGenreTitle(genre),
        value: genre.id,
      }));
    },
    additionGenres() {
      const additionGenres = this.genres.filter(
        ({ id }: { id: string }) => id !== this.mainGenre,
      );

      return additionGenres.map(
        (genre: any) => this.getGenreTitle(genre),
      );
    },
    additionSelectedGenres() {
      const additionSelectedGenres = this.localSelectedGenres.addition.filter(
        (id: string) => id !== this.mainGenre,
      );

      return additionSelectedGenres.map(
        (selectedGenre: string) => this.getGenreTitle(
          this.findSelectedGenreById(selectedGenre),
        ),
      );
    },
  },
  methods: {
    changeMainGenre(genre: string) {
      const addition = this.localSelectedGenres.addition;

      this.localSelectedGenres.main = genre;
      this.localSelectedGenres.addition = without(addition, genre);

      this.$emit('change', this.localSelectedGenres);
    },
    changeAdditionGenres(genres: string[]) {
      this.localSelectedGenres.addition = genres.map(
        selectedGenre => this.findSelectedGenreByTitle(selectedGenre).id
      );

      this.$emit('change', this.localSelectedGenres);
    },
    findSelectedGenreById(selectedGenre: string) {
      return this.genres.find((genre: any) => genre.id === selectedGenre);
    },
    findSelectedGenreByTitle(selectedGenre: string) {
      return this.genres.find((genre: any) => this.getGenreTitle(genre) === selectedGenre);
    },
    getGenreTitle(genre: any) {
      return get(
        genre,
        `title.${this.$i18n.locale}`,
        get(genre, `title.${this.$i18n.fallbackLocale}`)
      );
    },
  },
});
</script>

<style scoped lang="scss">
.main-genre {
  max-width: 320px;
}
</style>
