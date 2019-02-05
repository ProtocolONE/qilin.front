<template>
<div class="cover-video">
  <UploadImage
    :upload-text="$t('upload_cover_video')"
    :replace-text="$t('replace_cover_video')"
    :remove-text="$t('remove_video')"
    :image="value[lang] || ''"
    @click="selectUrl"
    @clickRemove="clickRemove"
  />
  <LangsBar
    :value="lang"
    :occupied="value"
    @change="selectLang"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue'
import LangsBar from '@protocol-one/ui-kit/src/LangsBar.vue'
import UploadImage from './UploadImage.vue'
import i18n from '../i18n'

export default Vue.extend({
  i18n,
  name: "CoverVideo",
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
    selectUrl(){
      const url = prompt(this.$t('select_video_url'), 'https://youtube.com/');
      this.$emit('change', {...this.value, ...{[this.lang]: url}});
    }
  }
})
</script>

<style scoped lang="scss">
.cover-image {
  margin-bottom: 20px;
}
</style>
