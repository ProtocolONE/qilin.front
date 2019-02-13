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
  <SupportedFeatures
    v-bind="features"
    class="section"
    @change="changeFeatures"
  />
  <Platforms
    :platforms="platforms"
    :requirements="requirements"
    class="section"
    @changePlatforms="changePlatforms"
    @changeRequirements="changeRequirements"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import Creators from './components/Creators.vue';
import Genre from './components/Genre.vue';
import Platforms from './components/Platforms.vue';
import ReleaseDate from './components/ReleaseDate.vue';
import Requirements from './components/Requirements.vue';
import SupportedFeatures from './components/SupportedFeatures.vue';
import SupportedLanguages from './components/SupportedLanguages.vue';
import Tags from './components/Tags.vue';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: {
    Creators,
    Genre,
    Platforms,
    ReleaseDate,
    Requirements,
    SupportedFeatures,
    SupportedLanguages,
    Tags,
  },
  computed: {
    ...mapState('Game/General', ['genres', 'tags']),
    ...mapGetters('Game/General', [
      'creators',
      'features',
      'genre',
      'languages',
      'platforms',
      'releaseDate',
      'requirements',
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
      'changeFeatures',
      'changeGenre',
      'changeLanguages',
      'changePlatforms',
      'changeReleaseDate',
      'changeRequirements',
      'changeTags',
    ]),
  }
})
</script>

<style scoped lang="scss">
.game-general {
  color: #333333;
  font-size: 16px;
  padding: 32px;
}
.section {
  margin-bottom: 40px;
}
</style>
