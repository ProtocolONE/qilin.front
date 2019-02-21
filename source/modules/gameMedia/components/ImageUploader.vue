<template>
<div
  :class="['uploader', small ? '_small' : '', dragOver ? 'drag-over' : '']"
  :style="`background-image: url(${source})`"
  @dragover.prevent="dragOver = true"
  @dragleave="dragOver = false"
  @drop.prevent="dropFile"
>
  <div class="blank"/>
  <Button
    v-if="uploadBtn"
    :text="source ? replaceText : uploadText"
    @click="$emit('click')"
  />
  <Button
    v-if="!!source || removeBtn"
    :text="removeText"
    @click="$emit('clickRemove')"
    color="orange"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue'
import {Button} from '@protocol-one/ui-kit'

export default Vue.extend({
  components: {Button},
  data: () => {
    return {
      dragOver: false,
    };
  },
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
    },
    uploadBtn: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    dropFile(event) {
      event.stopPropagation();
      event.preventDefault();
      this.dragOver = false;
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

  .blank {
    opacity: 0.5;
    background-color: #f6f6f6;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  &.drag-over .blank {
    background-color: red;
  }

  button {
    margin: 4px;
  }
}
</style>
