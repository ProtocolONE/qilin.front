<template>
<div class="capsule">
  <LangsBar
    :value="lang"
    :filled-list="Object.keys(value.generic).filter(a => value.generic[a] || value.small[a])"
    @change="selectLang"
  />
  <div class="list">
    <span>
      <ImageUpload
        :upload-text="$t('upload_capsule')"
        :replace-text="$t('replace_capsule')"
        :remove-text="$t('remove_capsule')"
        :source="value.generic[lang] || ''"
        :small="true"
        @click="upload('generic')"
        @clickRemove="clickRemove('generic')"
      />
    </span><span>
      <ImageUpload
        :upload-text="$t('upload_capsule')"
        :replace-text="$t('replace_capsule')"
        :remove-text="$t('remove_capsule')"
        :source="value.small[lang] || ''"
        :small="true"
        @click="upload('small')"
        @clickRemove="clickRemove('small')"
      />
    </span>
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue'
  import {clone} from 'lodash-es'
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
    computed: {},
    methods: {
      selectLang(lang) {
        this.lang = lang;
      },
      clickRemove(type) {
        const value = clone(this.value, true);
        delete value[type][this.lang];
        this.$emit('change', value);
      },
      upload(type) {
        uploadImage({width: 1920, height: 800}, (urls) => {
          const value = clone(this.value, true);
          value[type][this.lang] = urls[0];
          this.$emit('change', value);
        });
      }
    }
  })
</script>

<style scoped lang="scss">
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > * {
      flex: 0 0 50%;
      padding-bottom: 20px;
      &:nth-child(even) {
        padding-left: 10px;
      }
      &:nth-child(odd) {
        padding-right: 10px;
      }
    }
  }
  .capsule {
    margin-bottom: 30px;
  }
  .langs-bar {
    margin-bottom: 8px;
  }
</style>
