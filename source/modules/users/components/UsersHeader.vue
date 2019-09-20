<template>
<PageHeader>
  <span slot="title">
    {{ $t('title') }}
  </span>

  <div
    v-if="hasUsers"
    class="search"
  >
    <TextField
      :label="$t('search')"
      @input="$emit('search', $event)"
    />
  </div>

  <label
    class="showInvites"
    slot="right"
  >
    {{ $t('invites') }}
    <SwitchBox
      class="switch"
      :checked="showInvites"
      @change="$emit('switchInvites')"
    />
  </label>

  <Button
    v-if="hasChangePermission"
    slot="right"
    :text="$t('buttonText')"
    @click="$emit('openPopupInvite')"
  />

</PageHeader>
</template>

<script lang="ts">
import Vue from 'vue';
import { Button, PageHeader, TextField, SwitchBox } from '@protocol-one/ui-kit';
import i18n from './i18nHeader';

export default Vue.extend({
  i18n,
  components: { Button, PageHeader, TextField, SwitchBox },
  props: {
    showInvites: {
      default: false,
      type: Boolean,
    },
    hasUsers: {
      default: false,
      type: Boolean,
    },
    hasChangePermission: {
      default: false,
      type: Boolean,
    },
  }
});
</script>

<style lang="scss" scoped>
.search {
  max-width: 190px;
}
.showInvites {
  margin-bottom: 0;
  margin-right: 12px;
  cursor: pointer;
  .switch {
    margin-left: 10px;
    position: relative;
    top: 6px;
  }
}
</style>
