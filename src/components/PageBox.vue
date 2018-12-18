<template>
  <section class="page-area">
    <div class="page">
      <slot></slot>
    </div>

    <slot name="other"></slot>

    <div class="bottom"></div>
  </section>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  .page-area {
    padding: 0;

    .page {
      .my-info {
        padding: 0 20px;
      }
    }
  }
}
@media screen and (min-width: 481px) {
  .page-area {
    padding-top: 170px;

    .page {
      margin: 0 8px;

      .my-info {
        padding: 0 30px;
      }
    }
  }
}

.page-area {
  max-width: 100%;
  width: 900px;
  margin: 0 auto;

  .page {
    background-color: #fff;
    @extend %box;
  }
}

.bottom {
  height: 120px;
}
</style>
