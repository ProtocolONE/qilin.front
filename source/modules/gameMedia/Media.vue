<template>
<div class="media-page">
  <Headline id="cover_image">
    {{ $t('cover_image') }}
  </Headline>
  <p
    class="top-descr"
    v-html="$t('cover_image_descr')"
  />
  <CoverImage
    :value="media.coverImage"
    @change="updateCover"
  />
  <Headline id="cover_video">
    {{ $t('cover_video') }}
  </Headline>
  <p
    class="top-descr"
    v-html="$t('cover_video_descr')"
  />
  <CoverVideo
    :value="media.coverVideo"
    @change="updateVideo"
  />
  <Headline id="trailers">
    {{ $t('trailers') }}
  </Headline>
  <p
    class="top-descr"
    v-html="$t('trailers_descr')"
  />
  <Trailers
    :value="media.trailers"
    @change="updateTrailers"
  />
  <Headline id="screenshots">
    {{ $t('screenshots') }}
  </Headline>
  <p
    class="top-descr"
    v-html="$t('screenshots_descr')"
  />
  <Screenshots
    :value="media.screenshots"
    @change="updateScreenshots"
  />
  <Headline id="store">
    {{ $t('store') }}
  </Headline>
  <p
    class="top-descr"
    v-html="$t('store_descr')"
  />
  <Store
    :value="media.store"
    @change="updateStore"
  />
  <Headline id="capsule">
    {{ $t('capsule') }}
  </Headline>
  <p
    class="top-descr"
    v-html="$t('capsule_descr')"
  />
  <Capsule
    :value="media.capsule"
    @change="updateCapsule"
  />
</div>
</template>
<script type="ts">
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex';
import i18n from './i18n'
import CoverImage from './components/CoverImage'
import CoverVideo from './components/CoverVideo'
import Trailers from './components/Trailers'
import Screenshots from './components/Screenshots'
import Store from './components/Store'
import Capsule from './components/Capsule'
import Headline from '../../components/Headline'

export default Vue.extend({
  i18n,
  components: {CoverImage, CoverVideo, Trailers, Headline, Screenshots, Store, Capsule},
  computed: {
    ...mapState('Game/Media', ['media']),
  },
  mounted() {
    this.initState(this.$route.params.id);
    this.updateContents(
      ['cover_image', 'cover_video', 'trailers', 'screenshots', 'store', 'capsule']
        .map(a => ({anchor: a,text: this.$t(a)})));
  },
  methods: {
    ...mapActions('Game/Media', ['initState', 'clickSave']),
    ...mapMutations('Game/Media', ['updateMedia']),
    ...mapMutations('Game', ['updateContents']),
    updateCover(value) {this.updateMedia({...this.media, ...{coverImage: value}})},
    updateVideo(value) {this.updateMedia({...this.media, ...{coverVideo: value}})},
    updateTrailers(value) {this.updateMedia({...this.media, ...{trailers: value}})},
    updateScreenshots(value) {this.updateMedia({...this.media, ...{screenshots: value}})},
    updateStore(value) {this.updateMedia({...this.media, ...{store: value}})},
    updateCapsule(value) {this.updateMedia({...this.media, ...{capsule: value}})},
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
