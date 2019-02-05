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
          color="orange"
          :text="$t('create_new_game')"
          @click="showCreateGameModal = true"
        />
      </div>
    </b-col>
  </b-row>

  <CreateGame
    v-if="showCreateGameModal"
    :vendor-id="vendor.id"
    @close="showCreateGameModal = false"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '@/config';
import Button from '@protocol-one/ui-kit/src/Button.vue';
import CreateGame from '../../components/CreateGame.vue';
import i18n from './texts';
import {Vendor} from './types';

export default Vue.extend({
  i18n,
  name: 'VendorGames',
  components: {Button, CreateGame},
  data: () => ({
      vendor: Vendor,
      showCreateGameModal: false,
  }),
  mounted(){
    // Get latest created vendor
    axios
      .get(`${config.api}/api/v1/vendors`, {params:{limit: 1}})
      .then(res => {
        if (!res.data.length) {
          alert('No any vendors');
          this.$router.push({path: '/vendor/on-boarding'});
        } else {
          this.vendor = res.data[0];
        }
      });
  },
  methods: {},
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
