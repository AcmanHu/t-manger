<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
 html,body{
       height: 100%;
   }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  height: 100%;
  /* margin-top: 60px; */
}
.teacher{
  .ivu-card-body{
    padding: 0;
  }
  .modification{
    .ivu-card-body{
      padding: 16px;
    }
  }
}
  
.ivu-layout-sider-trigger{
  background: #fff ;
  color: #515a6e;
}
</style>
