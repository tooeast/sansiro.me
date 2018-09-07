<template>
  <div id="app">
    <div id="main" class="main" :class="{'go-left': isShowSideNav}" ref="main">
      <header-top id="headerTop"></header-top>
      <div class="shadow"></div>
      <router-view class="mainArea"></router-view>
      <footer-bottom></footer-bottom>
    </div>
    <nav-hide :stage="isShowSideNav" v-on:changeStage="changeShowStage"></nav-hide>
    <to-top :stage="isShowSideNav"></to-top>
    <side-nav :stage="isShowSideNav" v-on:hideSideNav="hideSide"></side-nav>
  </div>
</template>

<script>
import headerTop from '@/components/headerTop'
import footerBottom from '@/components/footerBottom'
import toTop from '@/components/toTop'
import sideNav from '@/components/sideNav'
import navHide from '@/components/navHide'

export default {
  name: 'app',
  components: {
    headerTop,
    footerBottom,
    toTop,
    sideNav,
    navHide
  },
  data() {
    return {
      isShowSideNav: false
    }
  },
  mounted () {

  },
  methods: {
    changeShowStage () {
      this.isShowSideNav = !this.isShowSideNav;
    },
    hideSide () {
      this.isShowSideNav = false;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
::selection{ color:#f00;background:#000; }
::-moz-selection{ color:#f00;background:#000; }
::selection{ color:#f00;background:#000; }
@font-face {
  font-family: sansiro;
  src: url(~@/assets/font/yingwen.ttf);
  font-style: normal;
  font-weight: normal;
}
#app {
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
  color: #2c3e50;
  margin-top: 0;
  overflow-x: hidden;
  background-color: #fffff9;
}
.shadow {
  width: 110%;
  margin-left: -5%;
  height: 6px;
  box-shadow: 0 -3px 4px #fffff7;
}
.mainArea {
  min-height: calc(100vh - 9.4rem - 6px);
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px;
  transition: 0s;
  overflow: hidden;
}
.main {
  transition: .6s;
}
.go-left {
  transform: translate3d(-60%, 0, 0);
}
.loading{
  width: 90px;
  height: 10px;
  margin: 90px auto;
  text-align: center
}
.loading i{
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 5px;
  border-radius: 50%;
  background: lightgreen;
  animation: load 1.2s ease infinite;
}
.loading i:last-child{
  margin-right: 0px; 
}
@keyframes load{
  0% {
    background-color: #f00;
    transform: translate3d(0, 0, 0);
  }
  16% {
    background-color: #ff00f6;
    transform: translate3d(0, -10px, 0);
  }
  33% {
    background-color: #2500ff;
    transform: translate3d(0, -15px, 0);
  }
  50% {
    background-color: #00b8ff;
    transform: translate3d(0, -18px, 0);
  }
  66% {
    background-color: #00ff15;
    transform: translate3d(0, -15px, 0);
  }
  83% {
    background-color: #ecff00;
    transform: translate3d(0, -10px, 0);
  }
  100% {
    background-color: #ff5200;
    transform: translate3d(0, 0, 0);
  }
}
.loading i:nth-child(2){
  animation-delay: 0.2s;
}
.loading i:nth-child(3){
  animation-delay: 0.4s;
}
.loading i:nth-child(4){
  animation-delay: 0.6s;
}
</style>
