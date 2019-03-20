<template>
<UiModal @close="$emit('close')">
  <iframe
    slot="main"
    class="auth1"
    width="100%"
    height="100%"
    :src="frameSrc"
  ></iframe>
</UiModal>
</template>

<script lang="ts">
import Vue from 'vue';
import { get } from 'lodash-es';
import { UiModal } from '@protocol-one/ui-kit'

export default Vue.extend({
  components: { UiModal },
  computed: {
    frameSrc() {
      return `${window.location.protocol}//${window.location.hostname}/auth1/login`
    }
  },
  created () {
    this.listenFrame()
  },
  methods: {
    listenFrame () {
      window.addEventListener('message', event => {
        try {
          const data: any = JSON.parse(event);
          const accessToken = get(data, 'access_token', '');

          if (accessToken && get(data, 'success', false)) {
            localStorage.setItem('accessToken', accessToken);
            location.reload();
          }
        } catch (e) {}
      })
    }
  },
});
</script>

<style scoped lang="scss">
.auth1 {
  display: block;
  width: 400px;
  height: 500px;
  border: none;
}
</style>