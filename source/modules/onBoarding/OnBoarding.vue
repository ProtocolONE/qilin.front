<template>
<div>
  <Step1
    v-show="step == 1"
    ref="step1"
    @nextStep="nextStep"
  />
  <Step2
    v-show="step == 2"
    ref="step2"
    @createVendor="emitCreateVendor"
  />
</div>
</template>

<script type="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';

export default Vue.extend({
  name: 'OnBoarding',
  components: { Step1, Step2 },
  data: () => ({
    step: 1,
    vendorName: '',
  }),
  mounted() {},
  methods: {
    ...mapActions(['createVendor']),

    nextStep(vendorName) {
      this.vendorName = vendorName;

      this.step += 1;
    },
    emitCreateVendor(howManyProds) {
      const query = {
        name: this.vendorName,
        howManyProds,
      };
      this.createVendor(query)
        .then(() => this.$router.push({path: '/games'}));
    },
  },
});
</script>
