<template>
  <section class="error-page">
    <div class="error">
      <p class="num">404 NOT FOUND</p>
      <p class="info">糟糕！您访问的页面不存在了</p>
    </div>
    <div class="navigator">
      <router-link class="link icon-home" :to="{ path: '/' }">Home</router-link>
      <router-link class="link icon-user" :to="{ path: '/about' }">About</router-link>
      <router-link class="link icon-message_board" :to="{ path: '/msgbd' }">Message Board</router-link>
      <a class="link icon-github" href="https://github.com/sansiro-me">Github</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'bottom'
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  .error-page {
    padding: 0;
  }
}
@media screen and (min-width: 481px) {
  .error-page {
    padding-top: 100px;

    .error {
      margin: 0 8px;
    }
  }
}

.error-page {
  max-width: 100%;
  width: 900px;
  margin: 0 auto;

  .error {
    background-color: #f5fdfe;
    @extend %box;
    height: 160px;
    overflow: hidden;

    p {
      color: #04bed2;

      &.num {
        margin-top: 30px;
        font-size: 40px;
        line-height: 70px;
      }

      &.info {
        font-size: 20px;
        line-height: 40px;
      }
    }
  }

  .navigator {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 8px 0;

    .link {
      // flex-grow: 1;
      height: 20px;
      // margin: 0 8px;
      background-color: #fff;
    }
  }
}
</style>
