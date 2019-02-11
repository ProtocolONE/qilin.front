<template>
<div class="game-creators">
  <span class="title">{{ $t('title') }}</span>
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
      const releaseDate = format(timestamp, 'yyyy-MM-ddTHH:mm:ssZ')
      this.$emit('changeReleaseDate', releaseDate);
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  display: block;
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: 500;
}
</style>
