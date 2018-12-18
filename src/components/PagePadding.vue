<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import url('~@/assets/mixin/markdown.scss');

@media screen and (max-width: 480px) {
  .content {
    padding: 20px;
  }
}
@media screen and (min-width: 481px) {
  .content {
    padding: 30px;
  }
}
.content {
  text-align: justify;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>

