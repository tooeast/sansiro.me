<template>
  <div class="loadmore" @click="loadMoreMsg">
    <span v-if="loadmoreState == 0">点击加载更多</span>
    <span v-else-if="loadmoreState == 1"><i class="moreloading icon-Loading"></i> 加载中...</span>
    <span v-else>没有更多了...</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadmoreState: 0,
      loadnum: 0
    }
  },
  props: {
    requestUri: {
      type: String
    }
  },
  methods: {
    loadMoreMsg () {
      if(!this.requestUri) {
        throw new Error("No URI input");
      }
      if(this.loadmoreState != 0) {
        return;
      }

      this.loadmoreState = 1;
      this.$http.get(this.requestUri + "?num=" + this.loadnum)
        .then(data => {
          this.resultInfoMsg(data.data);

          this.loadnum++;
          this.loadmoreState = 0;
        }).catch(msg => {
          this.loadmoreState = 2;
        })
    },
    resultInfoMsg (data) {
      this.$emit('moreInfo', data);
    }
  }
}
</script>

<style lang="scss" scoped>
.loadmore {
  line-height: 50px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  color: #797979;
  transition: .2s;

  &:hover {
    color: #000;
    background-color: rgba(91, 155, 120, 0.1);
  }

  .moreloading {
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
