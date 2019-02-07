<template>
<div class="cover-image">
  <LangsBar
    :value="lang"
    :filled-list="filled"
    @change="selectLang"
  />
  <ImageUpload
    :upload-text="$t('upload_cover_image')"
    :replace-text="$t('replace_cover_image')"
    :remove-text="$t('remove_cover')"
    :source="value[lang] || ''"
    @click="upload"
    @clickRemove="clickRemove"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue'
import {LangsBar} from '@protocol-one/ui-kit'
import ImageUpload from './ImageUploader.vue'
import uploadImage from '../uploaderImage'
import i18n from '../i18n'

export default Vue.extend({
  i18n,
  components: {ImageUpload, LangsBar},
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
  computed: {
    filled() {
      return Object
        .keys(this.value)
        .filter(a => this.value[a]);
    }
  },
  methods: {
    selectLang(lang) {
      this.lang = lang;
    },
    clickRemove() {
      this.$emit('change', {
        ...this.value,
        ...{[this.lang]: ''}
      });
    },
    upload() {
      uploadImage({width: 1920, height: 800}, (urls) => {
        this.$emit('change', {
          ...this.value,
          ...{[this.lang]: urls[0]}
        });
      });
    }
  }
})
</script>

<style scoped lang="scss">
.cover-image {
  margin-bottom: 30px;
}
.langs-bar {
  margin-bottom: 8px;
}
</style>
