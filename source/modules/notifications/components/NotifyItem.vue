<template>
<UiTableRow
  class="notify-item"
  @click.native="$emit('selectNotify', notify)"
>
  <UiTableCell
    :class="['col-unread', {_unread: !notify.isRead}]"
  />
  <UiTableCell class="col-title">
    {{ notify.title }}
  </UiTableCell>
  <UiTableCell class="col-message">
    {{ notify.message }}
  </UiTableCell>
  <UiTableCell class="col-date">{{ formatCreatedDate }}</UiTableCell>
</UiTableRow>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {UiTableCell, UiTableRow} from '@protocol-one/ui-kit';
  import formatDate from '@/helpers/formatDate';

  export default Vue.extend({
    components: { UiTableRow, UiTableCell },
    props: {
      notify: {
        required: true,
        type: Object,
      },
    },
    computed: {
      formatCreatedDate() {
        return formatDate(
          this.notify.createdAt,
          'dd LLLL yyyy, HH:mm',
          this.$i18n.locale,
          this.$i18n.fallbackLocale
        );
      },
    },
  });
</script>

<style lang="scss" scoped>
.notify-item * {
  cursor: pointer;
}
._unread:after {
  content: '';
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #FFA338;
  border: 2px solid #203D5F;
  box-sizing: border-box;
  margin-left: 23px;
}
.col-unread {
  width: 10%;
}
.col-title {
  width: 20%;
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.col-message {
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.col-date {
  width: 20%;
}
</style>
