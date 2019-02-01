
<template>
  <div class="media-page">
    <h2>{{$t('cover_image')}}</h2>
    <p class="top-descr">{{$t('cover_image_descr')}}</p>
    <UploadImage :text="$t('upload_cover_image')"/>
    <LangsBar @select="coverLangSelect"/>
  </div>
</template>

<script type="ts">
  import Vue from 'vue'
  import { mapState, mapActions } from 'vuex';
  import i18n from './locals'
  import UploadImage from './components/UploadImage'
  import LangsBar from './components/LangsBar'

  export default Vue.extend({
    props: {
      gameId: {
        type: String,
        require: true,
      }
    },
    components: {UploadImage, LangsBar},
    i18n,
    name: "Media",
    mounted() {
      this.initState();
    },
    /*computed: {
      ...mapState('Media', ['media']),
    },*/
    methods: {
      ...mapActions('Media', ['initState']),
      coverLangSelect(value){
        alert(value);
      }
    },
  })
</script>

<style scoped lang="scss">
  .media-page {
    width: 735px;
    padding: 33px 30px;
    font-size: 16px;
    font-family: Lato;
  }
  h2 {
    font-size: 21px;
  }
  p.top-descr {
    color: #9b9b9b;
    font-size: 15px;
    margin-bottom: 4px;
  }
</style>
