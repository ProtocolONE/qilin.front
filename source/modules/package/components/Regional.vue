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
    <UiButton
      class="removeCountry"
      color="orange"
      @click="clickRemove"
      :disabled="!select.length"
    >
      {{ $t('remove') }}
    </UiButton>
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
    </div>
    <p v-else
       class="allowedCountries"
    >
      {{ $t('allowedInAllCountries') }}
    </p>
  </section>

</article>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {includes, toPairs, without} from 'lodash-es';
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
    /**
     * @typedef {allowedCountries: string[]} RegionalRestrictions
     * @type {RegionalRestrictions}
     */
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
        .filter(item => !includes(allowed, item.value));
    },
    allowedCountries () {
      return this.region.allowedCountries || [];
    },
  },
  methods: {
    isChecked(country) {
      return includes(this.select, country);
    },
    changeSelect(country) {
      this.select = includes(this.select, country)
        ? without(this.select, country)
        : this.select.concat([country]);
    },
    clickNewCountry() {
      if (!this.newCountry) {
        return;
      }
      this.$emit('change', {
        allowedCountries: this.allowedCountries
          .concat([this.newCountry])
      });
      this.newCountry = '';
    },
    clickRemove() {
      this.$emit('change', {
        allowedCountries: this.allowedCountries
          .filter(country => !includes(this.select, country))
      });
      this.select = [];
    }
  },
});
</script>

<style scoped lang="scss">
.selectCountry {
  margin-top: 18px;
}
.removeCountry {
  margin-left: 10px;
}
.allowedCountries {
  margin-top: 20px;
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
