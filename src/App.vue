<template>
  <div id="main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <my-player v-show="show"></my-player>
  </div>
</template>
<script>
  import Player from './components/playerBar'
  export default{
     data(){
        return {

        }
     },
     components:{
         'my-player':Player
     },
     computed:{
        show(){
          return this.$store.state.show
        }
     }
  }
</script>
<style lang="less" scoped>

</style>