<template>
<div class="screenshots">
  <LangsBar
    :value="lang"
    :filled-list="Object.keys(value).filter(a => value[a] && value[a].length)"
    @change="selectLang"
  />
  <div class="list">
    <span
      v-for="(item, index) in value[lang]"
      :key="index"
    >
      <ImageUpload
        :upload-text="$t('upload_screenshot')"
        :replace-text="$t('replace_screenshot')"
        :remove-text="$t('remove_screenshot')"
        :remove-btn="true"
        :source="item"
        :small="true"
        @click="upload(index)"
        @clickRemove="clickRemove(index)"
      />
    </span>
    <span class="add-item">
      <div>
        <Button
          :text="$t('add_screenshot')"
          @click="clickAdd"
        />
      </div>
    </span>
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue'
  import {clone} from 'lodash-es'
  import {LangsBar, Button} from '@protocol-one/ui-kit'
  import ImageUpload from './ImageUploader.vue'
  import uploadImage from '../uploaderImage'
  import i18n from '../i18n'

  export default Vue.extend({
    i18n,
    components: {ImageUpload, LangsBar, Button},
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
      clickAdd() {
        this.$emit('change', {
          ...this.value,
          ...{[this.lang]: (this.value[this.lang] || []).concat('')}
        });
      },
      clickRemove(index) {
        const value = clone(this.value, true);
        value[this.lang].splice(index, 1);
        this.$emit('change', value);
      },
      upload(index) {
        uploadImage({width: 1920, height: 800}, (urls) => {
          const value = clone(this.value, true);
          value[this.lang] = value[this.lang] || [];
          value[this.lang][index] = urls[0];
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

    .add-item div {
      height: 160px;
      background: #f6f6f6;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  .screenshots {
    margin-bottom: 30px;
  }
  .langs-bar {
    margin-bottom: 8px;
  }
</style>
