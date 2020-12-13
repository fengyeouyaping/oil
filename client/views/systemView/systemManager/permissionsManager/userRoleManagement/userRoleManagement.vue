<template>
    <div class="nodeRoleBox">
        <!--左侧用户节点-->
        <div class="userMenuList">
            <div class="userMenuTitle">所有用户</div>
            <div class="userMenuItem" @click="selectRoleClick(userItem,index)" v-for="(userItem,index) in userData" :key="userItem.u_id" >{{userItem.u_nickname}}<i v-if="userItem.isSelected" class="el-icon-circle-check"></i></div>
        </div>
        <!--右侧角色列表-->
        <div class="roleMenuList">
            <el-transfer
                    v-model="nowRoleData"
                    :data="roleData"
                    :props="{
                    key   : 'or_id',
                    label : 'or_name'
                }"
                    :titles="['所有角色', '当前角色']">

            </el-transfer>

            <div class="nodeRoleSubmit">
                <el-button type="primary" @click="nodeRoleForm">将角色分配给用户</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        //数据源
        data(){
            return {
                nowRoleData       : [], //当前节点所拥有的角色
                nowUserId         : 0,  //当前选中的用户ID
                nowNodeData       : {}, //当前选中的用户信息
                otherNodeRoleData : [] //其他要更新节点的参数信息
            }
        },
        //初始化函数
        mounted() {
            //获取用户列表信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.userSearch + "/skip/0/limit/1000", rs => {
                
                for(let n in rs.data){
                    rs.data[n].isSelected = false
                }
                this['UserRoleManagementModule/getuserData'](rs.data)

                //获取角色列表信息
                this.$http.getHttp(this.$API.organizationalRoleSearch + "/no/or_is_all-1/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    
                    for(let n in rs.data){
                        rs.data[n].roleMenu = false
                    }
                    this['UserRoleManagementModule/updateRoleData'](rs.data)

                });
            });
        },
        //计算属性
        computed: {
            ...mapState({

                userData : state => state.UserRoleManagementModule.userData,
                roleData : state => state.UserRoleManagementModule.roleData,

            })

        },
        //组件方法
        methods: {
            ...mapMutations(['getuserData','UserRoleManagementModule/getuserData']),
            ...mapMutations(['updateRoleData','UserRoleManagementModule/updateRoleData']),
            //点击进行分配
            nodeRoleForm(){
                if(this.nowUserId == 0){
                    this.$myPop.WarningMessage("请选择要分配角色的节点")
                    return
                }

                var datas = {}
                datas.node_role = []
                datas.u_id = this.nowUserId
                for(let n in this.nowRoleData){
                    datas.node_role.push({
                        "urm_orid" : this.nowRoleData[n]
                    })
                }

                //访问接口，进行分配
                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.userAllocationRole,datas,(rs) => {
                 this.$myLoading.endLoading()
                 this.$myPop.SuccessMessage()

                })

            },
            //选择用户
            selectRoleClick(item,index){
                var arr = this.userData

                arr.map(function (ar) {
                    ar.isSelected = false
                    return ar
                });

                this['UserRoleManagementModule/getuserData'](arr)

                //获取当前选择的用户
                this.nowUserId = item.u_id

                //选中当前用户
                item.isSelected = true

                //获取当前用户所拥有的角色信息
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.userRoleMiddleSearch + "/urm_uid/"+this.nowUserId+"/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    
                    var tempRoleArr = []
                    for(var i=0;i<rs.data.length;i++){
                        tempRoleArr.push(rs.data[i].urm_orid)
                    }

                    this.nowRoleData = tempRoleArr
                });

            }
        }
    }
</script>

<style lang="stylus" scoped>

    .nodeRoleBox {
        top 40px
        left 0px
        bottom 0px
        right 0px
        position absolute
    }

    .userMenuList {
        width 200px
        height 100%
        float left
        border-right 1px solid #eee

        .userMenuTitle {
            width 100%
            height 40px
            line-height 40px
            text-indent 12px
            color #fff
            background #666
        }

        .userMenuItem {
            width 100%
            height 40px
            background #fff
            line-height 40px
            text-indent 10px
            border-bottom 1px solid #eee
            position relative

            i {
                font-size 18px
                position absolute
                top 9px
                color #409EFF
                right 10px
            }


            &:hover {
                background #eee
                cursor pointer
            }
        }
    }
    .roleMenuList {
        position absolute
        left 200px
        top 0px
        padding-left 15px
        padding-right 10px
        padding-top 15px
        right 0px
        bottom 0px
        overflow auto

        .nodeRoleSubmit {
            position absolute
            bottom 0px
            height 50px
            background #eee
            z-index 99
            left 0px
            right 0px

            button {
                margin-top 5px
                margin-left 5px
            }
        }
    }
</style>