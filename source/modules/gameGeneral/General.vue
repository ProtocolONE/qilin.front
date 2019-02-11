<template>
<div class="game-general">
  <Creators
    v-bind="{ ...creators }"
    class="section"
    @change="changeCreators"
  />
  <SupportedLanguages
    class="section"
    :languages="languages"
    @change="changeLanguages"
  />
  <ReleaseDate
    class="section"
    :releaseDate="releaseDate"
    @change="changeReleaseDate"
  />
  <Genre
    class="section"
    :genre="genre"
    :genres="genres"
    @change="changeGenre"
  />
  <Tags
    class="section"
    :selectedTags="selectedTags"
    :tags="tags"
    @change="changeTags"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import Creators from './components/Creators.vue';
import Genre from './components/Genre.vue';
import PlatformsAndRequirements from './components/PlatformsAndRequirements.vue';
import ReleaseDate from './components/ReleaseDate.vue';
import SupportedFeatures from './components/SupportedFeatures.vue';
import SupportedLanguages from './components/SupportedLanguages.vue';
import Tags from './components/Tags.vue';
import i18n from './i18n'

export default Vue.extend({
  i18n,
  components: {
    Creators,
    Genre,
    PlatformsAndRequirements,
    ReleaseDate,
    SupportedFeatures,
    SupportedLanguages,
    Tags,
  },
  computed: {
    ...mapState('Game/General', ['genres', 'tags']),
    ...mapGetters('Game/General', [
      'creators',
      'genre',
      'platformsAndRequirements',
      'releaseDate',
      'features',
      'languages',
      'selectedTags',
    ]),
  },
  mounted() {
    this.initState(this.$route.params.id);
  },
  methods: {
    ...mapActions('Game/General', ['initState']),
    ...mapMutations('Game/General', [
      'changeCreators',
      'changeGenre',
      'changePlatformsAndRequirements',
      'changeReleaseDate',
      'changeFeatures',
      'changeLanguages',
      'changeTags',
    ]),
  }
})
</script>

<style scoped lang="scss">
.game-general {
  padding: 32px;
  font-size: 16px;
  color: #333333;
}
.section {
  margin-bottom: 40px;
}
</style>
