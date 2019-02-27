<template>
<div class="rich">
  <div class="menu">
    <button @click="clickBold">
      bold
    </button>
  </div>
  <div
    ref="content"
    class="content"
    contenteditable="true"
    @input="update"
  />
</div>
</template>

<script type="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        // /....
      }
    },
    watch: {
      value(value){
        if (this.$refs.content.innerHTML != value) {
          this.$refs.content.innerHTML = value;
        }
      }
    },
    mounted() {
      this.$refs.content.innerHTML = this.value;
    },
    methods: {
      update(event) {
        this.$emit('change', event.target.innerHTML);
      },
      isBelongs(node) {
        for (let i=0; i<100 && !!node; i++) {
          if (node === this.$refs.content) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      },
      wrapSelected(elementName) {
        const selection = window.getSelection();
        for (let i=0, len = selection.rangeCount; i < len; ++i) {
          const range = selection.getRangeAt(i);
          if (!this.isBelongs(range.commonAncestorContainer)) {
            continue;
          }
          const node = document.createElement(elementName);
          node.appendChild(range.cloneContents());
          range.deleteContents();
          range.insertNode(node);
        }
        this.$emit('change', this.$refs.content.innerHTML);
      },
      clickBold() {
        this.wrapSelected('strong');
      }
    },
  })
</script>

<style scoped lang="scss">
.rich {
  border: 1px solid #D9D9D9;
  border-radius: 2px;
}
.content {
  padding: 4px;
}
</style>