<template>
  <div class="topArea" :class="{'go-left': stage}">
    <div class="to-top" :class="{'showIt': showToTop}" @click="scrollToTop">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'toTop',
  props: {
    stage: Boolean
  },
  data() {
    return {
      showToTop: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.listenScroll);
  },
  methods: {
    listenScroll () {
      var res = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || window.scrollY,
        topHeight = document.getElementById("headerTop").clientHeight;

      if(res > topHeight * 1.5) {
        this.showToTop = true;
      } else {
        this.showToTop = false;
      }
    },
    scrollToTop () {
      var res = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        speed = res / 20,
        nowSc = res,
        timer = null;

      timer = setInterval(() => {
        nowSc -= speed;
        if(nowSc <= 0) {
          nowSc = 0;
          clearInterval(timer);
        }
        document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = nowSc
      }, 9)
    }
  }
}
</script>

<style scoped>
.topArea {
  position: fixed;
  width: 100%;
  height: auto;
  right: 0;
  bottom: 120px;
  transition: .6s;
}
.to-top {
  position: absolute;
  right: 5%;
  width: 40px;
  height: 33px;
  background-color: rgba(1,2,3,.15);
  border-radius: 5px;
  z-index: 10;
  padding-top: 2px;
  opacity: 0;
  cursor: pointer;
  transition: .6s;
  transform: translate3d(0, -100%, 0);
}
.to-top div {
  width: 20px;
  height: 3px;
  margin: 5px auto;
  border-radius: 10px;
  background-color: rgba(90, 255, 82, 0.7);
}
.to-top div:nth-child(1) {
  transform: translate(-6px, 8px) rotate(-45deg);
}
.to-top div:nth-child(2) {
  transform: translate(6px) rotate(45deg);
}
.go-left {
  transform: translate3d(-60%, 0, 0);
}
.showIt {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>
