<template>
<UiTableRow :link="gameUrl">
  <UiTableCell>
    <div
      v-if="game.icon"
      class="logo"
      :style="{ backgroundImage: `url(${game.icon})` }"
    />
    {{ game.internalName }}
  </UiTableCell>
  <UiTableCell>
    <div class="genres-box">
      <div class="genres">
        <div
          v-for="genre in genresTitles"
          :key="genre"
          class="genre"
        >
          {{ genre }}
        </div>
      </div>
    </div>
  </UiTableCell>
  <UiTableCell>{{ formatReleaseDate }}</UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {filter, get, includes, map} from 'lodash-es';
  import {UiTableCell, UiTableRow} from '@protocol-one/ui-kit';
  import formatDate from '@/helpers/formatDate';

  export default Vue.extend({
  components: { UiTableRow, UiTableCell },
  props: {
    genres: {
      default: () => [],
      type: Array,
    },
    game: {
      required: true,
      type: Object,
    },
  },
  computed: {
    formatReleaseDate() {
      return formatDate(
        this.game.releaseDate,
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    },
    gameUrl(): string {
      return `/games/${this.game.id}`;
    },
    genresTitles() {
      const genresIds = [ this.game.genres.main, ...this.game.genres.addition ];
      const genres = filter(this.genres, genre => includes(genresIds, genre.id));

      return map(
        genres,
        genre => get(
          genre,
          `title.${this.$i18n.locale}`,
          get(genre, `title.${this.$i18n.fallbackLocale}`, ''),
        ),
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  background-position: center;
  display: inline-block;
  vertical-align: middle;
}
// @TODO - Fix scrolling for genres
.genres-box {
  position: relative;
  overflow: hidden;
  height: 28px;
}
.genres {
  position: absolute;
  left: 0;
  top: 0;
  height: 54px;
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
}
.genre {
  display: inline-block;
  padding: 0 12px;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  color: #a9a9a9;
  background-color: #f9f9f9;
  border: 1px solid #e2e2e2;
  border-radius: 14px;
  margin-right: 6px;

  &:last-child {
    margin-right: 0;
  }
}
</style>
