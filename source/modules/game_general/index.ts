import Vue from 'vue';
import Button from '@protocol-one/ui-kit/src/Button.vue';
import i18n from './i18n';

export default Vue.extend({
  name: 'GameGeneral',
  components: { Button },
  props: {
    gameId: {
      type: String,
      require: true,
      default: '',
    },
  },
  i18n,
  computed: {},
  mounted() {},
  methods: {},
});
