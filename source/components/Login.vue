<template>
<<<<<<< HEAD
<UiModal
  @close="$emit('close')"
>
  <iframe
    class="auth1"
=======
<UiModal @close="$emit('close')">
  <iframe
    class="auth"
>>>>>>> 74bc64d... Change Modal to UiModal
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
<<<<<<< HEAD
import { UiModal } from '@protocol-one/ui-kit'
=======
import { UiModal } from '@protocol-one/ui-kit';

interface Auth1Message {
  access_token: string;
  success: boolean;
  error: string;
  expires_in: number;
}
>>>>>>> 74bc64d... Change Modal to UiModal

export default Vue.extend({
  components: { UiModal },
  computed: {
    frameSrc() {
      return '/auth1/login';
    }
  },
  created () {
    this.listenFrame();
  },
  methods: {
    listenFrame () {
      window.addEventListener('message', (e) => {
<<<<<<< HEAD
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
=======
        try {
          const data: Auth1Message = JSON.parse(e.data);

          if (data.access_token && data.success) {
            localStorage.setItem('accessToken', data.access_token);
            location.reload();
          }
        } catch (e) {}
      });
    },
>>>>>>> 74bc64d... Change Modal to UiModal
  },
});
</script>

<style scoped lang="scss">
.auth {
  display: block;
<<<<<<< HEAD
  width: 400px;
  height: 500px;
  border: none;
=======
  min-height: 300px;
  border-width: 0;
>>>>>>> 74bc64d... Change Modal to UiModal
}
</style>