<template>
  <div class="tagline">
    <Headline
      id="tagline"
      v-text="$t('tagline')"
    />
    <TextField
      :label="$t('tagline_title')"
      :value="descriptions.tagline[lang] || ''"
      @change="value => change('tagline', value)"
    />
    <Headline
      id="description"
      v-text="$t('description')"
    />
    <LangsBar
      :value="lang"
      :filled-list="filled"
      @change="value => lang = value"
    />
    <wysiwyg
      class="editor"
      :html="descriptions.description[lang] || ''"
      @change="value => change('description', value)"
    />
  </div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
  import { TextField, LangsBar } from '@protocol-one/ui-kit';
  import Headline from '@/components/Headline';
  import i18n from '../i18n';
  import { uniq } from 'lodash-es';
  import 'vue-wysiwyg/dist/vueWysiwyg.css';

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
        const {tagline, description} = this.descriptions;
        const keys = uniq(Object.keys(tagline).concat(Object.keys(description)));
        return keys.filter(lang => tagline[lang] || description[lang]);
      }
    },
    methods: {
      ...mapActions('Game/Descriptions', ['update']),
      change(field, value) {
        this.update({
          ...this.descriptions,
          ...{
            [field]: {
              ...this.descriptions[field],
              [this.lang]: value
            }
          }
        });
      },
    },
  })
</script>

<style scoped lang="scss">
.tagline {

}
.editor {
  margin-top: 8px;
}
</style>