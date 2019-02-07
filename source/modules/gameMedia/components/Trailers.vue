<template>
<div class="addition-trailers">
  <LangsBar
    :value="lang"
    :filled-list="filled"
    @change="selectLang"
  />
  <div class="list">
    <span
      v-for="(item, index) in value[lang]"
      :key="index"
    >
      <VideoUpload
        :upload-text="$t('upload_trailer')"
        :replace-text="$t('replace_trailer')"
        :remove-text="$t('remove_trailer')"
        :remove-btn="true"
        :source="item"
        :small="true"
        @click="upload(index)"
        @clickRemove="clickRemove(index)"
      />
    </span>
    <span class="add-video">
      <div>
        <Button
          :text="$t('add_trailer')"
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
  import VideoUpload from './VideoUploader.vue'
  import uploadVideo from '../uploaderVideo'
  import i18n from '../i18n'

  export default Vue.extend({
    i18n,
    components: {VideoUpload, LangsBar, Button},
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
          .filter(a => this.value[a] && this.value[a].length);
      }
    },
    methods: {
      selectLang(lang) {
        this.lang = lang;
      },
      clickAdd() {
        this.$emit('change',
          ...this.value,
          ...{[this.lang]: (this.value[this.lang] || []).concat([''])}
        );
      },
      clickRemove(index) {
        const value = clone(this.value, true);
        value[this.lang].splice(index, 1);
        this.$emit('change', value);
      },
      upload(index) {
        uploadVideo({}, (urls) => {
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

    .add-video div {
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
  .addition-trailers {
    margin-bottom: 30px;
  }
  .langs-bar {
    margin-bottom: 8px;
  }
</style>
