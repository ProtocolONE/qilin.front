<template>
<article class="package-regional">

  <section class="page__section section">
    <headline id="regional">
      <span class="section__title">
        {{ $t('regionalRestrictions') }}
      </span>
    </headline>
    <p class="section__description">
      {{ $t('regionalRestrictionsDescription') }}
    </p>
    <div
      v-if="allowedCountries.length"
      class="allowedCountries"
    >
      <label
        v-for="country in allowedCountries"
        :key="country"
      >
        <UiCheckbox
          class="select"
          :checked="isChecked(country)"
          @change="changeSelect(country)"
        />
        {{ $t(`countries.${country}`) }}
      </label>
      <UiButton
        @click="clickRemove"
        color="orange"
      >
        {{ $t('remove') }}
      </UiButton>
    </div>
    <p v-else>
      {{ $t('allowedInAllCountries') }}
    </p>
    <UiSelect
      v-model="newCountry"
      class="selectCountry"
      :label="$t('addNewCountry')"
      :options="allCountries"
    />
    <UiButton
      @click="clickNewCountry"
    >
      {{ $t('append') }}
    </UiButton>
  </section>

</article>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {toPairs, without} from "lodash-es";
  import {Checkbox as UiCheckbox, UiButton, UiSelect} from '@protocol-one/ui-kit'
  import Headline from '@/components/Headline.vue'
  import i18n from './i18nRegional';

  export default Vue.extend({
  i18n,
  components: {
    Headline,
    UiSelect,
    UiButton,
    UiCheckbox,
  },
  props: {
    region: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      select: [],
      newCountry: '',
    };
  },
  computed: {
    allCountries () {
      const allowed = this.region.allowedCountries || [];
      return toPairs(this.$i18n.t('countries'))
        .map(pair => ({label: pair[1], value: pair[0]}))
        .filter(item => allowed.indexOf(item.value) === -1);
    },
    allowedCountries () {
      return this.region.allowedCountries || [];
    },
  },
  methods: {
    isChecked(country) {
      return this.select.indexOf(country) > -1;
    },
    changeSelect(country) {
        this.select = this.select.indexOf(country) > -1
          ? without(this.select, [country])
          : this.select.concat([country]);
    },
    clickNewCountry() {
      this.$emit('change', {
        allowedCountries: this.allowedCountries
          .concat([this.newCountry])
      });
    },
    clickRemove() {
      this.$emit('change', {
        allowedCountries: this.allowedCountries
          .filter(country => this.select.indexOf(country) === -1)
      });
      this.select = [];
    }
  },
});
</script>

<style lang="scss">
.selectCountry {
  margin-top: 18px;
}
.allowedCountries {
  label {
    display: block;
    .select {
      position: relative;
      top: 2px;
      margin-right: 6px;
    }
  }
}
</style>
