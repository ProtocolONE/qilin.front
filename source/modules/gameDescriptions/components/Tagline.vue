<template>
<div class="tagline">
  <Headline
    id="tagline"
    level="2"
  >
    {{ $t('tagline') }}
  </Headline>
  <LangsBar
    :value="lang"
    :filled-list="filled"
    @change="value => lang = value"
  />
  <TextField
    class="textfield"
    :label="$t('tagline_title')"
    :value="descriptions.tagline[lang] || ''"
    @input="change"
  />
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from 'vuex';
  import { TextField, LangsBar } from '@protocol-one/ui-kit';
  import Headline from '@/components/Headline';
  import i18n from '../i18n';

  export default Vue.extend({
    i18n,
    components: { TextField, Headline, LangsBar },
    data() {
      return {
        lang: 'en',
      }
    },
    computed: {
      ...mapState('Game/Descriptions', ['descriptions']),
      filled() {
        const { tagline } = this.descriptions;
        return Object.keys(tagline).filter(lang => tagline[lang]);
      }
    },
    methods: {
      ...mapMutations('Game/Descriptions', ['changeLangProp']),
      change(value) {
        this.changeLangProp({
          lang: this.lang,
          prop: 'tagline',
          value,
        });
      },
    },
  })
</script>

<style scoped lang="scss">
.textfield {
  margin-top: 8px;
}
</style>