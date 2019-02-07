<template>
<div
  :class="['uploader', small ? '_small' : '']"
  :style="`background-image: url(${source})`"
>
  <div class="blank" />
  <Button
    :text="source ? replaceText : uploadText"
    @click="$emit('click')"
  />
  <a
    v-if="!!source || removeBtn"
    class="remove"
    href="/"
    @click.prevent="$emit('clickRemove')"
  >
    {{ removeText }}
  </a>
</div>
</template>

<script type="ts">
import Vue from 'vue'
import {Button} from '@protocol-one/ui-kit'

export default Vue.extend({
  components: {Button},
  props: {
    uploadText: {
      default: 'Upload image',
      type: String,
    },
    replaceText: {
      default: 'Replace image',
      type: String,
    },
    removeText: {
      default: 'Remove image',
      type: String,
    },
    source: {
      default: '',
      type: String,
    },
    small: {
      default: false,
      type: Boolean,
    },
    removeBtn: {
      default: false,
      type: Boolean,
    }
  }
})
</script>

<style scoped lang="scss">
.uploader {
  height: 248px;
  background-color: #f6f6f6;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;

  &._small {
    height: 160px;
  }

  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;

  .remove {
    margin-top: 10px;
    font-size: 15px;
    color: black;
    cursor: pointer;
    z-index: 1;
  }

  .blank {
    opacity: 0.5;
    background-color: #f6f6f6;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
