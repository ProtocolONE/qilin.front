<template>
<!-- TODO: breadcrumbs -->
<ui-page-header :title="$t('sales')" class="page-header">

  <ui-text-field
    slot="search"
    :value="$route.query.search"
    :label="$t('search')"
    @input="$emit('search', $event)"
  />

  <ul slot="hint" class="switcher-list">
    <li
      v-for="type in renderTypes"
      :key="type"
      :class="{ active: type === $route.query.type }"
      class="switcher-list__item"
      @click="$emit('rerender', type)"
    >
      <icon
        :name="type"
        width="18"
        height="18"
        fill="#333"
        class="switcher-list__icon"
      />
    </li>
  </ul>

  <ui-button
    slot="right"
    :text="$t('createNewSale')"
    @click="$emit('show-modal')"
  />

</ui-page-header>
</template>

<script>
import Icon from '@/icons'
import {
  PageHeader as UiPageHeader,
  TextField as UiTextField,
  Button as UiButton
} from '@protocol-one/ui-kit'

export default {
  name: 'SalesPageHeader',

  inject: ['$i18n'],

  components: {
    Icon,
    UiPageHeader,
    UiTextField,
    UiButton
  },

  data () {
    return {
      renderTypes: ['calendar', 'table']
    }
  }
}
</script>

<style lang="scss" scoped>
$switcher-color: #EAEAEA;

.page-header {
  /deep/
  .search {
    margin-left: auto;
  }

  /deep/
  .hint  {
    margin-right: 33px;
    margin-left: auto;
  }
}

.switcher-list {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style-type: none;

  &__item {
    padding: 6px 15px;
    border: 1px solid $switcher-color;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color .2s linear;

    &.active {
      cursor: default;
      background-color: $switcher-color;

      .switcher-list__icon {
        fill: #C4C4C4;
      }
    }

    &:first-child {
      padding-right: 10px;
      border-right: 0;
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    &:last-child {
      padding-left: 10px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }

  &__icon {
    transition: fill .2s linear;
  }
}
</style>
