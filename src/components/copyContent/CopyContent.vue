<template>
  <div class="copy-content">
    <div class="copy-content__text">
      <slot name="content"></slot>
    </div>
    <button class="copy-content__button" @click.prevent="copyContentToClipboard">
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
    contentForCopy: {
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

  &__text{
    display: flex;
    align-items: center;
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  
    a{
      color: inherit;
    }
  }

  &__button{
    display: flex;
    align-items: center;
  }
}

</style>