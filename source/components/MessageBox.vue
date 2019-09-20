<template>
<UiModal
  @close="$emit('close')"
>
  <h3
    slot="header"
    class="title"
  >{{ title || $t('title') }}</h3>
  <div
    slot="main"
    class="message"
  >
    {{ message }}
  </div>
  <div
    class="notify-footer"
    slot="footer"
  >
    <Button @click="$emit('close')">{{ $t('ok') }}</Button>
  </div>
</UiModal>
</template>

<script type="ts">
import Vue from 'vue'
import { Button, UiModal } from '@protocol-one/ui-kit'
import i18n from './i18nMessageBox'

export default Vue.extend({
  i18n,
  components: { UiModal, Button },
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      require: true,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss">
.message {
  cursor: default;
}
.notify-footer, .message {
  font-size: 16px;
  color: #B1B1B1;
}
.message, .title {
  min-width: 430px;
  max-width: 500px;
}
.notify-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
