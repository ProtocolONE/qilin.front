<template>
<div class="ratings-page">
  <WarningMessage>
    <div v-html="$t('warning_message')" />
  </WarningMessage>

  <Agency
    v-for="agency in agencies"
    :id="agency.name"
    :key="agency.name"
    :agency="agency.name"
    :def-icon="agency.defRating"
    :value="ratings[agency.name]"
    :options="agency.ratings"
    @change="value => updateRating({agency: agency.name, value})"
  />
</div>
</template>
<script type="ts">
import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex';
import i18n from './i18n'
import WarningMessage from './components/WarningMessage'
import Agency from './components/Agency.vue'
import agencies from './agencies'

export default Vue.extend({
  i18n,
  components: {WarningMessage, Agency},
  data() {
    return {agencies};
  },
  computed: {
    ...mapState('Game/Ratings', ['ratings']),
  },
  mounted() {
    this.initState(this.$route.params.resourceId);
    this.updateContents(
      ['ESRB', 'PEGI', 'BBFC', 'USK', 'CERO']
        .map(a => ({anchor: a, text: this.$t(a)})));
  },
  methods: {
    ...mapMutations('Game', ['updateContents']),
    ...mapActions('Game/Ratings', ['updateRating']),
    ...mapActions('Game/Ratings', ['initState']),
  },
})
</script>
<style scoped lang="scss">
.ratings-page {
  min-width: 528px;
  padding: 33px 30px;
  color: #333333;
}

</style>
