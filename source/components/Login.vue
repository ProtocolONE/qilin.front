<template>
<Modal
  @close="$emit('close')"
>
  <iframe
    class="auth1"
    slot="body"
    :src="frameSrc"
    width="100%"
    height="100%"
    @message="message"
  ></iframe>
</Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/Modal.vue';

interface Auth1Message {
  access_token: string;
  success: boolean;
  error: string;
  expires_in: number;
}

export default Vue.extend({
  components: { Modal },
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
        let data: Auth1Message;
        try {
          data = JSON.parse(e.data);
        } catch (e) { }
        if (data.access_token && data.success) {
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
  min-height: 300px;
  border: none;
}
</style>