<template>
  <button :class="buttonClasses" @click="$emit('click')">
    {{ text.toUpperCase() }}
  </button>
</template>

<script type="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: "LangButton",
    props: {
      text: {
        type: String,
        require: true,
      },
      select: {
        type: Boolean,
        default: false,
      },
      filled: {
        type: Boolean,
        default: false,
      },
    },
    data: () => ({}),
    computed: {
      buttonClasses() {
        let result = [];
        if (this.select) result.push('select');
        if (this.filled) result.push('filled');
        return result.join(' ')
      },
    },
  })
</script>

<style scoped lang="scss">

  button {
    background: #FFFFFF;
    border: 1.1px solid #979797;
    border-radius: 3px;
    color: #979797;
    margin-right: 7px;
    margin-top: 6px;
    font-size: 14px;
    padding: 2px 11px 0px 11px;
    cursor: pointer;

    &.select {
      border-color: #5AC1F0;
      color: #5AC1F0;
    }

    &:active, &:focus {
      outline: none;
    }
  }

</style>