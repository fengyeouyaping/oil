<template>
    <div id="app" class="main_bg_color">
       <Header></Header>
       <Menu></Menu>
       <Content></Content>
       <!-- <Bottom></Bottom> -->
       <!-- <tabs></tabs> -->
       <Login></Login>
       <LockWindow></LockWindow>
    </div>
</template>
 
<script>
import Header from './layout/header.vue'
import Menu from './layout/menu.vue'
import Content from './layout/content.vue'
import Bottom from './layout/bottom.vue'
import Tabs from './layout/tabs.vue'
import Login from './views/systemView/login/login.vue'
import LockWindow from './layout/lockWindow.vue'

export default {
  components: {
    Login,
    Header,
    Menu,
    Content,
    Bottom,
    Tabs,
    LockWindow
  },
  mounted() {
    
  }
};
</script>

<style lang="stylus" scoped>
#app {
    width 100%
    height 100%
    position relative
}
</style>


