<template>
<transition name="el-fade-in-linear">
  <div class="fontIconMaskBox" v-show="isVisible">
    <div class="fontIconMainBox">
      <div class="fontIconHeaderBox">选择字体图标<i class="el-icon-close" @click="closeSelectFontIcon"></i></div>
          <div class="fontIconContentBox">
            <template v-for="fontItem in fontIconData">
                <div class="fontIconTitleBox">{{fontItem.name}}</div>
                    <div class="fontIconItemBox">
                        <template  v-for="iconItem in fontItem.content">
                            <div class="fontIconItem" @click="selectFontIconValue(iconItem)"><i class="fa fa-lg" :class="['fa-'+iconItem.name]"></i></div>
                    </template>
                </div>
            </template>
          </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
const fontIconData = require("./jsonFontLibrary.json");
export default {
  name: 'SelectFontIcon',
  props: {
      selectFontValue : {
      type: Function,
      required: true
    }
  },
  data(){
    return {
      isVisible : true,
      fontIconData : []
    }  
  },
  mounted(){
      this.fontIconData = fontIconData
  },
  methods: {
      closeSelectFontIcon(e){
          e.preventDefault()
          this.isVisible = false
      },
      selectFontIconValue(item){
          this.isVisible = false
          this.$emit('selectFontValue',item)
      }
  }
}
</script>

<style lang="stylus" scoped>

  .fontIconMaskBox {
        position fixed
        background rgba(0,0,0,0.5)
        left 0
        top 0
        bottom 0
        right 0
        z-index 99999999

        .fontIconMainBox {
            position relative
            left 50%
            width 820px
            border 1px solid #ebeef5
            box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
            height 80%
            border-radius 4px
            background #fff 
            margin-left -400px
            margin-top 5%
            z-index 999
        }

        .fontIconHeaderBox {
            width 100%
            height 50px   
            font-size 18px
            line-height 50px
            text-indent 15px

            i {
                float right
                margin-top 15px
                margin-right 15px
            }
        }

        .fontIconContentBox {
            width 100%
            position absolute
            top 50px
            left 0px
            bottom 0px
            right 0px  
            overflow auto
        }

        .fontIconTitleBox {
            height 40px
            line-height 40px   
            background #eee
            text-indent 15px
            font-size 14px
        }

        .fontIconItemBox {
            width 100%
            height auto 
            display flex
            flex-wrap wrap
            justify-content flex-start

            .fontIconItem {
                width 50px
                height 50px
                text-align center
                line-height 50px

                &:hover {
                    background #21b384  
                    border-radius 5px
                    cursor pointer
                    color #fff
                }
            }

        }
    }

</style>
