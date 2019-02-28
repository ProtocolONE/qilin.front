<template>
<div class="links">
  <Headline
    id="links"
    level="2"
    :options="options"
    :option-labels="socialMap.map(name => $t(`socials.${name}`))"
    @checked="checkedOpt"
  >
    {{ $t('links') }}
  </Headline>

  <div
    v-for="(name, idx) in socialMap"
    class="item"
  >
    <TextField
      v-if="options[idx]"
      :label="$t('socials.' + name)"
      :value="socials[name]"
      @input="value => changeSocials(name, value)"
    />
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { mapState, mapMutations, mapGetters } from 'vuex';
  import { TextField, Tip } from '@protocol-one/ui-kit';
  import Headline from '@/components/Headline';
  import i18n from '../i18n';

  export default Vue.extend({
    i18n,
    components: { TextField, Headline, Tip },
    data() {
      return {
        socialMap: Object.keys(this.$t('socials')),
        options: [],
      };
    },
    watch: {
      descriptions() {
        if (!this.options.length) {
          this.options = this.socialMap
            .map(name => !!this.socials[name]);
        }
      },
    },
    computed: {
      ...mapState('Game/Descriptions', ['descriptions']),
      ...mapGetters('Game/Descriptions', ['socials']),
    },
    methods: {
      ...mapMutations('Game/Descriptions', ['updateSocials']),
      checkedOpt(index) {
        this.options = this.options.map((ch, i) => i === index ? !ch : ch);
        if (!this.options[index]) {
          this.changeSocials(this.socialMap[index], '');
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