<template>
<router-link
  class="list-row"
  :to="itemUrl"
>
  <div class="row-container">
    <div
      v-for="(item, index) in items"
      class="item"
      :key="index"
      :style="itemStyles(item)"
    >
      <slot name="item"></slot>
    </div>
  </div>
  <div
    v-if="hasEtcEvents"
    class="etc"
  >
    <div class="dots" />
    <slot name="events"></slot>
  </div>
</router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { filter, get, includes, map } from 'lodash-es';
import formatDate from '@/helpers/formatDate';

export default Vue.extend({
  props: {
    items: {
      default: () => [],
      type: Array,
    },
    hasEtcEvents: {
      default: true,
      type: Boolean,
    },
    itemUrl: {
      default: '',
      type: String,
    },
  },
  methods: {
    itemStyles(item: any) {
      return {
        flexBasis: item.width ? `${item.width}px` : `(100 / this.items.length)}%`,
        minWidth: item.minWidth ? `${item.minWidth}px` : undefined,
        maxWidth: item.maxWidth ? `${item.maxWidth}px` : undefined,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.list-row {
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
.row-container {
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
