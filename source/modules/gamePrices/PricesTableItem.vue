<template>
<tr>
  <td class="cell">{{ currency }}</td>
  <td class="cell">
    <ui-text-field
      v-if="edit"
      v-model="editedPrice"
      v-focus
      class="cell__text-field"
    />
    <template v-else>
      {{ price }}
    </template>
  </td>
  <td class="cell">
    <ui-text-field
      v-if="edit"
      v-model="editedVat"
      class="cell__text-field"
    />
    <template v-else>
      {{ vat }}
    </template>
  </td>
  <td class="cell">{{ userPrice }}</td>
  <td class="cell cell--actions">
    <div v-if="edit" class="controls">
      <span class="controls__btn controls__btn--cancel" @click="cancelEdit">
        <icon name="times" width="10" height="10" fill="gray"/>
      </span>
      <span class="controls__btn controls__btn--submit" @click="savePrice">
        <icon name="check" width="12" height="12" fill="#FFF"/>
      </span>
    </div>
    <a
      v-else
      v-clickaway="hideActions"
      href="#"
      class="actions-link"
      @click.prevent="actions = true"
    >
      <icon name="dots" height="10" fill="#C4C4C4" class="actions-icon"/>
    </a>

    <transition name="fade">
      <ul v-show="actions" class="shadow actions-list">
        <li @click="handleEdit" class="actions-list__item">
          {{ $t('edit') }}
        </li>
        <li @click="$emit('set-default')" class="actions-list__item">
          {{ $t('asDefault') }}
        </li>
      </ul>
    </transition>
  </td>
</tr>
</template>

<script lang="ts">
import i18n from './i18n'
import Icon from '@/icons'
import { TextField as UiTextField } from '@protocol-one/ui-kit'

export default {
  name: 'PricesTableItem',

  i18n,

  directives: {
    focus: {
      inserted: el => el.querySelector('input').focus()
    }
  },

  components: { Icon, UiTextField },

  props: {
    currency: String,
    price: [Number, String],
    vat: [Number, String],
    userPrice: [Number, String]
  },

  data () {
    return {
      editedPrice: this.price,
      editedVat: this.vat,
      edit: false,
      actions: false
    }
  },

  methods: {
    handleEdit () {
      this.hideActions()
      this.edit = true
    },

    hideActions () {
      this.actions = false
    },

    cancelEdit () {
      this.edit = false
      this.editedPrice = this.price
      this.editedVat = this.vat
    },

    savePrice () {
      this.$emit('save-price', { price: this.editedPrice, vat: this.editedVat })
      this.edit = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cell {
  padding: 10px;
  padding-left: 15px;
  vertical-align: top;

  &--actions {
    position: relative;
  }

  &__price {
    padding: 4px;
  }

  &__text-field {
    padding: 0;
  }
}

.actions-link:active .actions-icon,
.actions-link:focus .actions-icon {
  fill: #2275D7;
}

.actions-icon {
  transition: fill .2s linear;
}

.actions-list {
  position: absolute;
  right: 0;
  bottom: 35px;
  z-index: 100;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: #FFF;
  border: 1px solid rgba(0, 0, 0, .05);

  &__item {
    padding: 10px 20px;
    color: #B1B1B1;
    white-space: nowrap;
    cursor: pointer;
    transition: color .2s linear, background-color .2s linear;

    &:hover {
      color: #333;
      background-color: #E3EEFF;
    }
  }
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-around;

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    transition: opacity .3s linear;

    &--cancel {
      border: 1px solid gray;
    }

    &--submit {
      border: 1px solid #2275D7;
      background-color: #2275D7;
    }

    &:hover {
      opacity: .7;
    }
  }
}
</style>
