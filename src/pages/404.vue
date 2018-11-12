<template>
  <section class="error-page">
    <div class="error">
      <p class="num">404 NOT FOUND</p>
      <p class="info">糟糕！您访问的页面不存在了</p>
    </div>
    <div class="navigator">
      <router-link class="link" :to="{ path: '/' }"><i class="icon-home"></i><span>Home</span></router-link>
      <router-link class="link" :to="{ path: '/about' }"><i class="icon-user"></i><span>About</span></router-link>
      <router-link class="link" :to="{ path: '/msgbd' }"><i class="icon-message_board"></i><span>Msg</span></router-link>
      <a class="link" href="https://github.com/sansiro-me"><i class="icon-github"></i><span>Github</span></a>
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
    padding-top: 100px;

    .num {
      font-size: 34px;
    }

    .info {
      font-size: 19px;
    }
  }

  .link {
    height: 50px;

    i {
      display: block;
      font-size: 25px;
      line-height: 50px;
    }

    span {
      display: none;
    }
  }
}
@media screen and (min-width: 481px) {
  .error-page {
    padding-top: 200px;

    .num {
      font-size: 40px;
    }

    .info {
      font-size: 20px;
    }
  }

  .link {
    height: 40px;
    line-height: 40px;

    i {
      margin-right: 8px;
    }
  }
}

.error-page {
  max-width: 100%;
  width: 900px;
  margin: 0 auto;

  .error {
    background-color: rgba(255, 255, 255, 0.86);//#f5fdfe;
    @extend %box;
    height: 160px;
    overflow: hidden;
    margin: 0 8px;
    transition: .3s;

    &:hover {
      background-color: #f5fdfe;
    }

    p {
      color: #04bed2;

      &.num {
        margin-top: 30px;
        line-height: 70px;
      }

      &.info {
        line-height: 40px;
      }
    }
  }

  .navigator {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 8px 0;

    .link {
      display: block;
      width: 25%;
      margin-right: 5px;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 3px;
      box-shadow: 0 3px 3px 0 rgba(0,0,0,.1), 0 1px 10px 0 rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.15);
      color: #647575;
      text-decoration: none;
      transition: .3s;

      &:hover {
        background-color: #fff;
        transform: translateY(2px);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
