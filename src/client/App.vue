<template>
  <div id="app">
    <div id="top"></div>
    <div class="main-bg"></div>
    <div class="main-area">
      <router-view class="main"></router-view>
      <Footer></Footer>
      <side-menu></side-menu>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import SideMenu from '@/components/SideMenu'

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
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  overflow-x: hidden;

  #top {
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
  }

  .main {
    box-sizing: border-box;
  }

  .main-bg {
    position: fixed;
    width: 120%;
    height: 120%;
    left: 0;
    top: 0;
    transform: translate(-10%, -10%);
    @include bgimg('~@/assets/images/bg2.jpeg');
    filter: blur(20px);
    z-index: -1;
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
