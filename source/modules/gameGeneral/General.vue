<template>
<div class="game-general">
  <Headline id="creators">
    {{ $t('creators') }}
  </Headline>
  <Creators
    class="section"
    :developers="creators.developers"
    :publishers="creators.publishers"
    @change="change('creators', $event)"
  />
  
  <Headline id="languages">{{ $t('languages') }}</Headline>
  <SupportedLanguages
    class="section"
    :languages="languages"
    @change="change('languages', $event)"
  />
  
  <Headline id="releaseDate">{{ $t('releaseDate') }}</Headline>
  <ReleaseDate
    class="section"
    :releaseDate="releaseDate"
    @change="change('releaseDate', $event)"
  />
  
  <Headline id="genre">{{ $t('genre') }}</Headline>
  <Genre
    class="section"
    :genres="genres"
    :selectedGenres="selectedGenres"
    @change="change('genre', $event)"
  />
  
  <Headline id="tags">{{ $t('tags') }}</Headline>
  <Tags
    class="section"
    :selectedTags="selectedTags"
    :tags="tags"
    @change="change('tags', $event)"
  />
  
  <Headline id="features">{{ $t('features') }}</Headline>
  <SupportedFeatures
    class="section"
    :features="features"
    @change="change('features', $event)"
  />

  <Platforms
    :platforms="platforms"
    :requirements="requirements"
    class="section"
    @changePlatforms="change('platforms', $event)"
    @changeRequirements="change('requirements', $event)"
  >
    <Headline
      slot="title"
      id="platforms"
      :hasMargin="false"
    >
      {{ $t('platforms') }}
    </Headline>
  </Platforms>
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { map } from 'lodash-es';
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import Headline from '@/components/Headline.vue';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';
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
    Headline,
    Platforms,
    ReleaseDate,
    Requirements,
    SupportedFeatures,
    SupportedLanguages,
    Tags,
  },
  watch: {
    '$i18n.locale': function(value) {
      this.updateContents(
        map(
          i18n.messages[value],
          (text, anchor) => ({ anchor, text }),
        ),
      );
    },
  },
  computed: {
    ...mapState('Game/General', ['genres', 'tags']),
    ...mapGetters('Game/General', [
      'creators',
      'features',
      'languages',
      'platforms',
      'releaseDate',
      'requirements',
      'selectedGenres',
      'selectedTags',
    ]),
  },
  mounted() {
    this.initState(this.$route.params.id);
    this.updateContents(
      map(
        i18n.messages[this.$i18n.locale],
        (text, anchor) => ({ anchor, text }),
      ),
    );
  },
  methods: {
    ...mapActions('Game/General', ['initState']),
    ...mapMutations('Game', ['updateContents']),
    ...mapMutations('Game/General', [
      'changeCreators',
      'changeFeatures',
      'changeGenre',
      'changeLanguages',
      'changePlatforms',
      'changeReleaseDate',
      'changeRequirements',
      'changeTags',
      'hasChanges',
    ]),
    change(prop, value) {
      this[`change${capitalizeFirstLetter(prop)}`](value);
      this.hasChanges(true);
    },
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
