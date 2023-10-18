<template>
  <div class="primary-card text-on-light-blue">
    <p class="primary-card__pretitle">
        <slot name="pretitle"></slot>
    </p>

    <h2 class="primary-card__title">
        <slot name="title"></slot>
    </h2>

    <div class="primary-card__content">
        <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
    mounted(){
        console.log(this.$slots)
    }
}
</script>

<style lang="scss">

.primary-card{
    padding: 16px;
    background: RGB(var(--v-theme-surface));
    
    &__title{
        display: flex;
        align-items: center;
        gap: 4px;
    }
}

</style>