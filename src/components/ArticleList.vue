<template>
  <div class="article" @click="navigatorTo">
    <div class="title-area" :style="'background-image:url(' + (article.headpic ? article.headpic : defaultImg) + ')'">
      <h2 class="title" v-text="article.title"></h2>
    </div>
    <div class="article-content">
      <p class="content" v-text="article.abstract"></p>
    </div>
    <div class="info">
      <p>SANSIRO</p>
      <p>{{ calcArticleTime(article.time) }}</p>
    </div>
  </div>
</template>

<script>
import {calcTime, setLazyLoadImg} from '@u/public';

export default {
  name: 'articleList',
  data () {
    return {
      defaultImg: '//cdn.sansiro.me/images/1355c09d3b639fb215c7dcf5111da359-img1.png'
    }
  },
  props: [
    'article'
  ],
  mounted () {
    setLazyLoadImg();
  },
  methods: {
    calcArticleTime (time) {
      return calcTime(time);
    },
    navigatorTo () {
      window.articleInfo = {
        title: this.article.title,
        time: this.article.time,
        headpic: this.article.headpic
      }
      this.$router.push({
        name: 'article',
        params: {
          name: this.article.name
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
@import url('~@/assets/mixin/icon.css');
</style>

<style lang="scss" scoped>
.article {
  display: block;
  max-width: calc(100% - 16px);
  width: 884px;
  margin: 48px auto 0;
  background-color: #fff;
  text-decoration: none;
  color: inherit;
  @extend %box;
  overflow: hidden;
  cursor: pointer;

  .title-area {
    position: relative;
    display: flex;
    width: 100%;
    height: 100px;
    padding-left: 20px;
    padding-bottom: 14px;
    background-color: rgb(208, 208, 208);
    box-sizing: border-box;
    align-items: flex-end;
    justify-content: flex-start;
    overflow: hidden;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    .title {
      position: relative;
      color: #fff;
      font-weight: 450;
      text-shadow: 1px 1px 8px #444;
      z-index: 4;
      @extend %text-overflow;
    }
  }

  .article-content {
    padding: 18px;
    text-align: justify;
    line-height: 1.5;
  }

  .info {
    display: flex;
    padding: 18px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    justify-content: space-between;

    p {
      font-size: 16px;
      font-weight: 450;
    }
  }
}
</style>
