<template>
  <div class="bottom">
    <div class="each left">
      <div class="left-area">
        <a class="github icon-github" href="https://github.com/sansiro-me"></a>
        <a class="email icon-email" href="mailto:sansiro.me@outlook.com?subject=来自SANSIRO.ME博客"></a>
      </div>
    </div>
    <div class="each center">
      <p>Copyright ©  2018  SANSIRO.ME</p>
      <p>晋ICP备17008841号</p>
    </div>
    <div class="each right">
      <p>Powered by sansiro's blog</p>
    </div>
    <scroll-top class="scroll-pos"></scroll-top>
  </div>
</template>

<script>
import ScrollTop from '@/components/ScrollTop'

export default {
  name: 'bottom',
  components: {
    ScrollTop
  }
}
</script>

<style lang="css" scoped>
@import url('~@/assets/mixin/icon.css');
</style>

<style lang="scss" scoped>
@media screen and (min-width: 801px) {
  .bottom {
    height: 160px;
    font-size: 15px;
    flex-direction: row;

    .each {
      width: 33.33%;
      line-height: 60px;
      height: 60px;
    }
  }
}
@media screen and (max-width: 800px) {
  .bottom {
    height: 180px;
    font-size: 14px;
    flex-direction: column;

    .each {
      width: 100%;
      line-height: 45px;
      height: 45px;
    }
  }
}
.bottom {
  position: relative;
  display: flex;
  background-color: #fffefe;
  align-items: center;
  justify-content: center;
  color: #9e9e9e;

  & > div {
    box-sizing: border-box;

    & > p {
      font-weight: 450;
    }
  }

  .left {
    display: flex;
    align-items: center;
    justify-content: space-around;
    
    .left-area {
      width: 200px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }

    a {
      display: block;
      width: 24px;
      height: 24px;
      color: #fff;
      text-decoration: none;
      line-height: 24px;
      text-align: center;
      font-size: 20px;
      background-color: #9e9e9e;
      border-radius: 3px;
      transition: all .3s ease-in-out;

      &:hover {
        background-color: red;
      }
    }
  }

  .center {
    line-height: 28px;
  }

  .scroll-pos {
    position: absolute;
    right: 8%;
    top: 0;
    transform: translateY(-50%);
  }
}
</style>
