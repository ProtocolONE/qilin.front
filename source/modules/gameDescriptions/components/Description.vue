<template>
<div class="tagline">
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
  <RichTextarea
    class="editor"
    placeholder=""
    :value="descriptions.description[lang] || ''"
    @input="change"
  />
</div>
</template>

<script type="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from 'vuex';
  import { LangsBar, RichTextarea } from '@protocol-one/ui-kit';
  import Headline from '@/components/Headline';
  import i18n from '../i18n';

  export default Vue.extend({
    i18n,
    components: { Headline, LangsBar, RichTextarea },
    data() {
      return {
        lang: 'en',
      }
    },
    computed: {
      ...mapState('Game/Descriptions', ['descriptions']),
      filled() {
        const { description } = this.descriptions;
        return Object.keys(description).filter(lang => description[lang]);
      }
    },
    methods: {
      ...mapMutations('Game/Descriptions', ['changeLangProp']),
      change(value) {
        this.changeLangProp({
          lang: this.lang,
          prop: 'description',
          value,
        });
      },
    },
  })
</script>

<style scoped lang="scss">
.editor {
  margin-top: 8px;
  margin-bottom: 36px;
}
</style>