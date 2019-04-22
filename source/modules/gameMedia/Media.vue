<template>
<div class="media-page">
  <Headline
    id="cover_image"
    :title="$t('cover_image_hint_title')"
    :info="$t('cover_image_hint')"
  >
    {{ $t('cover_image') }}
  </Headline>
  <p
    class="no-margin"
    v-html="$t('cover_image_descr')"
  />
  <CoverImage
    :value="media.coverImage"
    @change="updateMediaByProp('coverImage', $event)"
  />
  <Headline id="cover_video">
    {{ $t('cover_video') }}
  </Headline>
  <p v-html="$t('cover_video_descr.0')" />
  <p
    class="warning no-margin"
    v-text="$t('cover_video_descr.1')"
  />
  <CoverVideo
    :value="media.coverVideo"
    @change="updateMediaByProp('coverVideo', $event)"
  />
  <Headline id="trailers">
    {{ $t('trailers') }}
  </Headline>
  <p
    class="no-margin"
    v-html="$t('trailers_descr')"
  />
  <Trailers
    :value="media.trailers"
    @change="updateMediaByProp('trailers', $event)"
  />
  <Headline id="screenshots">
    {{ $t('screenshots') }}
  </Headline>
  <p v-html="$t('screenshots_descr.0')" />
  <p
    class="warning no-margin"
    v-text="$t('screenshots_descr.1')"
  />
  <Screenshots
    :value="media.screenshots"
    @change="updateMediaByProp('screenshots', $event)"
  />
  <Headline id="store">
    {{ $t('store') }}
  </Headline>
  <p
    class="no-margin"
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
    class="no-margin"
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
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
    ...mapGetters('Game/Media', ['contents']),
  },
  watch: {
    '$i18n.locale': function(value) {
      this.updateContents(this.contents.map(anchor => ({ anchor, text: this.$t(anchor) })));
    },
  },
  mounted() {
    this.initState(this.$route.params.resourceId);
    this.updateContents(this.contents.map(anchor => ({ anchor, text: this.$t(anchor) })));
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
  &.warning {
    color: #ea7e00;
  }
  &.no-margin {
    margin-bottom: 4px;
  }
}
</style>
