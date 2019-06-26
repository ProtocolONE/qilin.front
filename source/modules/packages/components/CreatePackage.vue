<template>
<UiModal
  @close="$emit('close')"
>
  <UiHeader
    slot="header"
    level="2"
  >
    {{ $t('title') }}
  </UiHeader>
  <div class="body" slot="main">
    <UiTextField
      :value="name"
      :label="$t('name')"
      @input="name = $event"
    />
    <div class="info" v-html="$t('searchText')"/>
    <UiTextField
      :value="search"
      :label="$t('search')"
      @input="inputSearch($event)"
    />
    <div class="games">
      <label
        v-for="game in foundGames"
        :key="game.id"
        class="item"
      >
        <UiCheckbox
          class="check"
          :checked="isChecked(game.id)"
          @change="switchGame(game.id)"
        />
        <span class="name">{{ game.internalName }}</span>
        <span class="date">{{ formatDate(game.releaseDate) }}</span>
      </label>
      <p v-if="!foundGames.length">
        {{ $t('not_found') }}
      </p>
    </div>
  </div>
  <div
    slot="footer"
    class="ui-modal-footer"
  >
    <UiButton
      :disabled="isOkDisabled"
      @click="clickOk"
    >
      {{ $t('ok') }}
    </UiButton>
  </div>
</UiModal>
</template>

<script type="ts">
import Vue from 'vue'
import {UiButton, UiCheckbox, UiHeader, UiModal, UiTextField} from '@protocol-one/ui-kit'
import {mapActions, mapGetters, mapState} from 'vuex';
import i18n from './i18nCreatePackage';
import formatDate from '@/helpers/formatDate';

export default Vue.extend({
  i18n,
  components: { UiModal, UiHeader, UiButton, UiTextField, UiCheckbox },
  data() {
    return {
      name: '',
      select: [],
      search: '',
      updateTimeout: null,
    }
  },
  computed: {
    ...mapGetters(['currentVendorId']),
    ...mapState('Packages', ['foundGames']),
    isOkDisabled() {
      return !this.select.length || !this.name.trim().length;
    },
  },
  mounted() {
    this.fetchGames({ vendorId: this.currentVendorId });
  },
  methods: {
    ...mapActions('Packages', ['fetchGames', 'createPackage']),

    clickOk() {
      this.createPackage({
        name: this.name,
        products: this.select,
        vendorId: this.currentVendorId,
      }).then(packageId => {
        this.$emit('close');
        this.$emit('create', packageId);
      });
    },
    inputSearch(value) {
      this.search = value;

      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        this.fetchGames({
          query: this.search,
          vendorId: this.currentVendorId,
        });
      }, 200);
    },
    isChecked(id) {
      return this.select.indexOf(id) > -1;
    },
    switchGame(id) {
      if (this.select.indexOf(id) > -1) {
        this.select = this.select.filter(gameId => gameId !== id);
      } else {
        this.select = this.select.concat([id]);
      }
    },
    formatDate(date) {
      return formatDate(
        date,
        'dd LLLL yyyy',
        this.$i18n.locale,
        this.$i18n.fallbackLocale
      );
    }
  }
})
</script>

<style scoped lang="scss">
.body {
  min-width: 550px;
}
.info {
  color: #b1b1b1;
  font-size: 12px;
  line-height: 17px;
}
.item {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  cursor: pointer;
  .check {
    width: 30px;
    margin-top: -2px;
  }
  .date {
    text-align: right;
    width: 150px
  }
  .name {
    flex: 1;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 500px;
  }
}
</style>
