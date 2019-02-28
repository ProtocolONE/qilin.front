<template>
<UiTableRow
  class="item-container"
  :link="userUrl"
>
  <UiTableCell>
    <div
      v-if="user.icon"
      class="logo _user"
      :style="{ backgroundImage: `url(${user.icon})` }"
    />
    {{ user.name }}
  </UiTableCell>
  <UiTableCell>{{ user.email }}</UiTableCell>
  <UiTableCell>
    <div class="box _games">
      <div class="box-inner">
        <div
          v-for="(game, index) in games"
          class="item"
          :key="index"
          :title="game.title"
        >
          <div
            v-if="game.icon"
            class="logo _game"
            :style="{ backgroundImage: `url(${game.icon})` }"
          />
          <div v-else>
            {{ game.title.charAt(0) }}
          </div>
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
</UiTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { get, map, upperFirst } from 'lodash-es';
import { UiTableRow, UiTableCell } from '@protocol-one/ui-kit';
import formatDate from '@/helpers/formatDate';

export default Vue.extend({
  components: { UiTableRow, UiTableCell },
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
  computed: {
    formatReleaseDate() {
      return formatDate(
        new Date(this.user.lastSeen),
        'dd LLLL yyyy, HH:mm',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    },
    userUrl(): string {
      return `/users/${this.user.id}`;
    },
    games() {
      return map(
        this.user.roles,
        ({ resource }) => ({
          icon: get(resource, 'meta.preview', ''),
          title: get(resource, 'meta.internalName', ''),
        }),
      );
    },
    roles() {
      return map(
        this.user.roles,
        ({ role, resource }) => ({
          icon: get(resource, 'meta.preview', ''),
          title: get(
            role,
            `title.${this.$i18n.locale}`,
            get(role, `title.${this.$i18n.fallbackLocale}`, upperFirst(role)),
          ),
        }),
      );
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
// @TODO - Fix scrolling for roles
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

  &._role {
    padding: 0 12px;
    font-size: 14px;
    color: #a9a9a9;
    background-color: #f9f9f9;
    border: 1px solid #e2e2e2;
  }
}
</style>
