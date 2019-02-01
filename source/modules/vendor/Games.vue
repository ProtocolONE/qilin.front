<template>
<div class="page">
  <b-row>
    <b-col class="left">
      <div class="center" />
    </b-col>
    <b-col class="right">
      <div class="center">
        <h1>Games</h1>

          <Button color="orange"
                  @click="showCreateGameModal = true"
                  :text="$t('create_new_game')"></Button>

      </div>
    </b-col>
  </b-row>

  <CreateGame v-if="showCreateGameModal" @close="showCreateGameModal = false" :vendorId="vendor.id"></CreateGame>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import axios from 'axios';
import config from '@/config';
import Button from '../../components/ui-kit/Button';
import CreateGame from '../../components/CreateGame';
import i18n from './texts';
import {Vendor} from './types';

export default Vue.extend({
  i18n,
  components: {Button, CreateGame},
  name: 'VendorGames',
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
      })
      .catch(err => {
        alert(err.message);
      });
  },
  data: () => ({
      vendor: Vendor,
      showCreateGameModal: false,
  }),
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
