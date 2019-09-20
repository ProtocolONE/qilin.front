<template>
<UiTableRow
  class="item-container"
>
  <UiTableCell>
    <span class="logo _user">{{ invite.email.charAt(0) }}</span>
    {{ invite.email }}
  </UiTableCell>
  <UiTableCell>
    <div class="box _games">
      <div class="box-inner">
        <div
          v-for="(game, index) in games.slice(0, 2)"
          class="item"
          :key="index"
          :title="game.title"
        >
          <div
            v-if="game.icon"
            class="logo _icon"
            :style="{ backgroundImage: `url(${game.icon})` }"
          />
          <div
            v-else
            class="logo _text"
            :title="game.title"
          >
            {{ game.title.charAt(0) }}
          </div>
        </div>
        <span
          class="extra"
          v-if="games.length > 2"
          v-text="`+${games.length - 2}`"
        />
      </div>
    </div>
  </UiTableCell>
  <UiTableCell>
    <div class="box _roles">
      <div class="box-inner">
        <div
          v-for="(role, index) in roles.slice(0, 2)"
          :key="index"
          :class="['item', '_role', `color-${role.title.charCodeAt(0) % 5}`]"
        >
          <div
            v-if="role.icon"
            class="logo _icon"
            :style="{ backgroundImage: `url(${role.icon})` }"
            :title="role.metaName"
          />
          <div
            v-else
            class="logo _text"
            :title="role.metaName"
          >
            {{ role.metaName.charAt(0) }}
          </div>
          {{ role.title }}
        </div>
        <span
          class="extra"
          v-if="roles.length > 2"
          v-text="`+${roles.length - 2}`"
        />
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
          @click.prevent="$emit('resend', invite.id)"
        >
          {{ $t('resendInvite') }}
        </div>
        <div
          class="event-item"
          @click.prevent="$emit('cancel', invite.id)"
        >
          {{ $t('cancel') }}
        </div>
      </UiTip>
    </div>
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { find, get, map, reduce, upperFirst, uniqWith } from 'lodash-es';
import { UiTableRow, UiTableCell, UiTip } from '@protocol-one/ui-kit';
import formatDate from '@/helpers/formatDate';
import IconSimpleDots from '@/components/IconSimpleDots.vue';
import i18n from './i18nItem';

export default Vue.extend({
  i18n,
  components: { IconSimpleDots, UiTableRow, UiTableCell, UiTip },
  props: {
    invite: {
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
        this.invite.createdAt,
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      ) || 'Pending';
    },
    games() {
      const allResource = map(
        this.invite.roles,
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
        this.invite.roles,
        ({ role, resource }) => ({
          id: resource.id,
          icon: get(resource, 'meta.preview', ''),
          role,
          title: upperFirst(role),
          metaName: get(resource, 'meta.internalName', ''),
        }),
      );

      return uniqWith(reduce(allRoles, (roles, role) => {
          if (find(roles, { id: role.id, role: role.role })) {
            return roles;
          }

          return [ ...roles, role ];
        }, []).filter(role => role.id !== 'skip'),
        (a, b) => a.role === b.role && a.metaName === b.metaName);
    },
  },
});
</script>

<style lang="scss" scoped>
._user {
  margin-right: 10px;
}
.logo {
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  &._text, &._icon {
    width: 18px;
    height: 18px;
  }
  &._text, &._user {
    text-align: center;
    color: white;
    background-color: #6B85A2;
    font-size: 14px;
    line-height: 20px;
    text-transform: uppercase;
  }
  &._user {
    width: 32px;
    height: 32px;
    display: inline-block;
    vertical-align: middle;
    line-height: 35px;
    font-size: 24px;
  }
}
.box {
  overflow: hidden;
  margin: 0;
  &._games {
    text-transform: uppercase;
    min-width: 60px;
  }
  &._roles {
    min-width: 180px;
  }
}
.box-inner {
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
  display: flex;
  align-items: center;
}
.item {
  margin-right: 6px;

  &:last-child {
    margin-right: 0;
  }

  &._role {
    height: 28px;
    border-radius: 14px;
    font-size: 14px;
    position: relative;
    padding-left: 26px;
    padding-right: 6px;
    line-height: 28px;
    .logo {
      position: absolute;
      left: 5px;
      top: 4px;
    }
  }
}
.color-0 {
  background-color: #f9f9f9;
  border: 1px solid #e2e2e2;
}
.color-1 {
  background-color: #F9BBBB;
  border: 1px solid #F9BBBB;
}
.color-2 {
  background-color: #75C5A8;
  border: 1px solid #75C5A8;
}
.color-3 {
  background-color: #a0a0dc;
  border: 1px solid #a0a0dc;
}
.color-4 {
  background-color: #d2d264;
  border: 1px solid #d2d264;
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
  background-color: #fff;
  text-decoration: none;
  padding: 0 24px;
  white-space: nowrap;

  &:hover {
    background-color: rgba(#2f6ecd, 0.2);
  }
}
</style>
