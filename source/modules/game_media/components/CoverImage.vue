<template>
<div class="cover-image">
  <UploadImage
    :upload-text="$t('upload_cover_image')"
    :replace-text="$t('replace_cover_image')"
    :remove-text="$t('remove_cover')"
    :image="value[lang] || ''"
    @click="upload"
    @clickRemove="clickRemove"
  ></UploadImage>
  <LangsBar
    :value="lang"
    :occupied="value"
    @change="selectLang"
  ></LangsBar>
</div>
</template>

<script type="ts">
import Vue from 'vue'
import LangsBar from '@protocol-one/ui-kit/src/LangsBar.vue'
import UploadImage from './UploadImage.vue'
import uploadFile from '../uploader'
import i18n from '../i18n'

export default Vue.extend({
  i18n,
  name: "CoverImage",
  components: {UploadImage, LangsBar},
  props: {
    value: {
      type: Object,
      require: true,
      default: () => ({}),
    }
  },
  data() {
    return {
      lang: 'en'
    }
  },
  computed: {},
  methods: {
    selectLang(lang) {
      this.lang = lang;
    },
    clickRemove(){
      this.$emit('change', {...this.value, ...{[this.lang]: ''}});
    },
    upload(){
      uploadFile({width: 1920, height: 800}, (urls) => {
        this.$emit('change', {...this.value, ...{[this.lang]: urls[0]}});
      });
    }
  }
})
</script>

<style scoped lang="scss">
.cover-image {
  margin-bottom: 20px;
}
</style>
