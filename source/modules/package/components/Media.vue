<template>
<div class="package-media">
  <UiHeader
    level="2"
  >
    {{ $t('cover') }}
  </UiHeader>
  <p
    class="no-margin"
    v-html="$t('cover_description')"
  />
  <CoverImage
    :value="media.cover"
    @change="updateProp('cover', $event)"
  />

  <UiHeader
    level="2"
  >
    {{ $t('image') }}
  </UiHeader>
  <p
    class="no-margin"
    v-html="$t('image_description')"
  />
  <CoverImage
    :value="media.image"
    @change="updateProp('image', $event)"
  />

  <UiHeader
    level="2"
  >
    {{ $t('thumb') }}
  </UiHeader>
  <p
    class="no-margin"
    v-html="$t('thumb_description')"
  />
  <CoverImage
    :value="media.thumb"
    @change="updateProp('thumb', $event)"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {UiHeader} from '@protocol-one/ui-kit';
import i18n from './i18nMedia';
import CoverImage from '../../gameMedia/components/CoverImage.vue';

export default Vue.extend({
  i18n,
  components: {UiHeader, CoverImage},
  props: {
    /**
     * @typedef {  image: LocalizedString; cover: LocalizedString; thumb: LocalizedString} PackageMedia
     * @type {PackageMedia}
     */
    media: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  methods: {
    updateProp(prop, value) {
      this.$emit('change', {...this.media, [prop]: value});
    },
  },
});
</script>

<style>

</style>
