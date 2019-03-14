<template>
<div>
  <div
    :class="['tip-with-notifications', {_show: isShowNotifyTip || isHover}]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div
      v-for="n in last3Notification"
      :key="n.id"
      :class="['item', {_unread: !n.isRead}]"
      @click="open(n)"
    >
      {{ n.title }}
      <svg
        v-show="n.haveMsg"
        class="have-msg"
        width="16"
        height="13"
        viewBox="0 0 16 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.1408 0H1.85739C0.832873 0 0 0.83107 0 1.85736V9.22777C0 10.2523 0.83107 11.0852 1.85739 11.0852H3.15415L4.2951 12.613C4.37211 12.7097 4.62466 12.9999 5.01154 12.9999C5.18527 12.9999 5.45572 12.9229 5.70827 12.5933L6.84921 11.0852H14.1426C15.1671 11.0852 16 10.2541 16 9.22777V1.87529C15.9964 0.850754 15.1653 0 14.1408 0ZM15.2818 9.2457C15.2818 9.88333 14.7588 10.3866 14.1408 10.3866H6.65397C6.53754 10.3866 6.44082 10.444 6.36381 10.5228L5.12614 12.1867C5.04913 12.2834 5.00971 12.3031 5.00971 12.3031C4.99 12.3031 4.91299 12.2458 4.87359 12.1867L3.63593 10.5228C3.5786 10.426 3.4622 10.3866 3.34577 10.3866H1.87529C1.23766 10.3866 0.734349 9.86365 0.734349 9.2457V1.87529C0.734349 1.23766 1.25735 0.734349 1.87529 0.734349H14.1587C14.7963 0.734349 15.2997 1.25735 15.2997 1.87529V9.2457H15.2818ZM13.0375 5.62765C13.0375 5.82109 12.8835 5.97512 12.69 5.97512H3.26878C3.07534 5.97512 2.92132 5.82109 2.92132 5.62765C2.92132 5.43421 3.07537 5.28019 3.26878 5.28019H12.69C12.8835 5.26048 13.0375 5.4163 13.0375 5.62765ZM13.0375 7.7752C13.0375 7.96864 12.8835 8.12267 12.69 8.12267H3.26878C3.07534 8.12267 2.92132 7.96862 2.92132 7.7752C2.92132 7.58179 3.07537 7.42774 3.26878 7.42774H12.69C12.8835 7.40803 13.0375 7.56205 13.0375 7.7752ZM2.90161 3.49981C2.90161 3.30637 3.05566 3.15235 3.24907 3.15235H8.91615C9.10959 3.15235 9.26361 3.3064 9.26361 3.49981C9.26361 3.69323 9.10956 3.84728 8.91615 3.84728H3.26878C3.07534 3.86879 2.90161 3.69326 2.90161 3.49981Z"
          fill="black"
        />
      </svg>
      <div class="created-at">{{ formatDate(n.createdAt) }}</div>
    </div>
    <router-link
      @click.native="isHover = false"
      to="/notifications"
      class="show-all"
    >Show all</router-link>
  </div>
  <NotificationModal
    v-if="selectedNotify !== null"
    @close="updateSelectedNotify(null)"

    :title="selectedNotify.title"
    :message="selectedNotify.message"
    :createdAt="selectedNotify.createdAt"
  />
</div>
</template>

<script type="ts">
  import Vue from 'vue'
  import { mapState, mapActions, mapMutations } from 'vuex';
  import formatDate from '@/helpers/formatDate';
  import NotificationModal from '@/components/NotificationModal.vue';

  export default Vue.extend({
    components: { NotificationModal },
    data() {
      return {
        notifyId: '',
        isHover: false,
        timeCtx: null,
      }
    },
    watch: {
      isShowNotifyTip(value) {
        if (value) {
          clearTimeout(this.timeCtx);
          this.timeCtx = setTimeout(() => {
            const readNow = this
              .last3Notification
              .filter(n => !n.isRead && !n.haveMsg)
              .map(n => n.id);
            this.readNotifys(readNow);
          }, 2000);
        }
      }
    },
    computed: {
      ...mapState(['notifications', 'isShowNotifyTip', 'selectedNotify']),
      last3Notification() {
        return this.notifications.slice(-3);
      }
    },
    methods: {
      ...mapActions(['readNotifys', 'openNotify']),
      ...mapMutations(['updateSelectedNotify']),
      open(notify) {
        if (!notify.haveMsg) {
          return;
        }
        this.openNotify(notify.id);
        this.isHover = false;
      },
      formatDate(date) {
        return formatDate(
          new Date(date),
          'dd LLLL yyyy, HH:mm',
          this.$i18n.locale,
          this.$i18n.fallbackLocale
        );
      },
    },
  })
</script>

<style scoped lang="scss">
.tip-with-notifications {
  background-color: white;
  border-radius: 2px;
  position: fixed;
  z-index: 10;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
  padding: 0;
  font-size: 14px;
  line-height: 16px;
  color: #333333;

  transition: all 0.2s ease-out;
  visibility: hidden;
  opacity: 0;

  left: 80px;
  bottom: 142px;
  width: 277px;

  &._show {
    visibility: visible;
    opacity: 1;
    left: 70px;
  }
  &:before {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    left: -7px;
    bottom: 13px;
    transform: rotate(45deg);
    background-color: white;
  }
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 50px;
    left: -27px;
    bottom: 7px;
  }
}
.show-all {
  cursor: pointer;
  text-align: center;
  display: block;
  margin: 14px 0;
}
.item {
  height: 67px;
  color: #999999;
  padding-left: 38px;
  padding-top: 18px;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #BCD6F4;
  }
  &._unread:before {
    content: '';
    display: block;
    position: absolute;
    left: 12px;
    top: 22px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #FFA338;
    border: 2px solid #203D5F;
    box-sizing: border-box;
  }
  .have-msg {
    position: absolute;
    top: 21px;
    right: 17px;
    display: block;
  }
  .created-at {
    right: 16px;
    bottom: 3px;
    font-size: 10px;
    text-align: right;
    position: absolute;
  }
}
</style>