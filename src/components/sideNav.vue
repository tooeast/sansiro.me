<template>
  <div class="sideBar" :class="{show: stage}">
    <div class="headpho">
      <img class="img" src="/images/defaulthead.jpg"></img>
    </div>
    <div class="navList">
      <ul ref="oUl" @click="hideNav">
        <li><router-link class="lili" :to="{path:'/home'}">HOME</router-link></li>
        <li><router-link class="lili" :to="{path:'/list'}">LIST</router-link></li>
        <li><router-link class="lili" :to="{path:'/about'}">ABOUT</router-link></li>
        <li><router-link class="lili" :to="{path:'/msgboard'}">BBS</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sideNav',
  props: {
    stage: Boolean
  },
  methods: {
    hideNav () {
      var _this = this;
      setTimeout(() => {
        _this.$emit("hideSideNav");
      }, 300);
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 700px) {
  .sideBar {
    display: block;
  }
}
@media screen and (min-width: 701px) {
  .sideBar {
    display: none;
  }
}
.sideBar {
  position: fixed;
  top: 0;
  left: 100%;
  width: 60%;
  height: 100vh;
  background-color: #f1f6ed;
  transform: scale(.8);
  transition: .6s;
}
.headpho {
  position: relative;
  height: 25%;
  width: 100%;
  background-color: #fdffdf;
}
.img {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 30%);
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 6px solid #fdffdf;
}
.navList {
  margin: 35px auto 0;
  text-align: center;
}
.navList ul {
  overflow: hidden;
  font-size: 15px;
}
.navList ul li {
  list-style-type: none;
  margin: 6px 0;
}
.navList ul li:hover {
  background-color: rgba(198, 212, 187, .2);
}
.lili {
  width: 100%;
  height: 36px;
  display: block;
  color: rgba(1,2,3,.7);
  line-height: 36px;
  cursor: pointer;
  transition: .5s;
  -webkit-tap-highlight-color: rgba(198, 212, 187, .2); 
}
.show {
  transform: translate3d(-100%, 0, 0) scale(1);
}
</style>
