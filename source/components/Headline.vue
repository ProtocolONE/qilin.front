<template>
<Header
  :level="level"
  :has-margin="hasMargin"
>
  <slot />
  <span
    v-if="options.length"
    class="header-options"
  >
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.5233 7.37962C15.5233 7.12338 15.3287 6.86714 15.0854 6.8159L13.6255 6.55966C13.4795 5.99594 13.2848 5.43222 12.9929 4.91974L13.8201 3.68981C14.0148 3.43357 13.9661 3.12609 13.7715 2.9211L12.7496 1.8449C12.5549 1.63991 12.2629 1.63991 12.0196 1.79366L10.8517 2.66486C10.3651 2.40862 9.82981 2.15239 9.29452 1.99865L9.05121 0.512473C9.00255 0.204989 8.75924 0 8.46726 0H7.05605C6.76408 0 6.56943 0.204989 6.52077 0.512473L6.27745 1.99865C5.6935 2.15239 5.15822 2.40862 4.67159 2.71611L3.45503 1.8449C3.26038 1.69116 2.96841 1.69116 2.77376 1.89615L1.75185 2.97235C1.5572 3.17733 1.50854 3.48482 1.70319 3.74106L2.53045 4.97099C2.23847 5.53471 2.04382 6.09843 1.89783 6.66215L0.486624 6.86714C0.19465 6.91839 0 7.17463 0 7.43086V8.96828C0 9.27577 0.19465 9.48076 0.486624 9.532L1.89783 9.78824C2.04382 10.4032 2.28713 10.9157 2.57911 11.4282L1.75185 12.7093C1.5572 12.9143 1.60586 13.2218 1.80051 13.4268L2.82242 14.503C3.01707 14.708 3.30905 14.7592 3.55236 14.6055L4.72026 13.683C5.25554 13.9905 5.79083 14.1955 6.32612 14.3493L6.52077 15.8867C6.56943 16.1429 6.81274 16.3479 7.10471 16.3479H8.51593C8.8079 16.3479 9.05121 16.1429 9.09987 15.8867L9.34319 14.3493C9.82981 14.1955 10.3651 13.9905 10.8517 13.683L12.0196 14.5542C12.2629 14.708 12.5549 14.708 12.7496 14.503L13.7715 13.4268C13.9661 13.2218 14.0148 12.9143 13.8201 12.6581L12.9929 11.4282C13.2848 10.9157 13.4795 10.352 13.6255 9.78824L15.0854 9.48076C15.3287 9.48076 15.5233 9.22452 15.5233 8.91704V7.37962ZM11.3383 8.19957C11.3383 6.09843 9.73249 4.40727 7.78599 4.40727C5.79083 4.40727 4.18497 6.09843 4.18497 8.19957C4.18497 10.2495 5.79083 11.9406 7.78599 11.9406C9.73249 11.9406 11.3383 10.2495 11.3383 8.19957Z"
      />
    </svg>
    <div
      class="header-tooltop header-option-tooltop"
    >
      <label
        v-for="(checked, index) in options"
        :key="index"
        class="checkbox"
      >
        <Checkbox
          class="check"
          :checked="checked"
          @change="$emit('checked', index)"
        />
        <span class="label">
          {{ optionLabels[index] }}
        </span>
      </label>
    </div>
  </span>

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
    options: {
      default: () => [],
      type: Array,
    },
    optionLabels: {
      default() {
        return this.options.map((_, idx) => `${  idx}`);
      },
      type: Array,
    },
  },
});
</script>

<style scoped lang="scss">
.header-point, .header-options {
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
.header-option-tooltop {
  padding-bottom: 2px;
  pointer-events: auto;
  height: auto;
  .checkbox {
    display: block;
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
</style>