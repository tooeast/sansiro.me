<template>
  <div class="write">
    <div class="head-area">
      <img :src="avatarUrl" alt="">
    </div>
    <div class="info-area">
      <div class="name">
        <input class="name" type="text" v-model="name" placeholder="name" @blur="getAvatarByName" @focus="saveOldName">
        <input class="email" type="text" v-model="email" placeholder="email">
      </div>
      <div class="text">
        <textarea :class="{ 'isclick' : isclick}" v-model="content" name="content" id="" cols="30" rows="10" placeholder="...Support Markdown" @focus="onFocusTextarea"></textarea>
      </div>
      <div class="btn">
        <button :class="[canCommit ? 'can-click' : 'not-click']" @click="commitMsgToServer">commit</button>
        <i v-show="isLoading" class="commit-loading icon-Loading"></i>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import { trim, htmlEncode } from '@/utils/public'

const CATCHKEY = 'MC2xhj18c1jGSA';

export default {
  name: 'writeMessage',
  data () {
    return {
      isclick: false,
      name: '',
      email: '',
      content: '',
      isLoading: false,
      avatarUrl: '',
      oldName: ''
    }
  },
  computed: {
    canCommit () {
      return this.content.length > 0 ? true : false;
    }
  },
  mounted () {
    let obj = this.getCatch() || {};

    if(Object.keys(obj).length > 0) {
      this.name = obj.name;
      this.email = obj.email;
      this.avatarUrl = obj.avatar;
    } else {
      this.getAvatarByName();
    }
  },
  methods: {
    addReplayName (name) {
      console.log("from write: ", name);
      this.content = `> @${name}\n\n` + this.content;
    },
    saveSuccess (params) {
      this.$emit('success', params);
    },
    onFocusTextarea () {
      this.isclick = true;
    },
    commitMsgToServer() {
      if(this.isLoading) {
        return;
      }

      this.name = trim(this.name);
      this.email = trim(this.email);
      this.content = trim(this.content);

      if(!this.name) {
        
        this.$toast({
          msg: '请填写您的昵称',
          type: 'warnning'
        });

        return;
      } else if(!this.content) {
        
        this.$toast({
          msg: '请输入留言内容',
          type: 'warnning'
        });

        return;
      }

      this.isLoading = true;

      this.$http.post('/api/message/save_message', qs.stringify({
        msgcontent: htmlEncode(this.content),
        msgemail: htmlEncode(this.email),
        msgname: htmlEncode(this.name),
        msgavatar: this.avatarUrl
      }))
        .then(data => {
          if(data.data.code == 0) {

            this.saveSuccess({
              name: this.name,
              content: this.content,
              time: this.getNowTimeString(),
              avatar: this.avatarUrl
            });

            this.content = '';
            this.isLoading = false;

            this.setCatch({ name: this.name, email: this.email, avatar: this.avatarUrl});

            this.$side({
              type: 'success',
              msg: '留言成功！',
              duration: 3000
            })
          }
        })
        .catch(data => {
          this.isLoading = false;
          
          this.$side({
            msg: '留言失败！',
            type: 'error',
            duration: 3000
          });
        })
    },
    setCatch (value) {
      value = JSON.stringify(value);
      localStorage.setItem(CATCHKEY, value);  
    },
    getCatch () {
      return JSON.parse(localStorage.getItem(CATCHKEY));
    },
    getNowTimeString () {
      let dataTime = new Date();

      let month = dataTime.toLocaleDateString();

      month = month.replace(/\//g, '-');

      let hour = ` ${dataTime.getHours()}:${dataTime.getMinutes()}:${dataTime.getSeconds()}`;

      return month + hour;
    },
    saveOldName () {
      this.oldName = this.name;
    },
    getAvatarByName () {
      if(this.oldName.length > 0) {
        if(this.name == this.oldName) {
          return;
        }
      }

      this.$http.get(`https://sansiro.me/nodeapi/about/${this.name}`)
        .then(data => {
          console.log(data);
          this.avatarUrl = data.data;
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  .write {
    position: relative;
    flex-direction: column;

    .head-area {
      position: absolute;
      top: 6px;
      width: 50px;
      height: 50px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .info-area {
      width: 100%;

      .name {
        padding-left: 60px;
        flex-direction: column;

        input {
          width: 100%;
        }

        .email {
          margin-top: 10px;
        }
      }
    }
  }
}

@media screen and (min-width: 481px) {
  .write {
    flex-direction: row;

    .info-area {
      flex-grow: 1;
    }
  }
}

@media screen and (min-width: 481px) and (max-width: 800px) {
  .head-area {
    width: 55px;
    margin-right: 15px;

    img {
      width: 55px;
      height: 55px;
    }
  }
  .name {
    flex-direction: row;

    input {
      width: 50%;
    }

    .email {
      margin-left: 20px;
    }
  }
}

@media screen and (min-width: 801px) {
  .head-area {
    width: 60px;
    margin-right: 15px;

    img {
      width: 60px;
      height: 60px;
    }
  }
  .name {
    flex-direction: row;

    input {
      width: 30%;
    }

    .email {
      margin-left: 20px;
    }
  }
}

.write {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .head-area {
    img {
      display: block;
      border-radius: 3px;
      box-shadow: 1px 1px 3px 1px #e3e3e3;
    }
  }

  .info-area {
    position: relative;
    flex-direction: column;

    .name {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      input {
        padding: 4px 6px;
        outline: none;
        font-size: 15px;
        border: none;
        color: #858585;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        transition: .4s;
        box-sizing: border-box;

        &::placeholder {
          font-style: italic;
        }

        &:focus {
          color: #303030;
          padding-left: 10px;
          border-bottom-color: #16c7c7;
        }
      }
    }

    .text {
      margin-top: 10px; 

      textarea {
        display: block;
        width: 100%;
        padding: 4px 6px;
        font-size: 15px;
        resize: none;
        height: 60px;
        outline: none;
        border-radius: 3px;
        line-height: 1.3;
        border: 1px solid rgba(0, 0, 0, .2);
        box-sizing: border-box;
        transition: .2s;

        &::placeholder {
          font-style: italic;
        }

        &:focus {
          border-color: #16c7c7;
          box-shadow: 1px 1px 10px 1px #a8ffff;
        }

        &.isclick {
          height: 100px;
        }
      }
    }

    .btn {
      display: flex;
      margin-top: 15px;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      button {
        width: 55px;
        height: 25px;
        border-radius: 3px;
        outline: none;
        line-height: 20px;
        border: 1px solid rgba(0, 0, 0, .2);
        background: #fff;
        color: #858585;
        font-size: 13px;
        transition: .2s;

        &:hover {
          opacity: .7;
        }

        &.can-click {
          background-color: #19dede;
          border-color: #19dede;
          color: #fff;
          font-weight: 450;
          box-shadow: 1px 1px 6px 1px #b4cece;
          cursor: pointer;
        }

        &.not-click {
          background: #fff;
          color: #858585;
          cursor: not-allowed;
          box-shadow: 1px 1px 6px 1px #e3e3e3;
        }
      }

      .commit-loading {
        display: block;
        width: 25px;
        height: 25px;
        margin-left: 10px;
        font-size: 22px;
        text-align: center;
        line-height: 25px;
        animation: zhuan 1.3s linear infinite;
        color: #858585;
        font-weight: 500;

        @keyframes zhuan {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }
  }
}
</style>
