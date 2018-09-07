<template>
  <div class="error">
    <div class="not">
      <p class="num">404 Not Found!</p>
      <p class="info">您访问的页面不存在的！</p>
    </div>
  </div>
</template>

<script>

export default {
  name: '404'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.not {
  margin: 50px 0;
  line-height: 2;
  text-align: center;
  overflow: hidden;
}
.num {
  font-size: 30px;
  color: #878787;
}
.info {
  font-size: 20px;
  color: #737373;
}
</style>
