<template>
<div class="search-input">
  <svg
    class="lupe"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
      fill="#B1B1B1"
    />
  </svg>
  <div class="input">
    <TextField
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
    />
  </div>
  <svg
    v-if="value.length > 0"
    @click="$emit('input', '')"
    class="close"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.11734 0.322885C8.54781 -0.107628 9.24575 -0.107628 9.67623 0.322885C10.1067 0.753398 10.1067 1.4514 9.67623 1.88191L1.88175 9.67704C1.45128 10.1075 0.753335 10.1075 0.322858 9.67704C-0.107619 9.24652 -0.107619 8.54852 0.322858 8.11801L8.11734 0.322885Z"/>
    <path d="M9.67714 8.11809C10.1076 8.5486 10.1076 9.2466 9.67714 9.67711C9.24666 10.1076 8.54872 10.1076 8.11825 9.67711L0.323768 1.88199C-0.106709 1.45147 -0.106709 0.753474 0.323769 0.322962C0.754246 -0.107551 1.45219 -0.107551 1.88266 0.322962L9.67714 8.11809Z"/>
  </svg>
</div>
</template>

<script type="ts">
  import { TextField } from '@protocol-one/ui-kit';

  export default {
    components: { TextField },
    props: {
      value: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        default: 'Search...',
      },
    },
  }
</script>

<style scoped lang="scss">
.search-input {
  position: relative;
  .lupe {
    position: absolute;
    top: calc(50% - 9px);
    left: 0;
  }
  .input {
    margin-left: 23px;
    margin-right: 23px;
  }
  .close {
    position: absolute;
    top: calc(50% - 9px);
    right: 0;
    fill: #B1B1B1;
    cursor: pointer;
    width: 17px;
    height: 17px;
    &hover {
      fill: #202020;
    }
  }
}
</style>