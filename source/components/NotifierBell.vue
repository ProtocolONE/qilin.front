<template>
<div class="notifier">
  <router-link
    to="/notifications"
    :class="['bell', {_new: isNew}]"
    @mouseenter.native="hoverBell"
    @mouseleave.native="leaveBell"
  >
    <svg
      width="14"
      height="20"
      viewBox="0 0 14 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 19.0123C7.9625 19.0123 8.75 18.181 8.75 17.1649H5.25C5.25 18.181 6.02875 19.0123 7 19.0123ZM12.25 12.4701V7.85153C12.25 5.01575 10.815 2.64181 8.3125 2.01369V1.38557C8.3125 0.618886 7.72625 0 7 0C6.27375 0 5.6875 0.618886 5.6875 1.38557V2.01369C3.17625 2.64181 1.75 5.00651 1.75 7.85153V12.4701L0 14.3175V15.2412H14V14.3175L12.25 12.4701Z"
      />
    </svg>
  </router-link>
</div>
</template>

<script type="ts">
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapState(['notifications']),
    isNew() {
      return this.notifications.filter(n => !n.isRead).length > 0;
    }
  },
  methods: {
    ...mapMutations(['showNotifyTip']),
    hoverBell() {
      this.showNotifyTip(true);
    },
    leaveBell() {
      this.showNotifyTip(false);
    }
  },
})
</script>

<style scoped lang="scss">
.notifier {
  margin-bottom: 20px;
  position: relative;
}
.bell {
  padding: 8px;
  cursor: pointer;
  margin-left: 24px;
  display: inline-block;
  position: relative;
  svg {
    fill: #6B85A2;
    transition: fill 0.3s ease;
  }
  &:hover {
    svg {
      fill: white;
    }
  }
  &._new:after {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #FFA338;
    border: 2px solid #203D5F;
    box-sizing: border-box;
    position: absolute;
    right: 4px;
    top: 9px;
    display: block;
  }
}
</style>