<template>
  <div class="each-msg">
    <div class="left">
      <img :src="todo.avatar" alt="">
    </div>
    <div class="right">
      <p class="info"><a href="javascript:;" @click="replayMsg(todo.name)" class="weight" title="回复TA">{{ todo.name }}</a>&nbsp;&nbsp;发表于&nbsp;&nbsp;{{ transTime(todo.time) }}</p>
      <div class="content markdown-body" v-html="complieMarkeDown"></div>
    </div>
  </div>
</template>

<script>
import {calcTime, htmlDecode} from '@/utils/public'
import hljs from '@/utils/highlight'
import marked from '@/utils/marked'

export default {
  name: 'eachMessage',
  props: [
    'todo'
  ],
  computed: {
    complieMarkeDown () {
      return marked(htmlDecode(this.todo.content), {
        sanitize: true
      })
    }
  },
  mounted () {
    this.setMarkDown();
  },
  methods: {
    transTime (time) {
      return calcTime(time, 'small');
    },
    replayMsg (name) {
      this.$emit('replay', name);
    },
    setMarkDown () {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: function(code) {
          return hljs.highlightAuto(code).value
        }
      });
    }
  }
}
</script>

<style lang="css" scoped>
@import url('~@/assets/mixin/markdown.css');
</style>

<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  .each-msg {
    padding: 19px 0 12px;
  }
  .left {
    position: absolute;
    width: 40px;
    transform: translateY(-10px);

    img {
      width: 40px;
      height: 40px;
    }
  }

  .right {
    .info {
      padding-left: 50px;
      line-height: 20px;

      .weight {
        max-width: 105px;
      }
    }
    .content {
      margin-top: 15px;
    }
  }
}

@media screen and (min-width: 481px) {
  .each-msg {
    padding: 18px 0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;

    .right {
      .content {
        margin-top: 10px;
      }
    }
  }
}

@media screen and (min-width: 481px) and (max-width: 800px) {
  .left {
    width: 46px;
    margin-right: 10px;

    img {
      width: 46px;
      height: 46px;
    }
  }
  .weight {
    max-width: 155px;
  }
}

@media screen and (min-width: 801px) {
  .left {
    width: 50px;
    margin-right: 15px;

    img {
      width: 50px;
      height: 50px;
    }
  }

  .weight {
    max-width: 200px;
  }
}

.each-msg {  
  .left {

    img {
      display: block;
      box-shadow: 1px 1px 6px 1px #e3e3e3;
      border-radius: 2px;
    }
  }

  .right {
    flex-grow: 1;
    color: #6a6a6a;

    .info {
      font-size: 13px;

      a.weight {
        text-decoration: none;
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: #6190e8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
    }

    .content {
      line-height: 1.4;
      font-size: 15px;
      padding: 6px;
      background-color: rgba(128, 0, 128, 0.047);
      word-break: break-all;
    }
  }
}
</style>
