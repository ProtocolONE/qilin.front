<template>
<div class="ratings-page">
  <WarningMessage>
    <div v-html="$t('warning_message')"></div>
  </WarningMessage>

  <Agency
    id="ESRB"
    agency="ESRB"
    defIcon="A"
    @change="value => updateRating({agency: 'ESRB', value})"
    :value="ratings.ESRB"
    :options="[
        {label: 'Everyone (E)', value: 'E'},
        {label: 'Everyone 10+ (E10+)', value: 'E10+'},
        {label: 'Teen (T)', value: 'T'},
        {label: 'Mature (M)', value: 'M'},
        {label: 'Adults Only (AO)', value: 'A'},
        {label: 'Rating Pending (RP)', value: 'RP'},
      ]"
  />

  <Agency
    id="PEGI"
    agency="PEGI"
    defIcon="3"
    @change="value => updateRating({agency: 'PEGI', value})"
    :value="ratings.PEGI"
    :options="[
        {label: 'For all ages (3)', value: '3'},
        {label: 'For persons 7 and older', value: '7'},
        {label: 'For persons 12 and older', value: '12'},
        {label: 'For persons 16 and older', value: '16'},
        {label: 'Only for persons 18 and older', value: '18'},
      ]"
  />

  <Agency
    id="BBFC"
    agency="BBFC"
    defIcon="U"
    @change="value => updateRating({agency: 'BBFC', value})"
    :value="ratings.BBFC"
    :options="[
        {label: 'Universal (U)', value: 'U'},
        {label: 'Parental Guidance (PG)', value: 'PG'},
        {label: '12A', value: '12A'},
        {label: '12', value: '12'},
        {label: '15', value: '15'},
        {label: '18', value: '18'},
        {label: 'Restricted 18', value: '18R'},
      ]"
  />

  <Agency
    id="USK"
    agency="USK"
    defIcon="0"
    @change="value => updateRating({agency: 'USK', value})"
    :value="ratings.USK"
    :options="[
        {label: 'Without age restriction', value: '0'},
        {label: 'Aged 6 and above (6)', value: '6'},
        {label: 'Aged 12 and above (12)', value: '12'},
        {label: 'Aged 16 and above (16)', value: '16'},
        {label: 'Not approved for anyone under 18', value: '18'},
      ]"
  />

  <Agency
    id="CERO"
    agency="CERO"
    defIcon="A"
    @change="value => updateRating({agency: 'CERO', value})"
    :value="ratings.CERO"
    :options="[
        {label: 'All Ages (A)', value: 'A'},
        {label: 'Ages 12 and up (B)', value: 'B'},
        {label: 'Ages 15 and up (C)', value: 'C'},
        {label: 'Ages 17 and up (D)', value: 'D'},
        {label: 'Ages 18 and up only (Z)', value: 'Z'},
      ]"
  />

</div>
</template>
<script type="ts">
import Vue from 'vue'
import {mapState, mapActions, mapMutations} from 'vuex';
import i18n from './i18n'
import WarningMessage from './components/WarningMessage'
import Agency from './components/Agency.vue'

export default Vue.extend({
  i18n,
  components: {WarningMessage, Agency},
  computed: {
    ...mapState('Game/Ratings', ['ratings']),
  },
  mounted() {
    this.initState(this.$route.params.id);
    this.updateContents(
      ['ESRB', 'PEGI', 'BBFC', 'USK', 'CERO']
        .map(a => ({anchor: a, text: this.$t(a)})));
  },
  methods: {
    ...mapMutations('Game', ['updateContents']),
    ...mapMutations('Game/Ratings', ['updateRating']),
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
