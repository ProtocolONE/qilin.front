
<template>
  <div class="langs-bar">

    <LangButton v-for="(value) in list"
                @click="onSelect(value)"
                :select="value === select"
                :key="value"
                :text="value"/>

  </div>
</template>

<script type="ts">
  import Vue from 'vue'
  import LangButton from './LangButton'

  export default Vue.extend({
    components: {LangButton},
    props: {
      list: {
        type: Array,
        default: () => ['en', 'ru', 'fr', 'ptbr'],
      },
      select: {
        type: String,
        default: 'en',
      }
    },
    name: "LangsBar",
    data: () => ({

    }),
    methods:{
      onSelect(value){
        this.select = value;
        this.$emit('select', value);
      }
    }
  })
</script>

<style scoped lang="scss">
  .langs-bar {

  }
</style>
