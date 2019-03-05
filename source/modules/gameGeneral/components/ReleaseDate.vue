<template>
<div class="game-release">
  <DateTimeInput
    :dateLabel="$t('dateLabel')"
    :locale="$i18n.locale"
    :timeLabel="$t('timeLabel')"
    :timestamp="timestamp"
    @input="changeReleaseDate"
  />
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from 'date-fns';
import { DateTimeInput } from '@protocol-one/ui-kit';
import i18n from './i18nReleaseDate';

export default Vue.extend({
  i18n,
  components: { DateTimeInput },
  props: {
    releaseDate: {
      default: '',
      type: String,
    },
  },
  computed: {
    timestamp() {
      if (this.releaseDate) {
        return new Date(this.releaseDate).getTime();
      }

      return 0;
    },
  },
  methods: {
    changeReleaseDate(timestamp: number) {
      if (timestamp === 0) {
        this.$emit('change', '');
        return;
      }

      const releaseDate = format(timestamp, `yyyy-MM-dd'T'HH:mm:ssZ`);
      this.$emit('change', releaseDate);
    },
  },
});
</script>
