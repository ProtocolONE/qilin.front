<template>
<div class="reviews">
  <Headline
    id="reviews"
    level="2"
  >
    {{ $t('reviews') }}
  </Headline>
  <Review
    v-for="(review, index) in descriptions.reviews"
    :key="index"
    :review="review"
    :number="index + 1"
    @input="review => changeReview({index, review})"
  />
  <Textarea
    class="own_review"
    :label="$t('own_review')"
    :value="descriptions.additionalDescription"
    @input="value => changeProp({prop: 'additionalDescription', value})"
  />
</div>
</template>
<script type="ts">
  import Vue from 'vue';
  import { mapState, mapMutations } from 'vuex';
  import { TextField, Textarea } from '@protocol-one/ui-kit';
  import Headline from '@/components/Headline';
  import i18n from '../i18n';
  import Review from './Review.vue';

  export default Vue.extend({
    i18n,
    components: { TextField, Textarea, Headline, Review },
    computed: {
      ...mapState('Game/Descriptions', ['descriptions']),
    },
    methods: {
      ...mapMutations('Game/Descriptions', ['changeProp', 'changeReview']),
    },
  })
</script>

<style scoped lang="scss">

</style>