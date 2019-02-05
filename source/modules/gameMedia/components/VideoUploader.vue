<template>
<div
  :class="['uploader', small ? '_small' : '']"
>
  <video
    v-if="!!source"
    width="400"
    height="300"
    preload
    :src="source"
  />
  <div class="blank" />
  <Button
    :text="source ? replaceText : uploadText"
    @click="$emit('click')"
  />
  <a
    v-if="!!source"
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
      default: 'Upload',
      type: String,
    },
    replaceText: {
      default: 'Replace',
      type: String,
    },
    removeText: {
      default: 'Remove',
      type: String,
    },
    source: {
      default: '',
      type: String,
    },
    small: {
      default: false,
      type: Boolean,
    }
  },
  methods: {}
})
</script>

<style scoped lang="scss">
.uploader {
  height: 248px;
  background-color: #f6f6f6;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  overflow: hidden;

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

  video {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: cover;
  }

  .remove {
    margin-top: 10px;
    font-size: 15px;
    color: black;
    cursor: pointer;
    z-index: 1;
  }

  .blank {
    opacity: 0.6;
    background-color: #f6f6f6;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
