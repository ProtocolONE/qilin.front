<template>
<router-link
  class="games-item"
  :to="gameUrl"
>
  <div class="item-container">
    <div
      class="logo"
      :style="{ backgroundImage: `url(${game.icon})` }"
    ></div>
    <div class="title">{{ game.technicalName }}</div>
    <div class="genres-box">
      <div class="genres">
        <div
          v-for="genre in game.genres"
          class="genre"
          :key="genre.id"
        >{{ i18nGenreTitle(genre.title) }}</div>
      </div>
    </div>
    <div class="price">{{ game.prices.currency }} {{ game.prices.price }}</div>
    <div class="release">{{ game.releaseDate }}</div>
  </div>
  <div class="etc">
    <div class="dots"></div>
  </div>
</router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import get from 'lodash-es/get';

export default Vue.extend({
  props: {
    game: {
      required: true,
      type: Object,
    },
  },
  computed: {
    gameUrl(): string {
      return `/games/${this.game.id}`;
    },
  },
  methods: {
    /**
     * @TODO - Move to main logic and fix types for title
     * @return {string}
     */
    i18nGenreTitle(title: any) {
      return get(title, this.$i18n.locale, title[this.$i18n.fallbackLocale]);
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
