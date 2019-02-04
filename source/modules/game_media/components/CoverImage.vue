<template>
  <div class="cover-image">
    <UploadImage
            :uploadText="$t('upload_cover_image')"
            :replaceText="$t('replace_cover_image')"
            :removeText="$t('remove_cover')"
            :image="value[lang] || ''"
            @click="upload"
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
    name: "CoverImage",
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