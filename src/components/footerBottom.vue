<template>
  <div class="footer">
    <div class="bottom">晋ICP备17008841号</div>
  </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
    position: relative;
    width: 100vw;
    height: 4rem;
    background-color: rgba(0, 0, 0, .7);
    margin-top: .4rem;
    overflow: hidden;
}
.bottom {
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  left: 0;
  text-align: center;
  line-height: 40px;
  font-size: 13px;
  font-weight: bold;
  color: rgba(255,255,255,.8);
}
</style>
