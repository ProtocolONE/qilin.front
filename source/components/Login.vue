<template>
<Modal
  @close="$emit('close')"
>
  <div
    slot="body"
    class="auth1"
    ref="auth1"
  />
</Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import P1AuthWebSdk from 'payone-js-sdk';
import Modal from '@/components/Modal.vue';

export default Vue.extend({
  components: { Modal },
  mounted() {
    const authForm = new P1AuthWebSdk({
      apiUrl: process.env.AUTH1_ISSUER_URL,
      clientID: process.env.AUTH1_CLIENT_ID,
      redirectUri: `${process.env.POST_MESSAGE_TARGET_ORIGIN}/auth1/callback`,
      state: btoa({key: '1234567890'}),
      // language: 'en',
    });
    authForm.on('tokenReceived', this.message.bind(this));
    authForm.render(this.$refs.auth1);
  },
  methods: {
    message(value) {
      console.log(11111, 'value', value)
    },
  },
});
</script>

<style scoped lang="scss">
.auth1 {

}
</style>