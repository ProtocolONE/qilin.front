<template>
<UiModal
  v-show="hasModal"
  @close="$emit('cancel')"
>
  <UiHeader
    slot="header"
    level="1"
  >
    {{ $t(`modal.${modalType}.title`) }}
  </UiHeader>

  <div
    slot="main"
    class="ui-modal-main"
  >
    <div class="add-role">
      <UiTextField
        v-if="hasEmail"
        :errorText="$t('invalidEmail')"
        :hasError="!isEmailValid"
        :label="$t('email')"
        @input="email = $event"
      />
      <template v-if="currentGame">
        <div
          class="return-to-games"
          @click="changeSelectedGame(null)"
        >
          <svg viewBox="0 0 7 10">
            <path d="M6 1L2 4.95506L6 9" />
          </svg>
          <span class="return-text">
            {{ $t('selectGame') }}
          </span>
        </div>

        <div class="add-role-box">
          <div class="left">
            <div class="game">
              <div
                v-if="currentGame.icon"
                class="game-logo"
                :style="{ backgroundImage: `url(${currentGame.icon})` }"
              />
              {{ currentGame.internalName }}
            </div>
          </div>
          <div class="right">
            <label
              v-for="(role, key) in roles"
              class="checkbox"
              :key="key"
            >
              <span class="label">
                {{ role.label }}
              </span>
              <UiCheckbox
                class="check"
                :checked="role.checked"
                @change="changeCheckedRole(key)"
              />
            </label>
          </div>
        </div>
      </template>

      <UiSelect
        v-else
        class="select"
        :options="options"
        :placeholder="$t('game')"
        :value="selectedGameId"
        @input="changeSelectedGame"
      />
    </div>
  </div>

  <div
    slot="footer"
    class="ui-modal-footer"
  >
    <UiButton
      class="btn-item"
      :isTransparent="true"
      @click="$emit('cancel')"
    >
      {{ $t(`modal.${modalType}.cancel`) }}
    </UiButton>
    <UiButton
      class="btn-item"
      :disabled="IsSubmitDisabled"
      @click="$emit('submit', { selectedGameId, rolesList, email })"
    >
      {{ $t(`modal.${modalType}.submit`) }}
    </UiButton>
  </div>
</UiModal>
</template>

<script type="ts">
import Vue from 'vue';
import { find, map, without } from 'lodash-es';
import {
  UiButton,
  UiCheckbox,
  UiHeader,
  UiModal,
  UiSelect,
  UiTextField,
} from '@protocol-one/ui-kit';
import i18n from './i18nAddRole';

export default Vue.extend({
  i18n,
  components: { UiButton, UiCheckbox, UiHeader, UiModal, UiSelect, UiTextField },
  props: {
    games: {
      default: () => ([]),
      type: Array,
    },
    hasModal: {
      default: false,
      type: Boolean,
    },
    isLastStep: {
      default: false,
      type: Boolean,
    },
    modalType: {
      default: 'invite',
      type: String,
    },
  },
  data() {
    return {
      email: '',
      rolesList: [],
      selectedGameId: null,
    };
  },
  computed: {
    currentGame() {
      return find(this.games, game => game.id === this.selectedGameId) || null;
    },
    hasEmail() {
      return this.modalType === 'invite';
    },
    isEmailValid() {
      const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,11})$/;
      return this.email === '' ? true : regex.test(this.email);
    },
    options() {
      return map(this.games, game => ({ value: game.id, label: game.internalName }));
    },
    roles() {
      return {
        support: { checked: false, label: this.$i18n.t('roles.support') },
        manager: { checked: false, label: this.$i18n.t('roles.manager') },
      };
    },
    IsSubmitDisabled() {
      return !this.isLastStep ||
        !this.rolesList.length ||
        (this.hasEmail && (!this.isEmailValid || this.email === ''));
    },
  },
  methods: {
    changeCheckedRole(key) {
      this.roles[key].checked = !this.roles[key].checked;
      this.rolesList = this.roles[key].checked
        ? [ ...this.rolesList, key ]
        : without(this.rolesList, key);
    },
    changeSelectedGame(gameId) {
      this.selectedGameId = gameId;

      this.$emit('changeStep', gameId ? 'last' : 'first');
    },
  },
});
</script>

<style scoped lang="scss">
.ui-modal-main {
  max-width: 540px;
  width: 540px;
}
.ui-modal-footer {
  display: flex;
  justify-content: flex-end;
}
.btn-item {
  margin-left: 18px;
}
.add-role {
  max-width: 540px;
  display: flex;
  flex-direction: column;
  min-height: 360px;
}
.return-to-games {
  color: #b1b1b1;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 30px;

  & > svg {
    fill: none;
    height: 10px;
    width: 7px;

    & > path {
      stroke: #999999;
      stroke-linecap: round;
      stroke-width: 2px;
    }
  }
}
.return-text {
  margin-left: 6px;
}
.add-role-box {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  color: #0c2441;
  font-size: 16px;
}
.left,
.right {
  display: flex;
  align-items: flex-start;
}
.left {
  width: 55%;
}
.right {
  width: 40%;
}
.logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  margin-right: 12px;
  vertical-align: middle;
}
.select {
  max-width: 50%;
}
.checkbox {
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  justify-content: space-between;
}
.check {
  height: 20px;
  margin-left: 16px;
}
</style>
