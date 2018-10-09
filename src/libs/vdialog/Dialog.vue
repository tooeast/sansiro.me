<template>
  <div class="vdialog">
    <div class="mask"></div>
    <div class="area" @click="closeDialog">
      <i class="top-icon" :class="getShowType"></i>
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vdialog',
  props: {
    msg: {
      type: String
    },
    type: {
      type: String
    },
    duration: {
      type: Number
    }
  },
  data () {
    return {

    }
  },
  computed: {
    getShowType() {
      return `icon-${this.type}`;
    },
    getDuration() {
      return this.duration;
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
      setTimeout(() => {
        this.closeDialog();
      }, this.getDuration);
    },
    closeDialog () {
      console.log("dialog close!")
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.vdialog {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 100;
  }

  .area {
    display: flex;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 160px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    z-index: 101;

    p {
      color: #fff;
      margin-top: 20px;
      font-size: 16px;
    }

    .top-icon {
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50px;
      text-align: center;
      line-height: 60px;
    }

    .icon-success {
      color: #fff;
      font-size: 41px;
      background-color: #34fa4b;
    }

    .icon-warnning {
      color: #fff;
      font-size: 44px;
      background-color: #55bbc2;
    }

    .icon-error {
      color: #fff;
      font-size: 32px;
      background-color: #e83434;
    }
  }
}
</style>
