<template>
  <div class="topNav">
    <div class="header">
      <div class="header-area">
        <div class="showNav" :class="{'fixed': isFixed, 'deepBg': isShadow, 'hide': !isShow}" ref="bigNav">
          <div class="logo">
            <router-link class="logo-link" :to="{path: '/home'}">SANSIRO</router-link>
          </div>
          <ul>
            <li><router-link class="lili" :to="{path: '/home'}">HOME</router-link></li>
            <li><router-link class="lili" :to="{path: '/list'}">LIST</router-link></li>
            <li><router-link class="lili" :to="{path: '/about'}">ABOUT</router-link></li>
            <li><router-link class="lili" :to="{path: '/msgboard'}">BBS</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerTop',
  data () {
    return {
      isFixed: false,
      isShow: true,
      isShadow: false,
      nowPos: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.listenScroll);
  },
  methods: {
    listenScroll () {
      var res = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || window.scrollY,
        topHeight = document.getElementById("headerTop").clientHeight;

      if(res > 30) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }

      if(res > topHeight - 30) {
        this.isShadow = true;
      } else {
        this.isShadow = false;
      }

      if(res > this.nowPos && this.isShadow) {
        this.isShow = false;
      } else if(res < this.nowPos) {
        this.isShow = true;
      }

      this.nowPos = res;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  width: 100%;
  height: 5rem;
  background-image: url(~@/assets/chuan.jpg);
  /* background-image: url(~@/assets/timg.jpeg); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.header-area {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .06);
  font-size: 30px;
  color: #fff;
  z-index: 1;
  overflow: hidden;
}
@media screen and (max-width: 700px) {
  .showNav {
    display: none;
  }
}
@media screen and (min-width: 701px) {
  .showNav {
    display: block;
  }
}
.showNav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 30px;
  overflow: hidden;
}
.showNav ul {
  float: right;
  margin-right: 6%;
}
.showNav ul li {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-family: sansiro,-apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
  border-radius: 5px;
  transition: .5s;
  cursor: pointer;
  transition: .3s;
}
.showNav ul li:hover {
  transform: translateY(-2px);
}
.lili {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0 13px;
  color: rgba(255,255,255,.7);
  text-decoration-style: wavy;
}
.logo {
  display: inline-block;
  font-size: 35px;
  margin-left: 6%;
  font-family: sansiro,-apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
}
.fixed {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  margin: 0;
}
.deepBg {
  background-color: rgba(255,255,247, 0.9);
  box-shadow: 0 2px 4px #f1f2f3;
  transition: .5s;
}
.deepBg .lili,
.deepBg .logo-link {
  color: rgba(1,2,3,.7);
}
.show {
  transform: translate3d(0, 0, 0);
}
.hide {
  transform: translate3d(0, -60px, 0);
}
</style>
