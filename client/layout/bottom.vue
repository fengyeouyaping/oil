<template>
  <div class="main_bottom">
    <div class="bottomClockTime">当前日期：{{nowDate}} / 当前时间：{{nowTime}}</div>
    <div class="system_status">
      <i class="fa fa-circle fa-lg"></i>运行中
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowDate : this.$common.dateFormat("YYYY 年 MM 月 dd",this.$common.currentTime()),
      nowTime : this.$common.dateFormat("hh 点 mm 分 ss 秒",this.$common.currentTime()),
    }
  },
  mounted(){

    setInterval(() => {
      this.nowTime = this.$common.dateFormat("hh 点 mm 分 ss 秒",this.$common.currentTime())
    },1000)


  },
  methods: {
    
  },
  computed: {
    
  }
}
</script>

<style lang="stylus" scoped>
.bottomClockTime {
  width 60% 
  height 40px
  text-indent 15px
  line-height 40px
  color #eee
  float left
}

.main_bottom {
  position absolute
  height 40px
  bottom 0px
  left 230px
  right 0px
  background #333
}

.system_status {
  width 30%
  height 40px
  float right
  text-align right
  padding-right 10px
  line-height 40px
  color #fff
  letter-spacing 1px
  padding-left 10px

  i {
    color green
    margin-right 10px
  }

}
</style>
