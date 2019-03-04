<template>
<Header
  :level="level"
  :has-margin="hasMargin"
>
  <slot />
  <span
    v-if="info"
    class="header-point"
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0C2.6917 0 0 2.69157 0 6C0 9.30843 2.6917 12 6 12C9.30816 12 11.9997 9.30843 12 6C12 2.69157 9.30843 0 6 0ZM6 11.208C3.12824 11.208 0.792027 8.87162 0.792027 6C0.792027 3.12837 3.12824 0.792027 6 0.792027C8.87176 0.792027 11.208 3.12837 11.208 6C11.2077 8.87162 8.87149 11.208 6 11.208Z"
      />
      <path
        d="M6.00006 2.47491C5.6624 2.47491 5.3877 2.74975 5.3877 3.08728C5.38756 3.25084 5.45119 3.40462 5.56683 3.52026C5.68246 3.63589 5.83638 3.69965 6.00006 3.69965C6.33773 3.69965 6.61243 3.42495 6.61243 3.08728C6.61243 2.74962 6.33773 2.47491 6.00006 2.47491Z"
      />
      <path
        d="M5.99984 4.7049C5.71484 4.7049 5.48291 4.93683 5.48291 5.22182V9.13642C5.48291 9.42128 5.71484 9.65295 5.99984 9.65295C6.28457 9.65295 6.51651 9.42128 6.51664 9.13642V5.22182C6.51664 4.93683 6.28484 4.7049 5.99984 4.7049Z"
      />
    </svg>
    <div class="header-tooltop">
      <b>{{ title }}</b>
      {{ info }}
    </div>
  </span>
</Header>
</template>

<script type="ts">
import Vue from 'vue';
import { includes } from 'lodash-es';
import { Checkbox, Header } from '@protocol-one/ui-kit';

export default Vue.extend({
  components: { Header, Checkbox },
  props: {
    hasMargin: {
      default: true,
      type: Boolean,
    },
    title: {
      default: '',
      type: String,
    },
    info: {
      default: '',
      type: String,
    },
    level: {
      default: '2',
      type: String,
      validator(value) {
        return includes(['1', '2', '3', '4'], value);
      },
    },
  },
});
</script>

<style scoped lang="scss">
.header-point {
  margin-left: 8px;
  line-height: 11px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  svg {
    fill: #b1b1b1;
    transition: fill 0.2s ease-out;
  }
  &:hover {
    svg {
      fill: #2275d7;
    }
    > .header-tooltop {
      visibility: visible;
      opacity: 1;
      left: 30px;
    }
  }
}
.header-tooltop {
  transition: all 0.2s ease-out;
  visibility: hidden;
  opacity: 0;
  width: 293px;
  min-height: 80px;
  background-color: white;
  border-radius: 4px;
  position: absolute;
  pointer-events: none;
  z-index: 10;
  top: -35px;
  left: 40px;
  box-shadow: 0 0 40px #ddd;
  padding: 22px 15px 22px 22px;
  font-size: 14px;
  line-height: 16px;
  color: #333333;
  b {
    display: block;
    margin-bottom: 4px;
  }
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
}
</style>