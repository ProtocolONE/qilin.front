<template>
<UiTableRow
  class="item-container"
  @click.native="$router.push({ name: 'user', params: { id: user.id } })"
>
  <UiTableCell>
    <div
      v-if="user.icon"
      class="logo"
      :style="{ backgroundImage: `url(${user.icon})` }"
    />
    {{ user.internalName }}
  </UiTableCell>
  <UiTableCell>
    <div class="roles-box">
      <div class="roles">
        <div
          v-for="role in rolesTitles"
          :key="role"
          class="role"
        >
          {{ role }}
        </div>
      </div>
    </div>
  </UiTableCell>
  <UiTableCell>{{ user.prices.currency }} {{ user.prices.price }}</UiTableCell>
  <UiTableCell>{{ formatReleaseDate }}</UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { filter, get, includes, map } from 'lodash-es';
import { UiTableRow, UiTableCell } from '@protocol-one/ui-kit';
import formatDate from '@/helpers/formatDate';

export default Vue.extend({
  components: { UiTableRow, UiTableCell },
  props: {
    roles: {
      default: () => [],
      type: Array,
    },
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
    rolesTitles() {
      const rolesIds = [ this.user.roles.main, ...this.user.roles.addition ];
      const roles = filter(this.roles, role => includes(rolesIds, role.id));

      return map(
        roles,
        role => get(
          role,
          `title.${this.$i18n.locale}`,
          get(role, `title.${this.$i18n.fallbackLocale}`, ''),
        ),
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.item-container {
  line-height: 28px;
  cursor: pointer;
}
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  background-position: center;
}
// @TODO - Fix scrolling for roles
.roles-box {
  position: relative;
  overflow: hidden;
  height: 28px;
}
.roles {
  position: absolute;
  left: 0;
  top: 0;
  height: 54px;
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
}
.role {
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
// .price {
//   min-width: 90px;
//   max-width: 90px;
//   margin-right: 16px;
// }
// .release {
//   min-width: 200px;
//   max-width: 200px;
//   margin-right: 16px;
// }
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
