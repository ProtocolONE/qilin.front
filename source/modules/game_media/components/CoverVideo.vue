<template>
  <div class="cover-video">
    <UploadImage
            :uploadText="$t('upload_cover_video')"
            :replaceText="$t('replace_cover_video')"
            :removeText="$t('remove_video')"
            :image="value[lang] || ''"
            @click="selectUrl"
            @clickRemove="clickRemove"
    />
    <LangsBar :value="lang" :occupied="value" @change="selectLang"/>
  </div>
</template>

<script type="ts">
  import Vue from 'vue'
  import UploadImage from './UploadImage.vue'
  import LangsBar from './LangsBar.vue'
  import uploadFile from '../uploader'
  import i18n from '../i18n'

  export default Vue.extend({
    i18n,
    props: {
      value: {
        type: Object,
        require: true,
      }
    },
    name: "CoverVideo",
    components: {UploadImage, LangsBar},
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