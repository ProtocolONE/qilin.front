<template>
<div>
  <Headline>{{ $t(agency) }}</Headline>
  <div class="item">
    <div class="left">
      <Select
        :label="$t('rating_label')"
        :value="value.rating"
        :placeholder="$t('not_selected')"
        :options="options"
        @input="updateRating"
      />
      <TagInput
        :label="$t('add_descriptor')"
        :tags="allDescriptors"
        :selected-tags="selectedDescriptors"
        @change="changeSelDescriptors"
      />
      <label class="switch">
        <SwitchBox
          :disabled="!value.rating"
          :checked="value.displayOnlineNotice && !!value.rating"
          @change="changeDisplayNotice"
        /> {{ $t('display_notice') }}
      </label>
      <br>
      <label>
        <SwitchBox
          :disabled="!value.rating"
          :checked="value.showAgeRestrict && !!value.rating"
          @change="changeShowRestrict"
        /> {{ $t('age_gate') }}
      </label>
    </div>
    <div class="right">
      <img :src="`${staticPath}/images/ratings/${agency.toLowerCase()}/${value.rating || defIcon}.png`">
    </div>
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue'
  import {Select, SwitchBox, TagInput} from '@protocol-one/ui-kit';
  import {mapState} from 'vuex';
  import Headline from '@/components/Headline'
  import {includes} from 'lodash-es';
  import i18n from '../i18n';
  import config from '@/config';

  export default Vue.extend({
    i18n,
    components: {Headline, Select, SwitchBox, TagInput},
    props: {
      value: {
        type: Object,
        required: true,
      },
      agency: {
        type: String,
        required: true,
      },
      defIcon: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        staticPath: config.static,
      }
    },
    computed: {
      ...mapState('Game/Ratings', ['descriptors']),
      allDescriptors() {
        return this.getAgencyDescriptors()
          .map(d => d.title.en);
      },
      selectedDescriptors() {
        return this.getAgencyDescriptors()
          .filter(d => includes(this.value.descriptors || [], d.id))
          .map(d => d.title.en);
      }
    },
    methods: {
      getAgencyDescriptors() {
        return (this.descriptors || [])
          .filter(d => d.system === this.agency);
      },
      changeSelDescriptors(tags) {
        const ids = this.getAgencyDescriptors().filter(d => includes(tags, d.title.en)).map(d => d.id);
        this.$emit('change', {
          ...this.value,
          ...{descriptors: ids}
        });
      },
      updateRating(value) {
        this.$emit('change', {
          ...this.value,
          ...{
            rating: value,
            displayOnlineNotice: value ? this.value.displayOnlineNotice : false,
            showAgeRestrict: value ? this.value.showAgeRestrict : false,
          }
        });
      },
      changeDisplayNotice(value) {
        this.$emit('change', {
          ...this.value,
          ...{displayOnlineNotice: value}
        });
      },
      changeShowRestrict(value) {
        this.$emit('change', {
          ...this.value,
          ...{showAgeRestrict: value}
        });
      }
    },
  })
</script>

<style scoped lang="scss">
.item {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 40px;
}
.left {
  flex: 1;
}
.select-field {
  display: block;
  max-width: 300px;
}
.tag-input {
  padding-bottom: 13px;
}
.field {
  margin-top: -15px;
}
.right {
  flex: 0 0 200px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
label.switch {
  margin-bottom: 16px;
}
.switch-box {
  margin-bottom: -15px;
  margin-right: 10px;
}
.headline {
  font-size: 20px;
}
</style>