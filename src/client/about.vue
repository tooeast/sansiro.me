<template>
  <section class="article-area">
    <div class="article">
      <Header :title="title"></Header>
      <loading v-if="!showInfo"></loading>

      <div class="main-area">
        <transition name="fade">
          <div class="content markdown-body article-body" v-html="complieMarkeDown" v-show="showInfo"></div>
        </transition>
      </div>
    </div>
    <div class="other"></div>
  </section>
</template>

<script>
import Header from '@/components/Header'
import Loading from '@/components/Loading'
import {calcTime, htmlDecode, posTop, setLazyLoadImg} from '@/utils/public'
import hljs from '@/utils/highlight'
import marked from '@/utils/marked'

export default {
  name: 'about',
  components: {
    Header, Loading
  },
  data () {
    return {
      title: 'About',
      content: '',
      showInfo: false,
    }
  },
  mounted () {
    posTop();
    setLazyLoadImg();

    this.getMyOwnInfo();
    this.setMarkDown();
  },
  computed: {
    complieMarkeDown () {
      return marked(htmlDecode(this.content), {
        sanitize: true
      })
    }
  },
  methods: {
    getMyOwnInfo (name) {
      this.$http.get(`/api/about`)
        .then(data => {
          if(data.data.code == 0) {
            this.title = data.data.data.title;
            this.content = data.data.data.content;

            Object.assign(this, data.data.data);

            this.showInfo = true;
          } else {
            // this.$router.push('/error')
          }
        })
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
  .article-area {
    padding: 0;

    .article {
      .my-info {
        padding: 0 20px;
      }
    }

    .content {
      padding: 20px;
    }
  }
}
@media screen and (min-width: 481px) {
  .article-area {
    padding-top: 170px;

    .article {
      margin: 0 8px;

      .my-info {
        padding: 0 30px;
      }
    }

    .content {
      padding: 30px;
    }
  }
}

.article-area {
  max-width: 100%;
  width: 900px;
  margin: 0 auto;

  .article {
    min-height: 600px;
    background-color: #fff;
    @extend %box;

    .fade-enter-active, .fade-leave-active{
      transition: opacity 1s;
    }
    .fade-enter, .fade-leave-to {           
      opacity: 0;
    }

    .my-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 80px;

      img {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.16)
      }

      p {
        font-weight: 450;
        font-size: 16px;
        text-shadow: 1px 1px 8px #bababa;
      }
    }
  }

  .content {
    // min-height: 318px;
    text-align: justify;
    // padding: 30px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .other {
    height: 100px;
  }
}
</style>
