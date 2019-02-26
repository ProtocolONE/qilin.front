<template>
<router-link
  class="games-item"
  :to="gameUrl"
>
  <div class="item-container">
    <div
      v-if="game.icon"
      class="logo"
      :style="{ backgroundImage: `url(${game.icon})` }"
    />
    <div :class="['title', { '_without-icon': !game.icon }]">
      {{ game.internalName }}
    </div>
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
    <div class="price">
      {{ game.prices.currency }} {{ game.prices.price }}
    </div>
    <div class="release">
      {{ formatReleaseDate }}
    </div>
  </div>
  <div class="etc">
    <div class="dots" />
  </div>
</router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { filter, get, includes, map } from 'lodash-es';
import formatDate from '@/helpers/formatDate';

export default Vue.extend({
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
      return formatDate(new Date(this.game.releaseDate), 'dd LLLL yyyy, HH:mm');
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
.games-item {
  display: flex;
  padding: 12px 32px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.07);
  text-decoration: none;
  color: #0c2441;
  font-size: 16px;

  &:hover {
    background-color: #e3eeff;
  }
}
.item-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  background-position: center;
}
.title {
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 220px;
  max-width: 220px;
  margin-right: 16px;

  &._without-icon {
    min-width: 276px;
    max-width: 276px;
  }
}
// @TODO - Fix scrolling for genres
.genres-box {
  position: relative;
  overflow: hidden;
  min-width: 200px;
  max-width: 200px;
  height: 28px;
  margin-right: 16px;
}
.genres {
  position: absolute;
  left: 0;
  top: 0;
  height: 54px;
  overflow-x: auto;
  white-space: nowrap;
  min-width: 200px;
  max-width: 200px;
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
.price {
  min-width: 90px;
  max-width: 90px;
  margin-right: 16px;
}
.release {
  min-width: 200px;
  max-width: 200px;
  margin-right: 16px;
}
.etc {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dots {
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #c4c4c4;

  &:before,
  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #c4c4c4;
  }

  &:before {
    left: -10px;
  }

  &:after {
    right: -10px;
  }
}
</style>
