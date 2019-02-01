<template>

  <div>

    <Media v-if="game !== null" :gameId="game.id"/>

  </div>

</template>

<script type="ts">
    import Vue from 'vue'
    import Media from '../media/Media'
    import axios from 'axios'
    import config from '@/config'
    import {GameInfo} from './types'

    export default Vue.extend({
        components:{Media},
        name: "Game",
        mounted(){
          axios.get(config.api + '/api/v1/games/' + this.$route.params.id)
            .then(res => {
              this.game = res.data;
            }).catch(err => alert(err.message));
        },
        data: () => ({
            game: null,
            enabled: true,
        }),
    })
</script>

<style scoped lang="scss">

</style>
