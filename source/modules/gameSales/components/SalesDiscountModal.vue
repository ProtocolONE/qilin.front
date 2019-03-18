<template>
<transition name="modal">
  <div class="modal-mask">
    <div class="modal-wrapper">

      <form class="modal-container" @submit.prevent="submit" @reset.prevent="closeModal">

        <header class="modal-header">
          <h2 class="modal-title">
            {{ (isEdit) ? $t('editSale') : $t('createNewSale') }}
          </h2>
          <a href="#" class="close" @click.prevent="closeModal">
            <icon name="times" width="10px" height="10px" fill="#C4C4C4"/>
          </a>
        </header>

        <div class="modal-body">

          <ui-text-field
            v-model="label"
            :label="$t('saleLabel')"
            :additional-info="$t('notVisibleForUsers')"
            required
          />

          <ui-text-field
            v-model.number="rate"
            :label="$t('rate')"
            :additional-info="$t('discountRate')"
          />


          <div class="dates">
            <ui-date-time-input
              v-model="start"
              :timestamp="start && new Date(start).getTime() || 0"
              :date-label="$t('start')"
              :locale="$i18n.locale"
            />
            <ui-date-time-input
              v-model="end"
              :timestamp="end && new Date(end).getTime() || 0"
              :date-label="$t('end')"
              :locale="$i18n.locale"
            />
          </div>

          <ui-text-field
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

<script>
import Icon from '@/icons'

import {
  TextField as UiTextField,
  DateTimeInput as UiDateTimeInput,
  Button as UiButton
} from '@protocol-one/ui-kit'
  
export default {
  name: 'SalesDiscountModal',

  inject: ['$i18n'],
  
  components: { Icon, UiTextField, UiDateTimeInput, UiButton },

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
    return { ...this.data, label, description, rate, start, end }
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

    closeModal () {
      this.$emit('close')
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

      margin: 0 auto;
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
  .modal-title {
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
