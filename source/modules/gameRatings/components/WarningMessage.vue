<template>
<transition name="fade">
  <div class="message-panel" v-if="!hide">
    <svg
      class="sign"
      width="46"
      height="39"
      viewBox="0 0 46 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.77865 35.984C0.992373 37.3173 1.95355 39 3.50138 39H42.4986C44.0465 39 45.0076 37.3173 44.2214 35.984L24.7227 2.92115C23.949 1.60911 22.051 1.60911 21.2773 2.92115L1.77865 35.984Z" fill="#FFA338"
      />
      <g filter="url(#filter0_d)">
        <rect x="21" y="15" width="4" height="10" rx="2" fill="white"/>
        <rect x="21" y="27" width="4" height="4" rx="2" fill="white"/>
      </g>
      <defs>
        <filter id="filter0_d" x="17" y="13" width="12" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.510917 0 0 0 0 0.294815 0 0 0 0 0.138327 0 0 0 0.47 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>
    <div class="inner">
      <slot></slot>
    </div>
    <svg
      class="close"
      @click="hide = true"
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.9706 5.65685C16.5801 5.26636 15.9469 5.26632 15.5564 5.65685L11.3137 9.89949L7.07108 5.65685C6.68058 5.26636 6.0474 5.26632 5.65687 5.65685C5.26635 6.04737 5.26637 6.68057 5.65687 7.07107L9.89951 11.3137L5.65687 15.5563C5.26634 15.9469 5.26637 16.5801 5.65687 16.9706C6.04736 17.3611 6.68055 17.3611 7.07108 16.9706L11.3137 12.7279L15.5564 16.9706C15.9469 17.3611 16.58 17.3611 16.9706 16.9706C17.3611 16.58 17.3611 15.9468 16.9706 15.5563L12.7279 11.3137L16.9706 7.07107C17.3611 6.68054 17.3611 6.04735 16.9706 5.65685Z" fill="#C4C4C4"
      />
    </svg>
  </div>
</transition>
</template>

<script type="ts">
  import Vue from 'vue'
  export default Vue.extend({
    data: () => ({
      hide: false,
    }),
  })
</script>

<style scoped lang="scss">
.message-panel {
  background: #FFF4E3;
  border-radius: 4px;
  padding: 30px;
  padding-left: 105px;
  padding-right: 60px;
  position: relative;
  cursor: default;
  margin-bottom: 40px;
  .sign {
    position: absolute;
    top: calc(50% - 20px);
    left: 30px;
  }
  .close {
    position: absolute;
    top: calc(50% - 11px);
    right: 30px;
    cursor: pointer;
  }
}
</style>