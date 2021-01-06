import Vue from 'vue'

const requireComponent=require.context('./global',false,/\.vue$/)
requireComponent.keys().forEach(item=>{
  const componentItem=requireComponent(item)
  Vue.component(componentItem.default.name,componentItem.default)
})