<template>
  <div class="msgbd">
    <div class="msg-area">
      <p class="msg-title">片语只言，三长两短。唠叨问候，嬉笑言欢。侃侃而谈，各抒己见。不吝赐教，逆耳忠言。</p>
      <p class="msg-from">——— 我自己</p>
    </div>
    <msg-area :typeid="'bbs'"></msg-area>
  </div>
</template>

<script>
import msgArea from '@/components/message';
import axios from 'axios';

export default {
  name: 'bbs',
  components: {
    msgArea
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg-area {
  color: #acacac;
  font-style: italic;
  margin: 10px 0;
  line-height: 1.3;
}
.msg-title {
  font-size: 14px;
  margin-bottom: 10px;
  text-indent: 2em;
}
.msg-from {
  font-size: 13px;
  text-align: right;
}
</style>
