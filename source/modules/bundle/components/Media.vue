<template>
<div class="package-media">
  <Header
    level="2"
  >
    {{ $t('cover') }}
  </Header>
  <p
    class="no-margin"
    v-html="$t('cover_description')"
  />
  <CoverImage
    :value="media.cover"
    @change="updateProp('cover', $event)"
  />

  <Header
    level="2"
  >
    {{ $t('image') }}
  </Header>
  <p
    class="no-margin"
    v-html="$t('image_description')"
  />
  <CoverImage
    :value="media.image"
    @change="updateProp('image', $event)"
  />

  <Header
    level="2"
  >
    {{ $t('thumb') }}
  </Header>
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
  import {Header} from '@protocol-one/ui-kit';
  import i18n from './i18nMedia';
  import CoverImage from '../../gameMedia/components/CoverImage.vue';

  export default Vue.extend({
    i18n,
    components: {Header, CoverImage},
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
