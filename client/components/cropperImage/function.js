import Vue from 'vue'
import Component from './cropperImage.vue'

//Vue实例化
const CropperImageConstructor = Vue.extend(Component)

const cropperImage = (options) => {

  //创建一个方法
  const instance = new CropperImageConstructor({
    //进行赋值
    propsData : options
  });
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  instance.vm.$on('cropperImageResult',function(data){
    options.cropperImageResult(data)
  })

  return instance.vm

}


export default cropperImage