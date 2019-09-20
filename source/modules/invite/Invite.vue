<template>
<div class="invite-wrapper">
  <UiPageHeader :title="$t('title')">
    <UiButton
      slot="right"
      v-text="$t('accept')"
      @click="accept({ inviteId, vendorId: currentVendorId })"
    />
  </UiPageHeader>

  <div class="content">
    <IconDummy />
    <span class="dummy-text">
      {{ $t('dummy') }}
    </span>
  </div>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { UiButton, UiPageHeader } from '@protocol-one/ui-kit';
import IconDummy from '@/components/IconDummy.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { IconDummy, UiButton, UiPageHeader },
  computed: {
    ...mapState('Invite', ['hasAccepted']),

    currentVendorId() {
      return this.$route.params.vendorId;
    },
    inviteId() {
      return this.$route.params.inviteId;
    },
  },
  mounted() {
    this.initSate();
  },
  methods: {
    ...mapActions(['fetchPermissions', 'fetchVendors']),
    ...mapActions('Invite', ['initSate', 'accept']),
  },
  watch: {
    hasAccepted(val) {
      if (val === true) {
        this.fetchVendors().then(() => {
          this.fetchPermissions().then(() => {
            this.$router.replace({ name: 'home' });
          });
        });
      }
    },
  },
});
</script>

<style scoped lang="scss">
.invite-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.dummy-text {
  display: block;
  color: #b1b1b1;
  text-align: center;
  margin-top: 20px;
}
</style>
