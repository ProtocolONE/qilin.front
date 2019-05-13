<template>
<UiTableRow
  class="item-container"
  @click.native="$emit('click')"
>
  <UiTableCell>
    <div
      v-if="game.icon"
      class="logo _game"
      :style="{ backgroundImage: `url(${game.icon})` }"
    />
    {{ game.internalName }}
  </UiTableCell>
  <UiTableCell>
    <div class="box _roles">
      <div class="box-inner">
        <div
          v-for="(role, index) in game.roles"
          :key="index"
          class="item _role"
        >
          {{ role.internalName }}
        </div>
      </div>
    </div>
  </UiTableCell>
  <UiTableCell>Add role</UiTableCell>
  <UiTableCell
    @mouseover.native="isTipVisible = true"
    @mouseleave.native="isTipVisible = false"
  >
    <div class="dots">
      <IconSimpleDots/>
      <UiTip
        position="left"
        :visible="isTipVisible"
        :withoutPadding="true"
      >
        <div
          class="event-item"
          @click.prevent="$emit('removeAllRoles')"
        >
          {{ $t('removeAllRoles') }}
        </div>
      </UiTip>
    </div>
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { find, get, map, reduce, upperFirst } from 'lodash-es';
import { UiTableRow, UiTableCell, UiTip } from '@protocol-one/ui-kit';
import formatDate from '@/helpers/formatDate';
import IconSimpleDots from '@/components/IconSimpleDots.vue';
import i18n from './i18nItem';

export default Vue.extend({
  i18n,
  components: { IconSimpleDots, UiTableRow, UiTableCell, UiTip },
  props: {
    game: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isTipVisible: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.logo {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;

  &._game {
    margin-right: 8px;
    vertical-align: middle;
  }

  &._game {
    width: 20px;
    margin-right: 8px;
    vertical-align: middle;
  }

  &._role {
    width: 26px;
    height: 26px;
    margin-left: -10px;
    background-size: 16px;
    vertical-align: top;
  }
}
.box {
  position: relative;
  overflow: hidden;
  height: 28px;

  &._games {
    text-transform: uppercase;
    min-width: 60px;
  }

  &._roles {
    min-width: 180px;
  }
}
.box-inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 54px;
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
}
.item {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  border-radius: 14px;
  margin-right: 6px;

  &:last-child {
    margin-right: 0;
  }

  &._text {
    width: 28px;
    height: 28px;
    text-align: center;
    box-sizing: border-box;
    color: #a9a9a9;
    background-color: #f9f9f9;
    border: 1px solid #e2e2e2;
  }

  &._role {
    padding: 0 12px;
    font-size: 14px;
    color: #a9a9a9;
    background-color: #f9f9f9;
    border: 1px solid #e2e2e2;
  }
}
.dots {
  position: relative;
  width: 20px;
  cursor: pointer;
}
.event-item {
  font-size: 16px;
  color: #999;
  line-height: 40px;
  display: block;
  padding: 0;
  background-color: #fff;
  text-decoration: none;
  padding: 0 24px;
  white-space: nowrap;

  &:hover {
    background-color: rgba(#2f6ecd, 0.2);
  }
}
</style>
