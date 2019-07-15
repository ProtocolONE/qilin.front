<template>
<div class="multilang-textfield">
  <UiLangsBar
    :filled-list="filled"
    :value="lang"
    @change="lang = $event"
  />
  <UiTextField
    class="textfield"
    :label="label"
    :value="value[lang] || ''"
    @input="change"
  />
</div>
</template>

<script>
import Vue from 'vue';
import {UiLangsBar, UiTextField} from '@protocol-one/ui-kit';
import i18n from '../i18n';

export default Vue.extend({
  i18n,
  components: { UiLangsBar, UiTextField },
  props: {
    label: {
      type: String,
      required: true,
    },
    /**
     * @type {Object}
     */
    value: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    lang: 'en',
  }),
  computed: {
    filled() {
      return Object
        .keys(this.$props.value)
        .filter(lang => this.$props.value[lang]);
    }
  },
  methods: {
    change(value) {
      const updated = {...this.$props.value, [this.lang]: value};
      this.$emit('change', updated);
    }
  },
});
</script>

<style scoped>
.textfield {
  margin-top: 8px;
}
</style>
