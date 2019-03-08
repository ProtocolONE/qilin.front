<template>
<transition name="modal">
  <div
    class="modal-mask"
    @click.self="$emit('close')"
  >
    <div class="modal-container">
      <form
        method="post"
        @submit.prevent="submit"
      >
        <div
          class="modal-header"
          v-if="hasHeaderSlot"
        >
          <slot name="header" />
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div
          class="modal-footer"
          v-if="hasFooterSlot"
        >
          <slot name="footer" />
        </div>
      </form>
    </div>
  </div>
</transition>
</template>

<script type="ts">
export default {
  computed: {
    hasHeaderSlot() {
      return !!this.$slots.header
    },
    hasFooterSlot() {
      return !!this.$slots.footer
    },
  }
}
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
  transition: opacity 0.3s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
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
