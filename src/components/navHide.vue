<template>
  <div class="nav" :class="{'go-left': stage, black: isBlack }">
    <div class="logo"><router-link class="logo-link" :to="{path:'/home'}">SANSIRO</router-link></div>
    <div class="hide-nav" @click="toggleSideBar">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navHide',
  props: {
    stage: Boolean
  },
  data () {
    return {
      isBlack: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.listenScroll);
  },
  methods: {
    toggleSideBar () {
      this.$emit("changeStage");
    },
    listenScroll () {
      var res = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        topHeight = document.getElementById("headerTop").clientHeight;

      if(res > topHeight - 40) {
        this.isBlack = true;
      } else {
        this.isBlack = false;
      }
    }
  }
}
</script>

<style>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 45px;
  width: 100%;
  transition: .6s;
  z-index: 9999;
}
@media screen and (max-width: 700px) {
  .nav {
    display: block;
  }
}
@media screen and (min-width: 701px) {
  .nav {
    display: none;
  }
}
.hide-nav {
  position: absolute;
  right: 5%;
  top: 5px;
  height: 40px;
  width: 40px;
  cursor: pointer;
}
.hide-nav div {
  width: 33px;
  height: 4px;
  margin: 6px auto;
  border-radius: 10px;
  background-color: rgba(255,255,255,.7);
  transition: .6s;
}
.logo {
  margin-left: 5%;
  line-height: 50px;
  font-size: 27px;
  font-family: sansiro,-apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
}
.logo-link {
  color: rgba(255,255,255,.7);
  text-decoration: none;
}
.logo-link:hover {
  text-decoration: none;
}
.go-left {
  transform: translate3d(-60%, 0, 0);
}
.go-left .hide-nav div:nth-child(1) {
  transform-origin: right;
  transform: rotate(-45deg);
}
.go-left .hide-nav div:nth-child(2) {
  opacity: 0;
}
.go-left .hide-nav div:nth-child(3) {
  transform-origin: right;
  transform: rotate(45deg) translate(2.5px, 2.5px);
}
.black {
  background-color: rgba(255,255,247, 0.9);
  box-shadow: 0 2px 4px #f1f2f3;
}
.black .logo-link {
  color: rgba(1,2,3,.7);
}
.black .hide-nav div {
  background-color: rgba(1,2,3,.7);
}
</style>
