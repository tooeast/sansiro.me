<template>
  <page-box>
    <Header :title="title"></Header>
    
    <page-padding class="content">
      <loading v-if="!showMsgList"></loading>
      
      <transition name="fade">
        <div v-show="showMsgList">
          <div class="list" v-if="msgList.length">
            <each-msg v-for="(todo, index) in msgList" v-bind:key="index" :todo="todo" v-on:replay="replayUser"></each-msg>
            
            <load-more :requestUri="'/api/message/loadmore'"  v-on:moreInfo="addToList"></load-more>
          </div>

          <div class="nolist" v-else>
            <p>做第一个留言的人吧～</p>
          </div>

          <div class="write-area">
            <write-message ref="write" v-on:success="childSuccess"></write-message>
          </div>
        </div>
      </transition>

    </page-padding>
  </page-box>
</template>

<script>
import Header from '@c/Header'
import pageBox from '@c/pageBox'
import pagePadding from '@c/pagePadding'
import WriteMessage from '@c/WriteMessage'
import EachMsg from '@c/EachMsg'
import LoadMore from '@c/LoadMore'
import Loading from '@c/Loading'

import {calcTime, htmlDecode, posTop, setLazyLoadImg} from '@u/public'

export default {
  name: 'messageBoard',
  components: {
    Header, WriteMessage, EachMsg, LoadMore, Loading, pageBox, pagePadding
  },
  data () {
    return {
      title: 'Message Board',
      name: '',
      email: '',
      content: '',
      showMsgList: false,
      msgList: []
    }
  },
  mounted () {
    posTop();
    setLazyLoadImg();

    this.getMessageBoardInfo();
  },
  methods: {
    childSuccess (params) {
      this.msgList = [params, ...this.msgList];
    },
    getMessageBoardInfo () {
      this.$http.get(`/api/message/get_message`)
        .then(data => {
          this.msgList = data.data;

          this.showMsgList = true;
        })
    },
    replayUser (name) {
      this.$refs.write.addReplayName(name);
    },
    addToList (data) {
      this.msgList = [...this.msgList, ...data];
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  min-height: 200px;
  text-align: justify;
  border-top: 1px solid rgba(0, 0, 0, 0.1);

  .fade-enter-active, .fade-leave-active{
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {           
    opacity: 0;
  }

  .write-area {
    padding-top: 20px;
    margin-top: 5px;
    border-top: 1px solid rgba(0, 0, 0, .1);
  }

  .nolist {
    line-height: 100px;
    text-align: center;
    font-size: 15px;
    color: #797979;
  }
}
</style>
