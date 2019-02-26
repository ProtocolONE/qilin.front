<template>
<div
  :class="['uploader', {_small: isSmall, _dragover: isDragOver}]"
  @dragover.prevent="isDragOver = true"
  @dragleave="isDragOver = false"
  @drop.prevent="dropFile"
>
  <img
    v-if="!isVideo && !!source"
    class="source"
    :src="source"
  >
  <video
    v-if="isVideo && !!source"
    class="source"
    width="400"
    height="300"
    preload
    :src="source"
  />
  <div class="blank" />
  <Button
    v-if="hasUploadBtn"
    :text="source ? replaceText : uploadText"
    @click="$emit('click')"
  />
  <Button
    v-if="!!source || hasRemoveBtn"
    :text="removeText"
    color="orange"
    @click="$emit('clickRemove')"
  />
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
    isSmall: {
      default: false,
      type: Boolean,
    },
    hasRemoveBtn: {
      default: false,
      type: Boolean,
    },
    hasUploadBtn: {
      default: true,
      type: Boolean,
    },
    isVideo: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
      isDragOver: false,
    }),
  methods: {
    dropFile(event) {
      event.stopPropagation();
      event.preventDefault();
      this.isDragOver = false;
      this.$emit('dropFile', event.dataTransfer.files[0]);
    }
  },
})
</script>

<style scoped lang="scss">
.uploader {
  height: 248px;
  background-color: #f6f6f6;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  overflow: hidden;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;

  &._small {
    height: 160px;
  }

  .source {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    object-fit: cover;
  }

  .blank {
    opacity: 0.5;
    background-color: #f6f6f6;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &._dragover .blank {
    background-color: red;
  }

  button {
    margin: 4px;
  }
}
</style>
