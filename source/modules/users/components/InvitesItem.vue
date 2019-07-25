<template>
<UiTableRow
  class="item-container"
  :link="userUrl"
>
  <UiTableCell>{{ user.email }}</UiTableCell>
  <UiTableCell>
    <div class="box _games">
      <div class="box-inner">
        <div
          v-for="(game, index) in games"
          :class="['item', { '_text': !game.icon }]"
          :key="index"
          :title="game.title"
        >
          <div
            v-if="game.icon"
            class="logo _game"
            :style="{ backgroundImage: `url(${game.icon})` }"
          />
          <template v-else>
            {{ game.title.charAt(0) }}
          </template>
        </div>
      </div>
    </div>
  </UiTableCell>
  <UiTableCell>
    <div class="box _roles">
      <div class="box-inner">
        <div
          v-for="(role, index) in roles"
          :key="index"
          class="item _role"
        >
          <div
            v-if="role.icon"
            class="logo _role"
            :style="{ backgroundImage: `url(${role.icon})` }"
          />
          {{ role.title }}
        </div>
      </div>
    </div>
  </UiTableCell>
  <UiTableCell>{{ formatReleaseDate }}</UiTableCell>
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
    user: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isTipVisible: false,
    };
  },
  computed: {
    formatReleaseDate() {
      return formatDate(
        this.user.lastSeen,
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      ) || 'Pending';
    },
    userUrl(): string {
      return `/users/${this.user.id}`;
    },
    games() {
      const allResource = map(
        this.user.roles,
        ({ resource }) => ({
          id: resource.id,
          icon: get(resource, 'meta.preview', ''),
          title: get(resource, 'meta.internalName', ''),
        }),
      );

      return reduce(allResource, (games, game) => {
        if (find(games, { id: game.id })) {
          return games;
        }

        return [ ...games, game ];
      }, []).filter(game => game.id !== 'skip');
    },
    roles() {
      const allRoles = map(
        this.user.roles,
        ({ role, resource }) => ({
          id: resource.id,
          icon: get(resource, 'meta.preview', ''),
          role,
          title: upperFirst(role),
        }),
      );

      return reduce(allRoles, (roles, role) => {
        if (find(roles, { id: role.id, role: role.role })) {
          return roles;
        }

        return [ ...roles, role ];
      }, []).filter(role => role.id !== 'skip');
    },
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

  &._user {
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
