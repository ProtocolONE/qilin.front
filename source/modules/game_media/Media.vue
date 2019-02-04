
<template>
  <div class="media-page">
      <h2>{{$t('cover_image')}}</h2>
      <p class="top-descr">{{$t('cover_image_descr')}}</p>
      <CoverImage :value="media.coverImage" @change="updateCover"></CoverImage>

      <h2>{{$t('cover_video')}}</h2>
      <p class="">{{$t('cover_video_descr.0')}}</p>
      <p class="">{{$t('cover_video_descr.1')}}</p>
      <p class="top-descr warning">{{$t('cover_video_descr.2')}}</p>

      <CoverVideo :value="media.coverVideo" @change="updateVideo"></CoverVideo>
  </div>
</template>
<script type="ts">
  import Vue from 'vue'
  import { mapState, mapActions, mapMutations } from 'vuex';
  import i18n from './i18n'
  import Button from '../../components/ui-kit/Button.vue'
  import CoverImage from './components/CoverImage.vue'
  import CoverVideo from './components/CoverVideo.vue'

  export default Vue.extend({
    props: {
      gameId: {
        type: String,
        require: true,
      },
    },
    components: {Button, CoverImage, CoverVideo},
    i18n,
    name: "Media",
    mounted() {
      this.initState(this.gameId);
    },
    computed: {
      ...mapState('Media', ['media']),
    },
    methods: {
      ...mapActions('Media', ['initState', 'clickSave']),
      ...mapMutations('Media', ['updateMedia']),
      updateCover(value){this.updateMedia({...this.media, ...{coverImage: value}})},
      updateVideo(value){this.updateMedia({...this.media, ...{coverVideo: value}})},
    },
  })
</script>
<style scoped lang="scss">
  .media-page {
    width: 735px;
    padding: 33px 30px;
    font-size: 16px;
    font-family: Lato;
    color: #333333;
  }
  h2 {
    font-size: 21px;
  }
  p {
    color: #b1b1b1;
    font-size: 14px;
    &.top-descr {
      margin-bottom: 4px;
    }
    &.warning {
      color: #ea7e00;
    }
  }
</style>
