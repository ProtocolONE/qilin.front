import Vue from 'vue'
import { mapState, mapActions, mapMutations } from 'vuex';
import i18n from './i18n'
import Button from '../../components/ui-kit/Button.vue'

export default Vue.extend({
  props: {
    gameId: {
      type: String,
      require: true,
    }
  },
  components: {Button},
  i18n,
  name: "GameGeneral",
  mounted() {},
  computed: {},
  methods: {},
})