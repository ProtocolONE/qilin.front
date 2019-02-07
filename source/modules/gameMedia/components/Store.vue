<template>
<div class="store">
  <LangsBar
    :value="lang"
    :filled-list="filled"
    @change="selectLang"
  />
  <div class="vert-file">
    <div class="left">
      <ImageUpload
        :upload-text="$t('upload_store_v')"
        :replace-text="$t('replace_store')"
        :remove-text="$t('remove_store')"
        :source="value.special[lang] || ''"
        @click="upload('special')"
        @clickRemove="clickRemove('special')"
      />
    </div>
    <div class="right">
      <p v-html="$t('store_descr_vert')" />
    </div>
  </div>
  <div class="horiz-file">
    <p v-html="$t('store_descr_horiz')" />
    <ImageUpload
      :upload-text="$t('upload_store_h')"
      :replace-text="$t('replace_store')"
      :remove-text="$t('remove_store')"
      :source="value.friends[lang] || ''"
      @click="upload('friends')"
      @clickRemove="clickRemove('friends')"
    />
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
    computed: {
      filled() {
        return Object
          .keys(this.value.special)
          .concat(Object.keys(this.value.friends))
          .filter(a => this.value.special[a] || this.value.friends[a]);
      }
    },
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
.store {
  margin-bottom: 30px;
}
.langs-bar {
  margin-bottom: 8px;
}
.vert-file {
  height: 344px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom:35px;
  .left {
    flex: 0 0 260px;
    > div {
      height: 100%;
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.horiz-file {
  .uploader {
    max-width: 528px;
  }
}
p {
  color: #b1b1b1;
  font-size: 14px;
  margin-bottom: 4px;
}
</style>
