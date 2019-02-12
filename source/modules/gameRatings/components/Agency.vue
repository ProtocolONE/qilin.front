<template>
<div>
  <Headline>{{ $t(agency) }}</Headline>
  <div class="item">
    <div class="left">
      <Select
        @input="updateRating"
        :label="$t('rating_label')"
        :value="value.rating"
        :placeholder="$t('not_selected')"
        :options="options"
      />
      <TagInput
        :label="$t('add_descriptor')"
        :tags="allDescriptors"
        :selectedTags="selectedDescriptors"
        @change="changeSelDescriptors"
      />
      <label>
        <SwitchBox
          :checked="value.displayOnlineNotice"
          @change="changeDisplayNotice"
        /> {{$t('display_notice')}}
      </label>
      <br/>
      <label>
        <SwitchBox
          :checked="value.showAgeRestrict"
          @change="changeShowRestrict"
        /> {{$t('age_gate')}}
      </label>
    </div>
    <div class="right">
      <img :src="ratingIconUrl"/>
    </div>
  </div>
</div>
</template>

<script type="ts">
  import Vue from 'vue'
  import {Select, SwitchBox, TagInput} from '@protocol-one/ui-kit';
  import {mapState} from 'vuex';
  import Headline from '@/components/Headline'
  import i18n from '../i18n';
  import {includes} from 'lodash-es';

  export default Vue.extend({
    i18n,
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
    components: {Headline, Select, SwitchBox, TagInput},
    computed: {
      ...mapState('Game/Ratings', ['descriptors']),
      allDescriptors() {
        return this.agency_descriptors()
          .map(d => d.title.en);
      },
      selectedDescriptors() {
        return this.agency_descriptors()
          .filter(d => includes(this.value.descriptors || [], d.id))
          .map(d => d.title.en);
      },
      ratingIconUrl() {
        // Using file_loader get url of the rating agency icon
        return '/' +
          require('../icons/'
            + this.agency.toLowerCase()
            + '/'
            + (this.value.rating || this.defIcon)
            + '.png'
          );
      },
    },
    methods: {
      agency_descriptors() {
        return (this.descriptors || [])
          .filter(d => d.system === this.agency);
      },
      changeSelDescriptors(tags) {
        const ids = this.agency_descriptors().filter(d => includes(tags, d.title.en)).map(d => d.id);
        this.$emit('change', {
          ...this.value,
          ...{descriptors: ids}
        });
      },
      updateRating(value) {
        this.$emit('change', {
          ...this.value,
          ...{rating: value}
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
  > .left {
    flex: 1;
    > .select-field {
      display: block;
      max-width: 300px;
    }
    .tag-input {
      padding-bottom: 13px;
      > .field {
        margin-top: -15px;
      }
    }
  }
  > .right {
    flex: 0 0 200px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  label {
    margin-bottom: 16px;
    .switch-box {
      margin-bottom: -15px;
    }
  }
}
h2 {
  font-size: 20px;
}
</style>