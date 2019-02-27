<template>
<div class="tagline">
  <Headline
    id="tagline"
    level="2"
  >
    {{ $t('tagline') }}
  </Headline>
  <TextField
    :label="$t('tagline_title')"
    :value="descriptions.tagline[lang] || ''"
    @input="value => change('tagline', value)"
  />
  <Headline
    id="description"
    level="2"
  >
    {{ $t('description') }}
  </Headline>
  <LangsBar
    :value="lang"
    :filled-list="filled"
    @change="value => lang = value"
  />
  <wysiwyg
    class="editor"
    placeholder=""
    :options="WYSIWYG_Opts"
    :html="descriptions.description[lang] || ''"
    @change="value => change('description', value)"
  />
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from 'vuex';
  import { TextField, LangsBar } from '@protocol-one/ui-kit';
  import Headline from '@/components/Headline';
  import { uniq } from 'lodash-es';
  import i18n from '../i18n';
  import 'vue-wysiwyg/dist/vueWysiwyg.css';
  import { WYSIWYG_Opts } from './wysiwyg_opts'

  export default Vue.extend({
    i18n,
    components: { TextField, Headline, LangsBar },
    data() {
      return {
        WYSIWYG_Opts,
        lang: 'en',
      }
    },
    computed: {
      ...mapState('Game/Descriptions', ['descriptions']),
      filled() {
        const {tagline, description} = this.descriptions;
        const keys = uniq(Object.keys(tagline).concat(Object.keys(description)));
        return keys.filter(lang => tagline[lang] || description[lang]);
      }
    },
    methods: {
      ...mapMutations('Game/Descriptions', ['changeLangProp']),
      change(prop, value) {
        this.changeLangProp({lang: this.lang, prop, value});
      },
    },
  })
</script>

<style scoped lang="scss">
.tagline {

}
.editor {
  margin-top: 8px;
  margin-bottom: 36px;
}
</style>