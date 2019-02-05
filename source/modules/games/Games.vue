<template>
<div class="page">
  <b-row>
    <b-col class="left">
      <div class="center" />
    </b-col>
    <b-col class="right">
      <div class="center">
        <h1>Games</h1>
        <Button
          :text="$t('create_new_game')"
          @click="showModal = true"
        />
      </div>
    </b-col>
  </b-row>

  <CreateGame
    v-if="showModal"
    :vendor-id="vendors[0].id"
    @close="showModal = false"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import {Button} from '@protocol-one/ui-kit';
import CreateGame from '../gameCreate/CreateGame';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: {Button, CreateGame},
  data: () => ({
      showModal: false,
  }),
  computed: {
    ...mapState('Games', ['vendors']),
  },
  watch: {
    vendors() {
      if (!this.vendors.length) {
        alert('No any vendors');
        this.$router.push({path: '/vendor/on-boarding'});
      }
    }
  },
  mounted() {
    this.preload();
  },
  methods: {
    ...mapActions('Games', ['preload']),
  }
});
</script>

<style scoped lang="scss">
.page {
  position: relative;
  min-height: 100vh;

  > .row {
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
</style>
