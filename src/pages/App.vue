<template>
  <div id="app">
    <div class="main-bg">
      <div class="bg-img"></div>
    </div>
    <div class="main-area">
      
      <keep-alive max="2">
        <router-view v-if="$route.meta.keepAlive !== false" class="main"></router-view>
      </keep-alive>
      <router-view v-if="$route.meta.keepAlive === false" class="main"></router-view>

      <Footer></Footer>
      <side-menu></side-menu>
    </div>
  </div>
</template>

<script>
import Footer from '@c/Footer'
import SideMenu from '@c/SideMenu'

export default {
  name: 'App',
  components: {
    Footer,
    SideMenu
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
body {
  overflow-x: hidden;
  -webkit-overflow-scrolling:touch;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  overflow-x: hidden;

  .main {
    box-sizing: border-box;
  }

  .main-bg {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    .bg-img {
      width: 100%;
      height: 100%;
      @include bgimg('~@/assets/images/mainbg.jpg');


      // width: 120%;
      // height: 120%;
      // transform: translate(-10%, -10%);
      // @include bgimg('~@/assets/images/bg1.jpg');
      // filter: blur(100px);
    }
  }

  .main-area {
    position: relative;
    z-index: 1;
  }
}
@media screen and (min-width: 801px) {
  .main {
      min-height: calc(100vh - 160px);
  }
}
@media screen and (max-width: 800px) {
  .main {
      min-height: calc(100vh - 180px);
  }
}
</style>
