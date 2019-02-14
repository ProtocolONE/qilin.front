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
    @change="updateMediaByProp('coverImage', $event)"
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
    @change="updateMediaByProp('coverVideo', $event)"
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
    @change="updateMediaByProp('trailers', $event)"
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
    @change="updateMediaByProp('screenshots', $event)"
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
    @change="updateMediaByProp('store', $event)"
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
    @change="updateMediaByProp('capsule', $event)"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import Headline from '@/components/Headline';
import Capsule from './components/Capsule';
import CoverImage from './components/CoverImage';
import CoverVideo from './components/CoverVideo';
import Screenshots from './components/Screenshots';
import Store from './components/Store';
import Trailers from './components/Trailers';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { CoverImage, CoverVideo, Trailers, Headline, Screenshots, Store, Capsule },
  computed: {
    ...mapState('Game/Media', ['media']),
  },
  mounted() {
    this.initState(this.$route.params.id);
    this.updateContents(
      [
        'cover_image',
        'cover_video',
        'trailers',
        'screenshots',
        'store',
        'capsule',
      ].map(a => ({ anchor: a, text: this.$t(a) }))
    );
  },
  methods: {
    ...mapActions('Game/Media', ['initState', 'updateMedia']),
    ...mapMutations('Game', ['updateContents']),

    updateMediaByProp(prop, value) {
      this.updateMedia({ ...this.media, [prop]: value });
    },
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
