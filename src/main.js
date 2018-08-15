// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import request from '@/utils/request'
// 以 plugin 形式使用时，请在入口处引入：
import { DatetimePlugin, ConfirmPlugin, AlertPlugin } from 'vux'
Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
sync(store, router, { moduleName: 'RouteModule' })
// FastClick.attach(document.body)
Vue.config.productionTip = false
/* eslint-disable no-new */
let app=new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
router.beforeEach((to, from, next) => {
  if(to.path==='/login'){
      next()
  }else{
    request(`http://119.90.61.155/om31/mpart/oWork/reportDo?action=getResourceByUserId&model=2&page=1`)
    .then(res => {
      if(res.data===undefined){
        app.$vux.alert.show({
          title: '登录超时，请重新登录',
          onHide(){
            next('/login') 
          }
        })
       }
        next()
    })
  }
})

