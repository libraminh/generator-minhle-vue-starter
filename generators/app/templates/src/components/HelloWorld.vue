<template>
  <div class="hello">
    Hello World

    <div class="box">
      box content
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello {
    .box {
      width: 50px;
      padding: 10px;
      background: lightblue;
    }
  }
</style>
