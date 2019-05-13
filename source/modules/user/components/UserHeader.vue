<template>
<PageHeader :breadcrumbs="breadcrumbs">
  <span slot="title">
    {{ currentUser.name || currentUser.email }}
  </span>
  
  <div
    v-if="hasChangePermission"
    slot="right"
  >
    <Button
      class="right-btn"
      :text="$t('addRoleButton')"
      @click="$emit('openPopupAddRole')"
    />
    <Button
      class="right-btn"
      :text="$t('saveButton')"
      @click="$emit('save')"
    />
  </div>
</PageHeader>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button, PageHeader, TextField } from '@protocol-one/ui-kit';
import i18n from './i18nHeader';

export default Vue.extend({
  i18n,
  components: { Button, PageHeader, TextField },
  props: {
    currentUser: {
      required: true,
      type: Object,
    },
    hasChangePermission: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    breadcrumbs() {
      return [ { url: '/users', label: this.$i18n.t('usersList') } ];
    },
  },
});
</script>

<style lang="scss" scoped>
.right-btn {
  margin-left: 18px;
}
</style>
