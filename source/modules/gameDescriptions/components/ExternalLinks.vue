<template>
<div class="links">
  <Headline
    id="links"
    level="2"
  >
    {{ $t('links') }}
    <TipWithFeatures
      :features="features"
      @switch="featureSwitch"
    />
  </Headline>
  <div
    v-for="(f, idx) in features"
    :key="idx"
    class="item"
  >
    <TextField
      v-if="f.checked"
      :label="$t(`socials.${f.name}`)"
      :value="socials[f.name]"
      @input="value => changeSocials(f.name, value)"
    />
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { mapState, mapMutations, mapGetters } from 'vuex';
  import { TextField, SwitchBox } from '@protocol-one/ui-kit';
  import TipWithFeatures from '@/components/TipWithFeatures.vue';
  import Headline from '@/components/Headline';
  import i18n from '../i18n';

  export default Vue.extend({
    i18n,
    components: {
      TextField,
      Headline,
      SwitchBox,
      TipWithFeatures,
    },
    data() {
      return {
        features: [],
      };
    },
    watch: {
      '$i18n.locale'() {
        this.updateFeatures();
      },
      descriptions() {
        if (!this.features.length) {
          this.updateFeatures();
        }
      },
    },
    computed: {
      ...mapState('Game/Descriptions', ['descriptions']),
      ...mapGetters('Game/Descriptions', ['socials']),
    },
    methods: {
      ...mapMutations('Game/Descriptions', ['updateSocials']),
      updateFeatures() {
        this.features = Object.keys(this.$t('socials'))
          .map(name => ({
            name,
            label: this.$t(`socials.${name}`),
            checked: !!this.socials[name],
          }));
      },
      featureSwitch(idx) {
        this.features[idx].checked = !this.features[idx].checked;
        if (!this.features[idx].checked) {
          this.changeSocials(this.features[idx].name, '');
        }
      },
      changeSocials(prop, value) {
        this.updateSocials({
          ...this.socials,
          [prop]: value,
        });
      }
    },
  })
</script>

<style scoped lang="scss">
.links {
  margin-bottom: 80px;
}
</style>