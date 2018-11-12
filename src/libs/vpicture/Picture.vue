<template>
  <div class="vpicture"  @click="closeDialog">
    <div class="mask"></div>
    <div class="area">
      <img :src="url" alt="">
    </div>
    <div class="close"></div>
  </div>
</template>

<script>
export default {
  name: 'vpicture',
  props: {
    url: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    setTimeout(() => {

      this.timeLine()
    })
    
  },
  methods: {
    timeLine () {
      console.log("dialog mounted!");
      console.log("Duration:", this.getDuration);
    },
    closeDialog () {
      console.log("dialog close!")
      this.$emit('vclose');
    }
  }
}
</script>

<style lang="scss" scoped>
.vpicture {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 200;
  }

  .area {
    display: flex;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    z-index: 201;

    img {
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: auto;
      // min-width: 50%;
      max-width: 100%;
      height: auto;
      max-height: 100%;
      border-radius: 3px;
      background-color: #fff;
      overflow: hidden;
    }
  }

  .close {
    position: fixed;
    right: 5%;
    top: 5%;
    width: 50px;
    height: 50px;
    z-index: 202;
    cursor: pointer;

    &::before, &::after {
      display: block;
      content: '';
      left: 50%;
      top: 50%;
      position: absolute;
      width: 36px;
      height: 3px;
      border-radius: 1.5px;
      background-color: #fff;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
@media screen and (max-width: 769px) {
  .area {
    width: 100%;
    height: 100%;
  }
}
@media screen and (min-width: 770px) {
  .area {
    width: 80%;
    height: 90%;

    img {
      border: 2px solid #eee;
      box-sizing: border-box;
    }
  }
}
</style>
