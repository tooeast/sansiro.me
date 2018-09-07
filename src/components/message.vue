<template>
  <div class="message clearfix">
    <div class="show-area">
      <div class="line"></div>
      <div v-if="bbs.length < 1">
        <p class="none-msg">暂无留言，来做第一个留言的人吧～</p>
        <div class="line"></div>
      </div>
      <ul v-else >
        <li class="each-one" v-for="todo in bbs">
          <div class="clearfix">
            <div class="text-top">
              <img class="bbs-pho" src="~@/assets/223.png">
              <p class="bbs-info"><span class="bbs-name" v-text="todo.name"></span> 说道：</p>
              <span class="bbs-time" v-text="todo.time"></span> 
            </div>
            <div class="text-bottom">
              <div class="bbs-content" v-text="todo.content"></div>
            </div>
          </div>
          <div class="line"></div>
        </li>
      </ul>
      <div class="loadmore">
        <div @click="loadMoreMsg" v-if="!isloadingmore">
          <p v-if="!nomore">点击加载更多</p>
          <p v-else>没有更多了.......</p>
          <div v-show="!nomore" class="load-btn"></div>
        </div>
        <div v-else class="load-img"></div>
      </div>
    </div>
    <div class="input-box clearfix">
      <p class="bbs-title">添加新评论</p>
      <div class="name font">
        <label for="name">称呼</label>
        <input class="input" type="text" v-model="name">
      </div>
      <div class="email font">
        <label for="email">邮件地址<span class="light">（可选＊你的邮件地址不会被公开）</span></label>
        <input class="input" type="text" v-model="email">
      </div>
      <div class="content font">
        <label for="content">评论</label>
        <textarea class="textarea" v-model="content" cols="30" rows="10"></textarea>
      </div>
      <div class="btn-area">
        <button class="btn" :class="{'disable': isLoadingMsg}" @click="saveMessage">发表评论</button>
        <em class="laoding" v-show="isLoadingMsg"></em>
      </div>
    </div>
    <div v-show="showdialog" class="mask">
      <div class="dia-content" :class="dialogClass">
        <i class="icon"></i>
        <p v-text="dialogmessage"></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';

export default {
  name: 'message',
  props: ['typeid'],
  data () {
    return {
      bbs: [],
      name: '',
      email: '',
      content: '',
      isLoadingMsg: false,
      showdialog: false,
      dialogstate: true,
      dialogmessage: '',
      nomore: false,
      loadNum: 0,
      isloadingmore: false
    }
  },
  mounted () {
    this.getMessage();
    // this.showDialog('warning', '给予一次警告成功');
  },
  computed: {
    dialogClass () {
      return {
        success: this.dialogstate == 'success',
        error: this.dialogstate == 'error',
        warning: this.dialogstate == 'warning'
      }
    }
  },
  methods: {
    loadMoreMsg () {

      if (this.nomore) {
        console.log("meiyoule");
        return;
      }

      this.isloadingmore = true;

      var _this = this;
      axios.get('/topic.php?name=message&op=loadmore', {
        params: {
          num: _this.loadNum,
          id: _this.typeid
        }
      }).then(function (data) {

          if(data.data.code == 0) {
            data.data.data.forEach(ele => {
              _this.bbs.push(ele);
            })

            _this.loadNum++;
          } else if (data.data.code == 1) {

            data.data.data.forEach(ele => {
              _this.bbs.push(ele);
            })

            _this.nomore = true;
          }

          _this.isloadingmore = false;
        })
    },
    showDialog(state, msg) {
      this.showdialog = true;
      this.dialogstate = state;
      this.dialogmessage = msg;

      var _this = this;

      setTimeout(function() {
        _this.showdialog = false;
        _this.dialogstate = '';
        _this.dialogmessage = '';
      }, 1300);
    },
    trim(str) {
      return str.replace(/(^\s+)|(\s+$)/g, '');
    },
    getMessage() {
      var _this = this;

      axios.get('/topic.php?name=message&op=get_message', {
        params: {
          id: _this.typeid
        }
      }).then(function(data) {
        
        _this.bbs = data.data;
      });

      // this.bbs = [
      //   {
      //     content:"hello",
      //     name:"test",
      //     time:"2018-04-17 15:12:47"
      //   },
      //   {
      //     content:"hello",
      //     name:"test",
      //     time:"2018-04-17 15:12:47"
      //   }
      // ]
    },
    saveMessage() {
      if(this.isLoadingMsg) {
        return;
      }

      this.name = this.trim(this.name);
      this.email = this.trim(this.email);
      this.content = this.trim(this.content);

      if(!this.name) {
        this.showDialog('warning', '请填写您的昵称');
        return;
      } else if(!this.content) {
        this.showDialog('warning', '请输入留言内容');
        return;
      }

      var _this = this;
      this.isLoadingMsg = true;

      axios.post('/topic.php?name=message&op=save_message', qs.stringify({
        msgcontent: _this.content,
        msgemail: _this.email,
        msgname: _this.name,
        msgfrom: _this.typeid
      })).then(function(data) {
        if(data.data.code == 0) {
          _this.unshiftMsg(_this.name, _this.content);
          _this.content = _this.email = _this.name = '';
          _this.isLoadingMsg = false;
          _this.showDialog('success', '留言成功')
        }
      }).catch(function(data) {
        _this.isLoadingMsg = false;
        _this.showDialog('error', '不好意思，失败了')
      })
    },
    unshiftMsg (name, content) {
      var date = new Date();

      var res = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      this.bbs.unshift({
        name: name,
        content: content,
        time: res
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bbs-title {
  font-size: 17px;
  margin-top: 10px;
}
.font {
  font-size: 15px;
  font-weight: 500;
  color: #696767;
}
.font label {
  display: block;
  margin-top: 10px;
}
.light {
  font-weight: normal;
  font-size: 13px;
}
.input, .textarea {
  width: 100%;
  margin-top: 3px;
  padding: 8px 10px;
  border: 1px solid #b1adad;
  border-radius: 6px;
  transition: .3s;
}
.input:focus, .textarea:focus, .btn:hover {
  border-color: #458eff;
  box-shadow: 0 0 3px 1px #8cb9ff;
}
.textarea {
  height: 130px;
  line-height: 1.5;
  resize: vertical;
}
.btn-area {
  margin-top: 10px;
  margin-bottom: 4px;
}
.btn {
  width: 70px;
  height: 32px;
  border: 1px solid #b1adad;
  border-radius: 6px;
  background-color: #fffff7;
  transition: .3s;
  cursor: pointer;
  font-size: 13px;
}
.btn.disable {
  cursor: not-allowed;
  color: #d2d2d2;
}
.btn.disable:hover {
  border-color: #b1adad;
  box-shadow: none;
}
.laoding {
  display: inline-block;
  vertical-align: -5px;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEUAAACKioqKioqLi4uJiYmPj4+KioqKioqHh4eJiYmJiYmJiYmKioqJiYmKioqJiYmKioqKiorBiPhaAAAAEXRSTlMAwIBA8BCwMCDfoNBgUOBwkLPq8tEAAAEcSURBVDjLnZLbsoMgDEUDhLuI+f+fPdtCFcHpw1kP7QwsSbIn9MTH6OkXSkS932wS/SD45aEdN4OQxUyCE5FyCXUtFCBE2wXLsraqYeguHHKMV0Vpe34FI6CSw2uMA2BaI4zHN8wBwXjnPPqpBGBzHwAoT0kyfTjODq1m2Qt180Q/c4nCqNwxWcB4f4ikMB5Ufk6e1ByUxcE7QX+ollbuGYCbc2so4nch9eNMXjcC/Z8eVn60oPxjRi1gWr3D3rEyrrnQlBzXywbI3bP6xmjxKtLui8mYMTSRyLkzGk0gKNnbwiTT9loSGRFDRaQNbcayNgrbJpBqsS3ZVuqCx+8SBKPgV2jLtTxgbsGybJNQONEt0Ia/hUv4SZ6L/wEeQA63kttCVAAAAABJRU5ErkJggg==);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation: loading 1.3s linear infinite;
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.each-one {
  /* background-color: gray; */
  margin-top: 10px;
  margin-bottom: 10px;
}
.text-top {
  color: #999;
}
.bbs-pho {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.bbs-pho, .bbs-info {
  display: inline-block;
  vertical-align: middle;
  line-height: 35px;
}
.bbs-info {
  margin-left: 3px;
}
.bbs-name {
  display: inline-block;
  vertical-align: middle;
  line-height: 35px;
  font-size: 14px;
  color: #2c3e50;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bbs-time {
  float: right;
  line-height: 35px;
  font-size: 10px;
}
.text-bottom {
  margin-top: 15px;
  margin-bottom: 15px;
}
.bbs-content {
  margin: 2px 5px 5px;
  font-size: 13px;
  text-align: justify;
  word-break: break-all;
}
.line {
  width: 100%;
  height: 0;
  margin-top: 10px;
  border-bottom: 1px dashed #e6edea;
}
.none-msg {
  padding-top: 10px;
  font-size: 14px;
  color: #b3b3b3;
  text-align: center;
  line-height: 70px;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.322);
  z-index: 99999;
}
.dia-content {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 2.6rem;
  border-radius: .1rem;
  background-color: #fff;
  z-index: 100000;
}
.dia-content p {
  position: absolute;
  text-align: center;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  line-height: 1rem;
  font-size: .4rem;
}
.dia-content .icon {
  display: block;
  position: relative;
  margin: .2rem auto 0;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}
.success .icon {
  background-color: #03ff23;
}
.success .icon::before,
.success .icon::after {
  content: '';
  display: block;
  position: absolute;
  height: .07rem;
  border-radius: .03rem;
  background-color: #fff;
}
.success .icon::before {
  left: 19%;
  top: 63%;
  width: .4rem;
  transform: rotate(40deg);
}
.success .icon::after {
  left: 30%;
  top: 48%;
  width: .9rem;
  transform: rotate(-50deg);
}

.error .icon {
  background-color: #a8a8a8;
}
.error .icon::before,
.error .icon::after {
  content: '';
  display: block;
  position: absolute;
  left: calc(50% - .45rem);
  top: calc(50% - .035rem);
  width: .9rem;
  height: .07rem;
  border-radius: .03rem;
  background-color: #fff;
  transform-origin: center center;
}
.error .icon::before {
  transform: rotate(45deg);
}
.error .icon::after {
  transform: rotate(-45deg);
}

.warning .icon {
  background-color: #00a1e0;
}
.warning .icon::before,
.warning .icon::after {
  content: '';
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: .03rem;
  background-color: #fff;
}
.warning .icon::before {
  width: .1rem;
  height: .8rem;
  top: 10%;
}
.warning .icon::after {
  width: .15rem;
  height: .15rem;
  top: 75%;
  border-radius: 50%;
}
.loadmore {
  height: 30px;
  margin-top: 10px;
  cursor: pointer;
  /* overflow: hidden; */
}
.loadmore p {
  /* line-height: 30px; */
  /* margin-top: 10px; */
  color: #2c523b;
  text-align: center;
  font-size: 13px;
  line-height: 1;
}
.load-btn {
  height: 15px;
  position: relative;
}
.load-btn::before,
.load-btn::after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  width: 15px;
  height: 1px;
  background-color: #276825;
}
.load-btn::before {
  left: 50%;
  transform: translate(-2px, -50%) rotate(-40deg);
}
.load-btn::after {
  right: 50%;
  transform: translate(2px, -50%) rotate(40deg);
}
.load-img {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  background-image: url(~@/assets/loading.png);
  background-size: 30px 30px;
  animation: rotates 1.5s infinite;
}
@keyframes rotates {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
