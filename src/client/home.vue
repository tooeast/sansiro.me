<template>
  <div class="article">
    <div v-show="isLoading" class="loading">
      <i></i><i></i><i></i><i></i>
    </div>
    <section class="eachone" v-show="!isLoading">
      <ul>
        <li v-for="todo in articleList">
          <router-link class="title" :to="{path:'/article/' + todo.name}" v-text="todo.title"></router-link>
          <p class="time" v-text="calcTime(todo.time)"></p>
          <article>
            <p v-text="todo.abstract"></p>
          </article>
          <router-link class="more" :to="{path:'/article/' + todo.name}">more...</router-link>
        </li>
      </ul>
      <div class="loadmore">
        <div @click="loadMoreArticle" v-if="!isloadingmore">
          <p v-if="!nomore">点击加载更多</p>
          <p v-else>没有更多了.......</p>
          <div v-show="!nomore" class="load-btn"></div>
        </div>
        <div v-else class="load-img"></div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data () {
    return {
      articleList: [],
      isLoading: true,
      isloadingmore: false,
      nomore: false,
      requestNum: 0
    }
  },
  mounted () {
    this.getHomeArticleList();
  },
  methods: {
    calcTime (time) {
      var str = String(time).replace(/-/g,"/");

      var newSS = new Date(str);

      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Seq', 'Oct', 'Nov', 'Dec'];

      var res = month[newSS.getMonth()] + "." + newSS.getDate() + " " + newSS.getFullYear() + "\t" + this.getMoon(newSS.getHours()) + ":" + ('0' + newSS.getMinutes()).slice(-2);

      return res;
    },
    getHomeArticleList () {
      var _this = this;

      this.isLoading = true;

      axios.get('/topic.php?name=home')
        .then(function(data) {
          
          _this.articleList = data.data;

          _this.isLoading = false;
        })
    },
    loadMoreArticle () {

      if (this.nomore) {
        console.log("meiyoule");
        return;
      }

      this.isloadingmore = true;

      var _this = this;
      axios.get('/topic.php?name=home&op=loadmore', {
        params: {
          num: _this.requestNum
        }
      }).then(function (data) {

          if(data.data.code == 0) {
            data.data.data.forEach(ele => {
              _this.articleList.push(ele);
            })

            _this.requestNum++;
          } else if(data.data.code == 1) {

            data.data.data.forEach(ele => {
              _this.articleList.push(ele);
            })

            _this.nomore = true;
          }

          _this.isloadingmore = false;
        })


      // setTimeout( () => {
      //   this.isloadingmore = false;
      //   moress.forEach(element => {
      //     this.articleList.push(element);
      //   });
      // }, 18000);
    },
    getMoon (hour) {
      var res;
      if(hour >= 0 && hour < 6) {
        res = "凌晨";
      } else if(hour < 9) {
        res = "早晨";
      } else if(hour < 11) {
        res = "上午";
      } else if(hour < 14) {
        res = "中午";
      } else if(hour < 19) {
        res = "下午";
      } else {
        res = "晚上";
      }

      res += Number(hour) > 13 ? (hour - 12) : hour;

      return res;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article {
  box-sizing: border-box;
}
.eachone li {
  font-family: -apple-system,PingFang SC,Hiragino Sans GB,Arial,Microsoft YaHei,Helvetica Neue,sans-serif;
  text-align: left;
  list-style-type: none;
  position: relative;
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: .5px solid #e1e2e3;
}
.title, .time, .more {
  font-weight: bold;
}
.title {
  font-size: 26px;
  line-height: 2;
  text-decoration: none;
  cursor: pointer;
  color: #2c3e50;
}
.title:hover, .more:hover {
  text-decoration: underline;
}
.time {
  font-size: 12px;
  line-height: 2;
  margin-bottom: 13px;
}
.eachone article {
  font-size: 18px;
  line-height: 1.5;
  text-align: justify;
  text-indent: 1em;
}
.more {
  font-size: 15px;
  color: green;
  text-decoration: none;
  line-height: 3;
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
