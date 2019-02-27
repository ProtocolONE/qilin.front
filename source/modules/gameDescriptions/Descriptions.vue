<template>
<div class="description-page">
  <Tagline />
  <Reviews />
  <ExternalLinks />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Tagline from './components/Tagline';
import Reviews from './components/Reviews';
import ExternalLinks from './components/ExternalLinks';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { Tagline, Reviews, ExternalLinks },
  computed: {
    ...mapState('Game/Descriptions', ['descriptions']),
    ...mapGetters('Game/Descriptions', ['contents']),
  },
  watch: {
    '$i18n.locale': () => this.updateConts(),
  },
  mounted() {
    this.initState(this.$route.params.id);
    this.updateConts();
  },
  methods: {
    ...mapActions('Game/Descriptions', ['initState', 'update']),
    ...mapMutations('Game', ['updateContents']),
    updateConts() {
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