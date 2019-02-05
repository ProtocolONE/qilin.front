<template>
<div
  class="upload-image"
  :style="`background-image: url(${image})`"
>
  <div class="blank"></div>
  <Button
    color="orange"
    glyph="plus"
    :text="image ? replaceText : uploadText"
    @click="$emit('click')"
  ></Button>
  <a
    v-if="!!image"
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
import Button from '@protocol-one/ui-kit/src/Button.vue'

export default Vue.extend({
  name: "UploadImage",
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
    image: {
      default: '',
      type: String,
    }
  },
  methods: {}
})
</script>

<style scoped lang="scss">
.upload-image {
  width: 795px;
  height: 293px;
  background-color: #c4c4c4;
  border: 1px solid #000000;
  border-radius: 4px;

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
    background-color: #c4c4c4;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
