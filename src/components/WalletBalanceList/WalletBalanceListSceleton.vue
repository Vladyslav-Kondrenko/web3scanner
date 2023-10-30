<template>
  <ul class="balance-tokens__list">
    <li class="balance-tokens__item">
      <div
        class="balance-tokens__item-img balance-tokens__item-img--sceleton skeleton"
      ></div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name skeleton"></p>
        <p class="balance-tokens__item-quote skeleton"></p>
      </div>
    </li>
    
    <li class="balance-tokens__item">
      <div
        class="balance-tokens__item-img balance-tokens__item-img skeleton"
      ></div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name skeleton"></p>
        <p class="balance-tokens__item-quote skeleton"></p>
      </div>
    </li>
    
    <li class="balance-tokens__item">
      <div
        class="balance-tokens__item-img balance-tokens__item-img skeleton"
      ></div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name skeleton"></p>
        <p class="balance-tokens__item-quote skeleton"></p>
      </div>
    </li>
    
    <li class="balance-tokens__item">
      <div
        class="balance-tokens__item-img balance-tokens__item-img skeleton"
      ></div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name skeleton"></p>
        <p class="balance-tokens__item-quote skeleton"></p>
      </div>
    </li>
    
    <li class="balance-tokens__item">
      <div
        class="balance-tokens__item-img balance-tokens__item-img skeleton"
      ></div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name skeleton"></p>
        <p class="balance-tokens__item-quote skeleton"></p>
      </div>
    </li>
    
    <li class="balance-tokens__item">
      <div
        class="balance-tokens__item-img balance-tokens__item-img skeleton"
      ></div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name skeleton"></p>
        <p class="balance-tokens__item-quote skeleton"></p>
      </div>
    </li>
    
    <li class="balance-tokens__item">
      <div
        class="balance-tokens__item-img balance-tokens__item-img skeleton"
      ></div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name skeleton"></p>
        <p class="balance-tokens__item-quote skeleton"></p>
      </div>
    </li>
    
    <li class="balance-tokens__item">
      <div
        class="balance-tokens__item-img balance-tokens__item-img skeleton"
      ></div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name skeleton"></p>
        <p class="balance-tokens__item-quote skeleton"></p>
      </div>
    </li>

  </ul>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.balance-tokens {
    &__item{
        padding: 8px 8px;

    }
  &__item-img {
    flex-shrink: 0;
}

  &__item-info{
    width: 100%;
  }

  &__item-name{
    width: 40%;
    height: 12px;
    margin-bottom: 4px;
  }

  &__item-quote{
    width: 20%;
    height: 14px;
  }
}


</style>