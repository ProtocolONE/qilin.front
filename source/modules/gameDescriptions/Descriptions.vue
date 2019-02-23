<template>
<div class="description-page">
  <Tagline

  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Tagline from './components/Tagline';
import i18n from './i18n';

export default Vue.extend({
  i18n,
  components: { Tagline },
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
}
</style>