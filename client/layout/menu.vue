<template>
    <div class="menu">
        <div class="menus_one">
            <el-menu
                :default-active="taskbarsIndex"
                class="el-menu-vertical-demo"
                @select="change"
                background-color="#252a2f"
                text-color="#fff"
                active-text-color="#333">

                <el-menu-item v-for="(taskbar,index) in taskbars" :key="index" :index="index+''" v-if="taskbar.visible">
                    <i class="fa fa-lg" :class="['fa-'+taskbar.m_icon]" style="width:38px"></i>
                    <span slot="title">{{taskbar.menu}}</span>
                </el-menu-item>

            </el-menu>

            <div class="menus_son" v-if="taskbars.length != 0 && taskbars[taskbarsIndex] && taskbarsIndex != 4 && $route.name != 'userInfo' && taskbars[taskbarsIndex]['visible']">
                <el-menu
                    :default-active="taskbarsSonIndex"
                    class="el-menu-vertical-demo"
                    background-color="#ffffff"
                    text-color="#333"
                    @select="changeSon"
                    active-text-color="#324fc4">

                    <el-menu-item v-for="(task,index) in taskbars[taskbarsIndex]['childMenus']" :key="index" :index="index+''" v-if="task.visible">
                        <span slot="title">{{task.menu}}</span>
                    </el-menu-item>

                </el-menu>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState,mapMutations } from 'vuex'

    export default {
        computed: {
            ...mapState({
                taskbars           : state => state.MenuModule.taskbars,
                taskbarsIndex      : state => state.MenuModule.taskbarsIndex,
                taskbarsSonIndex   : state => state.MenuModule.taskbarsSonIndex,
            })
        },
        mounted(){
            //获取数据
            this.$store.commit('MenuModule/getDataTabs',this)
        },
        data() {
            return {
                show: false,
            }
        },
        methods: {
            //点击以及菜单，进行二级菜单的切换
            change(key, keyPath){
                if(key != 4){
                    this.$store.commit('MenuModule/changeIndex', key+'')
                    setTimeout(() => {
                        this.changeSon(0,0)
                    })
                }else{
                    this.$store.commit('MenuModule/changeIndex', this.taskbarsIndex+'')
                    this.$forceUpdate()
                    
                    setTimeout(() => {
                        //大数据看版
                        let link = this.$router.resolve({
                            path: this.taskbars[key]['url'],
                        });
                        window.open(link.href, '_blank')
                    })
                }
                
            },
            //点击进入对应页面
            changeSon(key, keyPath){
                this.$store.commit('MenuModule/changeSonIndex', key+'')
                
                this.$router.push({
                    path: this.taskbars[this.taskbarsIndex]['childMenus'][key]['url']
                });
            }
        }

    }
</script>

<style lang="stylus" scoped>
.oneMenuRighrAlertClose{
    display: inline-block;
    width: 100%;
    text-align: right;
    position absolute
    right 15px
    top 10px
}

.oneMenuRighrAlert{
    background: #fff;
    width: 800px;
    height: 100%;
    padding: 15px;
    position: fixed;
    top: 50px;
    left: 100%;
    z-index: 100000;
    border-right 1px solid #ccc

    .oneMenuRighrItem {
        width 100px
        height 90px
        background #eee
        border 1px solid #eee
        text-align center
        font-size 30px
        float left
        padding-top 15px
        color #666
        margin-right 10px
        margin-bottom 10px
        cursor pointer
        box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);

        &:hover {
            background #fff
        }

        p {
            font-size 14px
            margin-top 10px
        }
    }
}

.menu {
    width 270px
    height auto
    position absolute
    top 50px
    left 0px
    bottom 0px
  
    .menus_one{
        position relative  
        width 160px
        height 100%
        background #252a2f

        .menus_son{
            position absolute
            left 160px
            top 0px
            width 100px
            height 100%
            background #ffffff
            .el-menu{
                border none
                left 1px   
            }
            .el-menu-item{
                margin-top 20px 
                position relative
                &:after{
                    position absolute
                    content ""
                    bottom -10px
                    left 0
                    width 100% 
                    height 1px
                    background #eee 
                }  
            }
        }
        .el-menu{
            border none     
        }

    }
  

}


      
   
</style>

