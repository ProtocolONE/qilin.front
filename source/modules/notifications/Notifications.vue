<template>
<div class="notifications">

</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { includes, map, orderBy } from 'lodash-es';
import { UiTable } from '@protocol-one/ui-kit';

export default Vue.extend({
  components: { UiTable },
  data: () => ({
  }),
  computed: {
    ...mapState('Notifications', ['notifications']),
  },
  mounted() {
    this.initState({ router: this.$router });
  },
  methods: {
    ...mapActions('Games', ['initState']),
  },
  watch: {},
});
</script>

<style scoped lang="scss">
.notifications {

}
</style>
