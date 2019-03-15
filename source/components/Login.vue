<template>
<UiModal
  @close="$emit('close')"
>
  <iframe
    class="auth1"
    slot="main"
    :src="frameSrc"
    width="100%"
    height="100%"
    @message="message"
  ></iframe>
</UiModal>
</template>

<script lang="ts">
import Vue from 'vue';
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
      window.addEventListener('message', (e) => {
        let data: any;
        try {
          data = JSON.parse(e.data);
        } catch (e) { }
        if (data && 'access_token' in data && 'success' in data) {
          localStorage.setItem('accessToken', data.access_token);
          location.reload();
        }
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