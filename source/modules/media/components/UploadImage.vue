
<template>
  <div class="upload-image">
    <Button color="orange"
            glyph="plus"
            v-bind="{ text }"/>
  </div>
</template>

<script type="ts">
  import Vue from 'vue'
  import Button from '@/components/ui-kit/Button'

  export default Vue.extend({
    props: {
      text: {
        default: 'Upload image',
        type: String,
      }
    },
    components: {Button},
    name: "UploadImage",
    data: () => ({
      enabled: true
    }),
  })
</script>

<style scoped lang="scss">
  .upload-image {
    width: 795px;
    height: 293px;
    background: #C4C4C4;
    border: 1px solid #000000;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
