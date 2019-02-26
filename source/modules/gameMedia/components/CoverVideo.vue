<template>
<div class="cover-video">
  <LangsBar
    :value="lang"
    :filled-list="filled"
    @change="selectLang"
  />
  <UploadItem
    :is-video="true"
    :upload-text="$t('upload_cover_video')"
    :replace-text="$t('replace_cover_video')"
    :remove-text="$t('remove_video')"
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
import {OpenFileDialog, UploadVideo} from '../uploader'
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
      UploadVideo(file, urls =>
        this.$emit('change', {
          ...this.value,
          ...{[this.lang]: urls[0]}
        })
      );
    },
    selectFile() {
      OpenFileDialog('video/*', this.uploadFile.bind(this));
    },
  }
})
</script>

<style scoped lang="scss">
.cover-video {
  margin-bottom: 30px;
}
.langs-bar {
  margin-bottom: 8px;
}
</style>
