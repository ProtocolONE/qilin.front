<template>
<UiModal
  @close="$emit('close')"
  class=""
>
  <h3 slot="header">{{ title }}</h3>
  <div slot="main" class="message">
    {{ message }}
  </div>
  <div class="notify-footer" slot="footer">
    <div class="date">{{ formatDate(createdAt) }}</div>
    <Button @click="okClick">{{ $t('ok') }}</Button>
  </div>
</UiModal>
</template>

<script type="ts">
  import Vue from 'vue'
  import formatDate from '@/helpers/formatDate';
  import { Button, UiModal } from '@protocol-one/ui-kit'

  export default Vue.extend({
    components: { UiModal, Button },
    props: {
      title: {
        type: String,
      },
      message: {
        type: String,
      },
      createdAt: {
        type: String,
      }
    },
    methods: {
      okClick() {
        this.$emit('close');
      },
      formatDate(date) {
        return formatDate(
          new Date(date),
          'dd LLLL yyyy, HH:mm',
          this.$i18n.locale,
          this.$i18n.fallbackLocale
        );
      },
    }
  })
</script>

<style scoped lang="scss">
.message, .date {
  cursor: default;
}
.notify-footer, .message {
  font-size: 16px;
  color: #B1B1B1;
}
.message {
  min-width: 430px;
}
.notify-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.date {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>