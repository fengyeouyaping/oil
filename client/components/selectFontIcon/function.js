import Vue from 'vue'
import Component from './selectFontIcon.vue'

//Vue实例化
const SelectFontIconConstructor = Vue.extend(Component)

let seed = 1

const selectFontIcon = (options) => {
//创建一个方法
  const instance = new SelectFontIconConstructor({
//进行赋值
    propsData : options
  })
//创建一个随机id
  const id = `selectFontIcon_${seed++}`
  instance.id = id
//把id挂载到dom上
  instance.vm = instance.$mount()
//创建一个dom实例
  document.body.appendChild(instance.vm.$el)
//监听事件
  instance.vm.$on('selectFontValue',function(item){
    options.selectFontValue(item)
  })

  return instance.vm

}

export default selectFontIcon