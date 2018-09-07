<template>
  <div class="list">
    <div class="list-title">
      <p class="list-main">人生就是一条时间的轴线。回首过去，留在我们记忆深处的，是那一个个特殊的节点！</p>
      <p class="list-from">———我自己</p>
    </div>
    <ul class="list-area" v-show="!isLoading">
      <li class="each-one" v-for="todo in msgList">
        <p v-show="todo.show">
          <span class="year" v-text="isShowYear(todo.time)"></span>
        </p>
        <p>
          <span class="time" v-text="calcTime(todo.time)"></span>
          <router-link class="title" :to="{path:'/article/' + todo.name}" v-text="todo.title"></router-link>
        </p>
      </li>
    </ul>
    <div v-show="isLoading" class="loading">
      <i></i><i></i><i></i><i></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'list',
  data () {
    return {
      msgList: [],
      oldYear: 0,
      isLoading: false
    }
  },
  mounted () {
    this.getArticleList();
  },
  methods: {
    getArticleList () {
      var _this = this;

      this.isLoading = true;
      axios.get('/topic.php?name=article&op=get_list')
        .then(function(data) {
          _this.msgList = data.data;
          _this.isLoading = false;
        })
    },
    calcTime (time) {
      var str = String(time).replace(/-/g,"/");

      var newSS = new Date(str);

      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Seq', 'Oct', 'Nov', 'Dec'];

      var res = month[newSS.getMonth()] + "." + (newSS.getDate().length < 2 ? newSS.getDate() + ' ' : newSS.getDate()) + "\t" + this.getMoon(newSS.getHours()) + ":" + ('0' + newSS.getMinutes()).slice(-2);

      return res;
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
    },
    isShowYear (time) {
      var str = String(time).replace(/-/g,"/");

      var newSS = new Date(str);

      var newNum = newSS.getFullYear();
      return newNum;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-area {
  position: relative;
  margin: 10px 4% 10px 14%;
  padding: 10px 0 25px;
  border-left: 2px dotted #acacac;
}
.list-area::before,
.list-area::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: -1px;
  width: 10px;
  height: 2px;
  border-radius: 1px;
  background-color: #acacac;
}
.list-area::before {
  transform-origin: right top;
  transform: translateX(-100%) rotate(-60deg);
}
.list-area::after {
  transform-origin: left top;
  transform: rotate(60deg);
}
.each-one {
  position: relative;
  line-height: 40px;
  font-size: 14px;
  color: #5e5e5e;
}
.each-one p {
  /* display: inline-block; */
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.each-one:hover {
  background-color: #eeeeee;
}
.each-one::before {
  content: '';
  display: inline-block;
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #acacac;
}
.each-one:hover::before {
  background-color: #3999f3;
}
.time {
  display: inline-block;
  width: 98px;
  font-style: italic;
  font-size: 12px;
  color: #9e9e9e;
}
.title {
  display: inline;
  margin-left: 4%;
  color: #5e5e5e;
  text-decoration: none;
}
.title:hover {
  color: #3999f3;
}
.year {
  position: absolute;
  left: -50px;
  top: 22px;
  font-size: 13px;
  color: #9c9c9c;
  font-style: italic;
}
.list-title {
  color: #acacac;
  font-style: italic;
  margin: 10px 0;
  line-height: 1.3;
}
.list-main {
  font-size: 14px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.list-from {
  font-size: 13px;
  text-align: right;
}
</style>
