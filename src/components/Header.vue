<template>
  <div class="header" :style="'background-image:url(' + (img ? img : defaultImg) + ')'">
    <h3 class="title" v-text="title"></h3>
  </div>
</template>

<script>
export default {
  name: 'areaTop',
  data () {
    return {
      defaultImg: '//59.110.213.152/cdn/images/efc66fa6f7a2a3e63c9e7a2c01e6ef12-img2.png'
    }
  },
  props: {
    // 'title', 'img'
    title: {
      type: String
    },
    img: {
      type: String,
      default: this.defaultImg
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  width: 100%;
  height: 280px;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 25px;
  box-sizing: border-box;
  // @include bgimg('~@/assets/images/img2.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  .title {
    // font-size: 34px;
    line-height: 40px;
    font-weight: 400;
    margin: 0;
    text-shadow: 1px 1px 8px #444;
    color: #fff;
    text-align: left;
  }
}

@media screen and (min-width: 801px) {
  .header {
    .title {
      font-size: 34px;
    }
  }
}
@media screen and (max-width: 800px) {
  .header {
    .title {
      font-size: 23px;
    }
  }
}
</style>
