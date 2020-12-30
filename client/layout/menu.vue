<template>
    <div class="menu" :class="!leftMenuShow ? '' : 'hide'">
        <el-collapse  v-model="taskbarsIndexs" accordion @change="itemChange" v-if="isShowMenu"> 
            <el-collapse-item v-for="(TwoM,index) in taskbars" :name="index" v-if="TwoM.visible" >
                <template slot="title">
                    <div class="span">
                        <i class="fa fa-lg" :class="['fa-'+TwoM.m_icon]"></i>
                        {{TwoM.menu}}
                    </div>
                </template>
                <div class="child_menu_box" :class="taskbarsSonIndex == indexSon ? 'active' : ''"
                     v-for="(ThreeM,indexSon) in TwoM.childMenus" :key="ThreeM.id" 
                     v-if="ThreeM.visible && TwoM.childMenus.length > 0"
                     @click="changeSon(indexSon,ThreeM)">
                    {{ThreeM.menu}}
                </div>
            </el-collapse-item>
        </el-collapse>
        <div class="leftMenu" @click="$store.commit('HomeModule/updata_leftMenuShow',!leftMenuShow)" v-if="$route.name != 'bigDataVersion'">
            <i :class="!leftMenuShow ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
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
                isShowMenu         : state => state.HeaderModule.isShowMenu,
                leftMenuShow       : state => state.HomeModule.leftMenuShow,
            }),
        },
        mounted(){
            //获取数据
            this.taskbarsIndexs = this.taskbarsIndex
            this.$store.commit('MenuModule/getDataTabs',this)
        },
        data() {
            return {
                show: false,
                taskbarsIndexs:0
            }
        },
        watch:{
            taskbarsIndexs(val){
                if(val == 4){
                    this.$store.commit('MenuModule/changeIndex', this.taskbarsIndex)
                }else{
                    this.$store.commit('MenuModule/changeIndex', val)
                }
                
            },
        },
        methods: {
            //点击二级菜单，显示或隐藏三级菜单
            itemChange(activeNames) {
                if(activeNames == 4){
                    // 
                    
                    setTimeout(() => {
                        //大数据看版
                        let link = this.$router.resolve({
                            path: this.taskbars[activeNames]['url'],
                        });
                        window.open(link.href, '_blank')
                    })
                }else{
                    this.$store.commit('MenuModule/changeSonIndex', '-1')
                    
                }
            },
            //点击进入对应页面
            changeSon(index,item){
                this.$store.commit('MenuModule/changeSonIndex', index)
                
                this.$router.push({
                    path: item['url']
                });
            },
        }

    }
</script>

<style lang="stylus">

.menu {
    width 230px
    height auto
    background #252a2f
    position absolute
    top 50px
    left 0px
    bottom 0px
    &.hide{
        left -230px !important
    }
    .leftMenu{
        position absolute
        top 35%
        left 225px
        width 25px
        height 50px
        background #252a2f
        border-radius 3px
        font-size 25px
        color #ffffff
        z-index 100
        line-height 50px
        cursor pointer
    }
    .el-collapse-item__header{
        color #ffffff
        background #252a2f
        &:hover{
            background #000000
        }
        .span{
            text-indent 10px
        }
    }
    .el-collapse-item__content{
        color #ffffff
        background #252a2f
        padding 0
    }
    .child_menu_box{
        height 40px
        line-height 40px
        text-indent 70px
        font-size 14px
        cursor pointer
        &:hover,&.active{
            background #000000
        }
    }
    .el-collapse,.el-collapse-item__wrap,.el-collapse-item__header{
        border-color #4a4f5a !important
    }
}


      
   
</style>

