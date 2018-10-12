<template>
  <aside class="side" :class="[hideSide ? 'hide' : 'show']">
    <div class="mask" @click="hideSideMenu"></div>
    <div class="side-area">
      <div class="header">
        <img src="https://sansiro.me/images/default-head.jpg" alt="">
        <p>sansiro.me@outlook.com</p>
      </div>
      <div class="main">
        <ul @click="clickAfter">
          <li>
            <router-link class="link icon-home" :to="{ path: '/' }">Home</router-link>
          </li>
          <li>
            <router-link class="link icon-user" :to="{ path: '/about' }">About</router-link>
          </li>
          <li>
            <router-link class="link icon-message_board" :to="{ path: '/msgbd' }">Message Board</router-link>
          </li>
          <li>
            <a class="link icon-github" href="https://github.com/sansiro-me">Github</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="btn" @click="showSideMenu">
      <i></i><i></i><i></i>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'sideMenu',
  data () {
    return {
      hideSide: true
    }
  },
  methods: {
    hideSideMenu () {
      this.hideSide = true;
    },
    showSideMenu () {
      this.hideSide = !this.hideSide;
    },
    clickAfter () {
      setTimeout(() => {
        this.hideSide = true;
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 801px) {
  .side {
    &.show {
      .btn {
        right: calc(8% + 280px);
      }
    }

    &.hide {
      .side-area {
        transform: translate3d(280px, 0, 0);
      }
    }

    .side-area {
      width: 280px;
    }
  }
}
@media screen and (max-width: 800px) {
  .side {
    &.show {
      .btn {
        right: calc(8% + 240px);
      }
    }

    &.hide {
      .side-area {
        transform: translate3d(240px, 0, 0);
      }
    }

    .side-area {
      width: 240px;
    }
  }
}

@media screen and (max-height: 360px) {
  .header {
    height: 70px;
  }
}
@media screen and (min-height: 361px) and (max-height: 430px) {
  .header {
    height: 140px;
  }
}
@media screen and (min-height: 431px) {
  .header {
    height: 200px;
  }
}

.side {
  &.hide {
    .mask {
      display: none;
    }

    .btn {
      right: calc(8%);

      i {
        width: 20px;

        &:first-child {
          left: 50%;
          top: 50%;
          transform: translate(-50%, calc(-50% - 7px));
        }

        &:nth-child(2) {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        &:last-child {
          left: 50%;
          top: 50%;
          transform: translate(-50%, calc(-50% + 7px));
        }
      }
    }
  }

  &.show {
    .btn {
      right: calc(8% + 240px);

      i {
        &:first-child {
          width: 12px;
          left: 50%;
          top: 50%;
          transform: translate(-30%, -50%) rotate(40deg);
          transform-origin: right center;
        }

        &:nth-child(2) {
          width: 19px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        &:last-child {
          width: 12px;
          left: 50%;
          top: 50%;
          transform: translate(-30%, -50%) rotate(-40deg);
          transform-origin: right center;
        }
      }
    }
  }

  .mask {
    @extend %max-size;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }

  .btn {
    position: fixed;
    bottom: 60px;
    width: 36px;
    height: 36px;
    background-color: #9e9e9e;
    border-radius: 50%;
    z-index: 11;
    transition: all .3s ease-in-out;
    cursor: pointer;
    outline: none;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.12), 0 2px 3px 0 rgba(0,0,0,.24);

    &:hover {
      background-color: red;
    }

    i {
      display: block;
      position: absolute;
      height: 2px;
      background-color: #fff;
      border-radius: 2px;
      transition: .5s;
    }
  }

  .side-area {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    transition: all .3s ease-in-out;
    z-index: 11;

    .header {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      flex-direction: column;
      // height: 200px;
      box-sizing: border-box;
      @include bgimg('~@/assets/images/img1.png');

      img {
        width: 54px;
        height: 54px;
        margin-left: 20px;
        border-radius: 50%;
      }

      p {
        width: 100%;
        text-align: left;
        line-height: 50px;
        margin-top: 20px;
        padding-left: 20px;
        color: #fff;
        font-style: italic;
        font-weight: 500;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    .main {
      padding: 17px 0;

      ul {
        list-style-type: none;
        text-align: left;

        li {
          font-size: 16px;
          cursor: pointer;
          transition: all .2s ease-in-out;

          .link {
            display: block;
            line-height: 48px;
            padding-left: 20px;
            color: #757575;
            text-decoration: none;
            transition: all .2s ease-in-out;
            outline: none;

            &:before {
              font-size: 20px;
              margin-right: 18px;
            }
          }

          &:hover {
            background-color: rgba(0, 0, 0, .1);
            
            .link {
              color: #0097A7;
            }
          }
        }
      }
    }
  }
}
</style>
