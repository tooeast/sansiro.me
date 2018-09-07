<template>
  <div class="article-page">
    <div class="article" v-show="!isLoading">
      <p class="title" v-text="title"></p>
      <p class="time" v-text="time"></p>
      <div class="content markdown-body" v-html="compiledMarkdown"></div>
    </div>
    <div v-show="isLoading" class="loading">
      <i></i><i></i><i></i><i></i>
    </div>
    
    <div class="bottom-info">

    </div>

    <div class="bbs-area">
      <msg-area :typeid="this.$route.params.name"></msg-area>
    </div>
  </div>
</template>

<script>
import msgArea from '@/components/message';
import axios from 'axios';
import marked from 'marked';
import hljs from '../../static/app/js/highlight.min.js';

export default {
  name: 'article',
  components: {
    msgArea: msgArea
  },
  data () {
    return {
      id: '',
      title: '',
      time: '',
      content: '',
      isLoading: true,
      input: '',
    }
  },
  mounted () {
    document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop = 0;

    this.getArticleInfo(this.$route.params.name);

    this.setMarkDown();
  },
  computed: {
    compiledMarkdown () {
      return marked(this.content, {
        sanitize: true
      })
    }
  },
  methods: {
    getMoon (hour) {
      var res;
      if(hour >= 0 && hour < 6) {
        res = "凌晨";
      } else if(hour < 9) {
        res = "早晨";
      } else if(hour < 11) {
        res = "上午";
      } else if(hour < 15) {
        res = "中午";
      } else if(hour < 19) {
        res = "下午";
      } else {
        res = "晚上";
      }

      res += Number(hour) > 13 ? (hour - 12) : hour;

      return res;
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
    },
    getArticleInfo (articlename) {
      var _this = this;
      this.isLoading = true;

      axios.get('/topic.php?name=article', {
        params: {
          index: articlename
        }
      }).then(function(data) {

        var res = data.data;

        if(res.code == 0) {
          _this.title = res.data.title;
          _this.time = _this.calcTime(res.data.time);
          _this.content = _this.htmlDecodeByRegExp(res.data.content);
        } else {
          _this.$router.push('/404')
        }

        _this.isLoading = false;
      });
    },
    calcTime (time) {
      var str = String(time).replace(/-/g,"/");
      console.log(str);

      var newSS = new Date(str);

      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Seq', 'Oct', 'Nov', 'Dec'];

      var res = month[newSS.getMonth()] + "." + newSS.getDate() + " " + newSS.getFullYear() + "\t" + this.getMoon(newSS.getHours()) + ":" + ('0' + newSS.getMinutes()).slice(-2);

      return res;
    },
    htmlDecodeByRegExp (str){  
      var s = "";
      if(str.length == 0) return "";
      s = str.replace(/&amp;/g,"&");
      s = s.replace(/&lt;/g,"<");
      s = s.replace(/&gt;/g,">");
      s = s.replace(/&nbsp;/g," ");
      s = s.replace(/&#39;/g,"\'");
      s = s.replace(/&quot;/g,"\"");
      return s;  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>

@import url("../../static/app/css/article.css");

.article {
  margin-top: 20px;
  font-size: 17px;
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
}
.title {
  margin: 11px 0;
  font-size: 26px;
  line-height: 1;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}
.time {
  font-size: 12px;
  line-height: 2;
  margin-bottom: 13px;
  font-weight: bold;
}
.bbs-area {
  /* width: 92%; */
  margin: 20px auto 0;
}
.content {
  line-height: 1.5;
  text-align: justify
}
.bottom-info {
  height: 100px;
}
</style>
