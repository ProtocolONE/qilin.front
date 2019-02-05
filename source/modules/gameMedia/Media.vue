<template>
<div class="media-page">
  <Headline>{{ $t('cover_image') }}</Headline>
  <p class="top-descr">
    {{ $t('cover_image_descr.0') }}<br>
    {{ $t('cover_image_descr.1') }}
  </p>
  <CoverImage
    :value="media.coverImage"
    @change="updateCover"
  />
  <Headline>{{ $t('cover_video') }}</Headline>
  <p class="top-descr">
    {{ $t('cover_video_descr.0') }}<br>
    {{ $t('cover_video_descr.1') }}
  </p>
  <CoverVideo
    :value="media.coverVideo"
    @change="updateVideo"
  />
  <Headline>{{ $t('addition_trailers') }}</Headline>
  <p class="top-descr">
    {{ $t('addition_trailers_descr.0') }}<br>
    {{ $t('addition_trailers_descr.1') }}
  </p>
  <AdditionTrailers
    :value="media.trailers"
    @change="updateTrailers"
  />
</div>
</template>
<script type="ts">
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex';
import i18n from './i18n'
import CoverImage from './components/CoverImage'
import CoverVideo from './components/CoverVideo'
import AdditionTrailers from './components/AdditionTrailers'
import Headline from '../../components/Headline'

export default Vue.extend({
  i18n,
  components: {CoverImage, CoverVideo, AdditionTrailers, Headline},
  computed: {
    ...mapState('Media', ['media']),
  },
  mounted() {
    this.initState(this.$route.params.id);
  },
  methods: {
    ...mapActions('Media', ['initState', 'clickSave']),
    ...mapMutations('Media', ['updateMedia']),
    updateCover(value){this.updateMedia({...this.media, ...{coverImage: value}})},
    updateVideo(value){this.updateMedia({...this.media, ...{coverVideo: value}})},
    updateTrailers(value){this.updateMedia({...this.media, ...{trailers: value}})},
  },
})
</script>
<style scoped lang="scss">
.media-page {
  min-width: 528px;
  max-width: 768px;
  padding: 33px 30px;
  color: #333333;
}
h2 {
  font-size: 20px;
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
