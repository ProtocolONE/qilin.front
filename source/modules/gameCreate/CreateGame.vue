<template>
<transition name="modal">
  <div class="modal-mask">
    <div
      class="modal-wrapper"
      @click.self="$emit('close')"
    >
      <div class="modal-container">
        <form
          method="post"
          @submit.prevent="submit"
        >
          <div class="modal-header">
            <h2>{{ $t('title') }}</h2>
          </div>
          <div class="modal-body">
            <label>{{ $t('name') }}</label>
            <input
              v-model="internalName"
              type="text"
              required
            >
            <small>{{ $t('you_can_change') }}</small>
          </div>
          <div class="modal-footer">
            <Button
              type="submit"
              class="modal-default-button"
              :text="$t('create')"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</transition>
</template>

<script type="ts">
import Vue from 'vue'
import {mapActions, mapState} from 'vuex'
import {Button} from '@protocol-one/ui-kit'
import i18n from './i18n'

export default Vue.extend({
  i18n,
  components: {Button},
  props: {
    vendorId: {
        type: String,
        required: true,
        default: '',
      }
    },
  data: () => ({
    internalName: '',
  }),
  computed: {
    ...mapState('CreateGame', ['gameId']),
  },
  watch: {
    gameId() {
      this.$emit('create', this.gameId);
    }
  },
  methods: {
    ...mapActions('CreateGame', ['createGame']),
    submit() {
      this.createGame({
        internalName: this.internalName,
        vendorId: this.vendorId,
      });
    }
  }
})
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      width: 1000px;
      background-color: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      border-radius: 4px;

      margin: 0px auto;
      padding: 20px 30px;
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;

      .modal-header {
        margin-top: 0;
        align-items: center;
        justify-content: center;
      }

      .modal-body {
        margin: 20px 0;
      }

      .modal-footer {
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.modal-container {
  *,
  h2 {
    font-size: 18px;
  }
}

.modal-body {
  label {
    display: block;
  }
  input {
    display: block;
    width: 100%;
    padding: 12px 23px;
    border: 1px solid black;
    background-color: #e9e9e9;
    border-radius: 3px;
  }
  small {
    margin-top: 10px;
    font-size: 16px;
    display: block;
  }
}

/*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
