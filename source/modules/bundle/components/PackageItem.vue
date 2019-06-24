<template>
<UiTableRow
  class="row"
  :isHoverable="false"
  :isClickable="false"
>
  <UiTableCell class="select-cell">
    <Checkbox
      class="select"
      :checked="checked"
      @change="$emit('change', $event)"
    />
  </UiTableCell>
  <UiTableCell>
    <div
      v-if="iconUrl"
      class="logo"
      :style="{ backgroundImage: `url(${iconUrl})` }"
    />
    <router-link :to="packageUrl">
      {{ pkg.name[$i18n.locale] || pkg.name.en }}
    </router-link>
  </UiTableCell>
  <UiTableCell class="created-cell">
    {{ formatDate(pkg.createdAt) }}
  </UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Checkbox, UiTableCell, UiTableRow} from '@protocol-one/ui-kit';
  import i18n from './i18nGeneral';
  import formatDate from '@/helpers/formatDate';

  export default Vue.extend({
  i18n,
    components: {UiTableRow, UiTableCell, Checkbox},
  props: {
    /**
     * @typedef {id: string; createdAt: Date; isDefault: boolean; isEnabled: boolean; media: PackageMedia;
     * name: LocalizedString; sku: string} PackageItem
     * @type {PackageItem}
     */
    pkg: {
      required: true,
      type: Object,
    },
    checked: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    iconUrl() {
      return this.pkg.media.thumb[this.$i18n.locale] || this.pkg.media.thumb.en;
    },
    packageUrl(): string {
      return `/packages/${this.pkg.id}`;
    },
  },
  methods: {
    formatDate(date) {
      return formatDate(
        date,
        'dd LLLL yyyy',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    },
  }
});
</script>

<style scoped lang="scss">
.select-cell {
  width: 60px;
}
.created-cell {
  width: 130px;
}
.select {
  position: relative;
  top: 4px;
}
.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 16px;
  background-position: center;
  display: inline-block;
  vertical-align: middle;
}
.row > * {
  padding: 10px 0 10px 10px;
}
</style>
