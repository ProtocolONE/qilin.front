<template>
<UiModal @close="$emit('close')">
  <iframe
    slot="main"
    class="auth1"
    height="100%"
    width="100%"
    :src="frameSrc"
  ></iframe>
</UiModal>
</template>

<script lang="ts">
import Vue from 'vue';
import { includes } from 'lodash-es';
import { UiModal } from '@protocol-one/ui-kit';

interface Auth1Message {
  access_token: string;
  success: boolean;
  error: string;
  expires_in: number;
}

export default Vue.extend({
  components: { UiModal },
  props: {
    type: {
      default: 'login',
      type: String,
      validator(value: string) {
        return includes(['login', 'register'], value);
      },
    },
  },
  computed: {
    frameSrc() {
      // @TODO - change 'login' to this.type, when we will have frame for reg
      return '/auth1/login';
    }
  },
  created () {
    this.listenFrame();
  },
  methods: {
    listenFrame () {
      window.addEventListener('message', (e) => {
        try {
          const { access_token, success }: Auth1Message = JSON.parse(e.data);

          if (access_token && success) {
            this.$emit('message', { success: true, accessToken: access_token });
          }
        } catch (error) {
          this.$emit('message', { success: false, error });
        }
      });
    },
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