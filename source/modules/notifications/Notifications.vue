<template>
<div class="notifications-page">
  <UiTable v-if="hasNotifications">
    <NotifyItem
      v-for="notify in notifications"
      :key="notify.id"
      :notify="notify"
    />
  </UiTable>
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex';
  import { UiTable } from '@protocol-one/ui-kit';
  import NotifyItem from './components/NotifyItem.vue';

  export default Vue.extend({
    components: { NotifyItem, UiTable },
    data: () => ({

    }),
    computed: {
      ...mapState('Notifications', ['notifications']),

      hasNotifications() {
        return !!this.notifications.length;
      },
    },
    mounted() {
      this.initState();
    },
    methods: {
      ...mapActions('Notifications', ['initState']),
    },
    watch: {},
  });
</script>

<style scoped lang="scss">
.notifications-page {

}
</style>
