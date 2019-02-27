<template>
<div class="review">
  <span
    class="number"
    v-text="number"
  />
  <div class="right">
    <div class="main">
      <TextField
        class="press_name"
        :label="$t('press_name')"
        :value="review.pressName"
        @input="value => change('pressName', value)"
      />
      <TextField
        class="link"
        :label="$t('link')"
        :value="review.link"
        @input="value => change('link', value)"
      />
      <Select
        class="score"
        :label="$t('score')"
        :value="review.score"
        :options="[
          {value: '1', label: '1'},
          {value: '2', label: '2'},
          {value: '3', label: '3'},
          {value: '4', label: '4'},
          {value: '5', label: '5'},
          {value: '6', label: '6'},
          {value: '7', label: '7'},
          {value: '8', label: '8'},
          {value: '9', label: '9'},
          {value: '10', label: '10'},
        ]"
        @input="value => change('score', value)"
      />
    </div>
    <TextField
      class="quote"
      :label="$t('quote')"
      :value="review.quote"
      @input="value => change('quote', value)"
    />
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { TextField, Select } from '@protocol-one/ui-kit';
  import i18n from '../i18n';

  export default Vue.extend({
    i18n,
    components: { TextField, Select },
    props: {
      number: {
        type: Number,
        default: 1,
      },
      review: {
        type: Object,
        required: true,
      },
    },
    computed: {},
    methods: {
      change(field, value){
        this.$emit('input', {
          ...this.review,
          ...{[field]: value}
        });
      }
    },
  })
</script>

<style scoped lang="scss">
.review {
  display: flex;
  .number {
    flex: 0 0 16px;
    font-size: 12px;
    text-align: center;
    background-color: #e2e2e2;
    color: #808080;
    border-radius: 12px;
    height: 16px;
    margin-top: 30px;
    margin-right: 14px;
    line-height: 17px;
    cursor: default;
  }
  .right {
    width: 100%;
  }
  .main {
    display: flex;
    > * {
      padding-bottom: 13px;
    }
    .press_name {
      margin-right: 16px;
    }
    .link {
      margin-right: 16px;
    }
  }
}
</style>