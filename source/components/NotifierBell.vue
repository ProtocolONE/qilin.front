<template>
<div class="notifier">
  <div class="bell">
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
    <div class="tooltip">
      <div v-for="n in notifications">
        {{ n.name }}
      </div>
      <a>Show all</a>
    </div>
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue'
  import { mapState } from 'vuex';

  export default Vue.extend({
    computed: {
      ...mapState(['notifications']),
    },
    watch: {
      notifications(value) {
        //...
      }
    },
    methods: {
      //...
    },
  })
</script>

<style scoped lang="scss">
.notifier {
  margin-bottom: 20px;
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
  .tooltip {
    transition: all 0.2s ease-out;
    visibility: hidden;
    opacity: 0;
    min-width: 100px;
    min-height: 80px;
    background-color: white;
    border-radius: 4px;
    position: absolute;
    z-index: 10;
    top: -20px;
    left: 55px;
    box-shadow: 0 0 40px #ddd;
    padding: 22px 15px 22px 22px;
    font-size: 14px;
    line-height: 16px;
    color: #333333;
    &:before {
      content: '';
      width: 20px;
      height: 20px;
      position: absolute;
      left: -9px;
      top: 30px;
      transform: rotate(45deg);
      background-color: white;
    }
    &:after {
      content: '';
      width: 40px;
      height: 20px;
      position: absolute;
      left: -19px;
      top: 30px;
    }
  }
  &:hover {
    svg {
      fill: white;
    }
    > .tooltip {
      visibility: visible;
      opacity: 1;
      left: 45px;
    }
  }
}
</style>