<template>
<div class="description-page">
  <Tagline />
  <Description />
  <Reviews />
  <ExternalLinks />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Tagline from './components/Tagline';
import Description from './components/Description';
import Reviews from './components/Reviews';
import ExternalLinks from './components/ExternalLinks';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: {
    Tagline,
    Description,
    Reviews,
    ExternalLinks,
  },
  computed: {
    ...mapState('Game/Descriptions', ['descriptions']),
    ...mapGetters('Game/Descriptions', ['contents']),
  },
  watch: {
    '$i18n.locale'() {
      this.updateGameContents();
    },
  },
  mounted() {
    this.initState(this.$route.params.resourceId);
    this.updateGameContents();
  },
  methods: {
    ...mapActions('Game/Descriptions', ['initState', 'update']),
    ...mapMutations('Game', ['updateContents']),
    updateGameContents() {
      this.updateContents(this.contents.map(
        anchor => ({
          anchor,
          text: this.$t(anchor)
        })
      ));
    }
  },
})
</script>

<style scoped lang="scss">
.description-page {
  min-width: 528px;
  max-width: 768px;
  padding: 33px 30px;
  color: #333333;
  overflow: hidden;
}
</style>