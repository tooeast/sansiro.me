<template>
  <div class="scrolltop" @click="scrollToTop"></div>
</template>

<script>
export default {
  name: 'scrollToTop',
  methods: {
    scrollToTop () {
      var res = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        speed = res / 30,
        nowSc = res,
        timer = null;

      timer = setInterval(() => {
        nowSc -= speed;
        if(nowSc <= 0) {
          nowSc = 0;
          clearInterval(timer);
        }
        document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = nowSc
      }, 6)
    }
  }
}
</script>

<style lang="scss" scoped>
.scrolltop {
  position: relative;
  width: 36px;
  height: 36px;
  background-color: #757575;
  border-radius: 50%;
  box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 3px 3px 0 rgba(0,0,0,.24);
  cursor: pointer;

  &:before, &:after {
    position: absolute;
    left: 50%;
    top: 50%;
    display: block;
    content: '';
    width: 8px;
    height: 2px;
    border-radius: 1px;
    background-color: #fff;
    transform-origin: center center;
  }

  &:before {
    transform: translate(calc(-50% - 2px), -50%) rotate(-50deg);
  }

  &:after {
    transform: translate(calc(-50% + 2px), -50%) rotate(50deg);
  }
}
</style>
