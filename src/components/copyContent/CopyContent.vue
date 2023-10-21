<template>
  <div class="copy-content">
    <div class="copy-content__text">
      <slot name="content"></slot>
    </div>
    <button class="copy-content__button" @click="copyContentToClipboard">
      <img :src="buttonImageUrl" alt="" class="copy-content__icon" />
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    copiedStatus: 0,
  }),

  props: {
    visualContent: {
      type: [String, Number],
      required: false,
      default: "",
    }
  },

  methods: {
    copyContentToClipboard() {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(
          this.contentForCopy);
        this.copiedStatus = 1;
      } else {
        this.copiedStatus = 2;
      }
      setTimeout(() => {
        this.copiedStatus = 0;
      }, 1000);
    },
  },

  computed: {
    buttonImageUrl() {
      return require(`@/components/copyContent/img/copy-${this.copiedStatus}.svg`);
    },
  },
};
</script>

<style lang="scss">

.copy-content{
  display: flex;
  align-items: center;
  gap: 4px;

  &__button{
    display: flex;
    align-items: center;
  }
}

</style>