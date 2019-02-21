<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">

      <form class="modal-container" @submit.prevent="submit" @reset.prevent="hideModal">

        <header class="modal-header">
          <h2>
            {{ (isEdit) ? $t('editSale') : $t('createNewSale') }}
          </h2>
          <a href="javascript:void(0)" class="close" @click="hideModal">
            <icon name="times" width="10px" height="10px" fill="#C4C4C4"/>
          </a>
        </header>

        <div class="modal-body">

          <ui-input
            v-model="label"
            :label="$t('saleLabel')"
            :additional-info="$t('notVisibleForUsers')"
            required
          />

          <ui-input
            v-model.number="rate"
            :label="$t('rate')"
            :additional-info="$t('discountRate')"
          />

          <div class="dates">
            <datepicker
              v-model="start"
              :editable="false"
              :placeholder="$t('start')"
              :not-before="new Date()"
              :lang="$i18n.locale"
              :time-picker-options="{ start: '00:00', step: '00:30', end: '23:30' }"
              value-type="date"
              format="YYYY-MM-DD hh:mm:ss a"
              type="datetime"
              width="auto"
              required
              class="datepicker"
              @input="end = null"
            />
            <datepicker
              v-model="end"
              :editable="false"
              :placeholder="$t('end')"
              :not-before="addDaysToDate(start)"
              :disabled="!start"
              :lang="$i18n.locale"
              :time-picker-options="{ start: '00:00', step: '00:30', end: '23:30' }"
              value-type="date"
              format="YYYY-MM-DD hh:mm:ss a"
              type="datetime"
              width="auto"
              required
              class="datepicker"
            />
          </div>

          <ui-input
            v-model="description"
            :label="$t('description')"
          />

        </div>

        <footer class="modal-footer">
          <ui-button :text="$t('cancel')" type="reset"/>
          <ui-button :text="getSubmitText" :disabled="emptyFields" type="submit"/>
        </footer>

      </form>

    </div>
  </div>
</transition>
</template>

<script lang="ts">
import i18n from '../i18n'

import Icon from './Icon'
import Datepicker from 'vue2-datepicker'

import {
  TextField as UiInput,
  Button as UiButton
} from '@protocol-one/ui-kit'

export default {
  name: 'SalesCreateSale',

  i18n,

  components: { Icon, Datepicker, UiInput, UiButton },

  props: {
    data: Object
  },

  data () {
    let {
      description = '',
      rate = 50,
      title: label = '',
      date: {
        start = new Date(),
        end = null
      } = {}
    } = this.data
    return { label, description, rate, start, end }
  },

  computed: {
    isEdit () {
      return Object.keys(this.data).length
    },

    getSubmitText () {
      return (this.isEdit) ? this.$t('save') : this.$t('create')
    },

    emptyFields () {
      return !(this.label && this.start && this.end)
    }
  },

  methods: {
    addDaysToDate (date, days = 1) {
      date = new Date(date)
      return date.setDate(date.getDate() + days)
    },

    hideModal () {
      this.$emit('hide')
    },

    submit () {
      this.$emit((this.isEdit) ? 'update' : 'create', this.$data)
    }
  }
}
</script>

<style lang="scss" scoped>
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

        .dates {
          display: flex;
          align-items: center;
          justify-content: space-between;
          > div {
            width: calc(50% - 10px) !important;
          }
        }
      }

      .modal-footer {
        align-items: center;
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

<style lang="scss">
.datepicker {
  .mx-input {
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #e5e5e5;
    box-shadow: none;
    font-size: 16px;
    line-height: 32px;
    color: #333;
    transition: border-color .2s ease-out;

    &::placeholder {
      color: #b1b1b3;
    }

    &:focus {
      border-color: #3787ff;
    }

    &-append {
      svg {
        height: auto;
      }
    }
  }
}
</style>
