<template>
<div class="cover-image">
  <LangsBar
    :value="lang"
    :filled-list="filled"
    @change="selectLang"
  />
  <UploadItem
    :upload-text="$t('upload_cover_image')"
    :replace-text="$t('replace_cover_image')"
    :remove-text="$t('remove_cover')"
    :source="value[lang] || ''"
    @click="selectFile"
    @dropFile="uploadFile"
    @clickRemove="clickRemove"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue'
import {LangsBar} from '@protocol-one/ui-kit'
import UploadItem from './UploadItem.vue'
import {OpenFileDialog, UploadImage} from '../uploader'
import i18n from '../i18n'

export default Vue.extend({
  i18n,
  components: {UploadItem, LangsBar},
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
    uploadFile(file) {
      UploadImage(file, {width: 1920, height: 800}, urls =>
        this.$emit('change', {
          ...this.value,
          ...{[this.lang]: urls[0]},
        })
      );
    },
    selectFile() {
      OpenFileDialog('image/*', this.uploadFile.bind(this));
    },
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
