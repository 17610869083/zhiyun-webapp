import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router= new Router({
  routes: [
    
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/watch',
      name: 'OpinionWatch',
      component: reslove => require(['@/components/OpinionWatch/OpinionWatch'],reslove)
    },
    {
      path: '/detail',
      name: 'OpinionDetail',
      component: reslove => require(['@/components/OpinionDetail/OpinionDetail'],reslove)
    },
    {
      path: '/myopinion',
      name: 'MyOpinion',
      component: reslove => require(['@/components/MyOpinion/MyOpinion'],reslove)
    },
    {
      path: '/situation',
      name: 'OpinionSituation',
      component: reslove => require(['@/components/OpinionSituation/OpinionSituation'],reslove)
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      component: reslove => require(['@/components/UserInfo/UserInfo'],reslove)
    },
    {
      path: '/change-userinfo',
      name: 'ChangeUserInfo',
      component: reslove => require(['@/components/UserInfo/ChangeUserInfo'],reslove)
    },
    {
      path: '/topic',
      name: 'OpinionTopic',
      component: reslove => require(['@/components/OpinionTopic/OpinionTopic'],reslove)
    },
    {
      path: '/topic/add',
      name: 'OpinionTopicAdd',
      component: reslove => require(['@/components/OpinionTopic/OpinionTopicAdd/OpinionTopicAdd'],reslove)
    },
    {
      path: '/topic/setting',
      name: 'OpinionTopicKeywordSetting',
      component: reslove => require(['@/components/OpinionTopic/OpinionTopicKeywordSetting/OpinionTopicKeywordSetting'],reslove)
    },
    {
      path:'/category',
      name:'OpinionCategory',
      component: reslove => require(['@/components/OpinionCategory/OpinionCategory'],reslove)
    },
    {
      path:'/category/add',
      name:'OpinionCategoryAdd',
      component: reslove => require(['@/components/OpinionCategory/OpinionCategoryAdd'],reslove)
    },
    {
      path:'/topic/chart',
      name:'OpinionTopicChart',
      component: reslove => require(['@/components/OpinionTopic/OpinionTopicChart'],reslove)
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: reslove => require(['@/components/UserInfo/ChangePassword'],reslove)
    },
    {
      path: '/change-email',
      name: 'ChangeEmail',
      component: reslove => require(['@/components/UserInfo/ChangeEmail'],reslove)
    },
    {
      path: '/change-telephone',
      name: 'ChangeTel',
      component: reslove => require(['@/components/UserInfo/ChangeTel'],reslove)
    },
    {
      path: '/change-avatar',
      name: 'ChangeAvatar',
      component: reslove => require(['@/components/UserInfo/ChangeAvatar'],reslove)
    },
    {
      path: '/notice-setting',
      name: 'NoticeSetting',
      component: reslove => require(['@/components/NoticeSetting/NoticeSetting'],reslove)
    },
    {
      path: '/report',
      name: 'OpinionReport',
      component: reslove => require(['@/components/OpinionReport/OpinionReport'],reslove)
    },
    {
      path: '/material',
      name: 'OpinionMaterial',
      component: reslove => require(['@/components/OpinionMaterial/OpinionMaterial'],reslove)
    },
    {
      path:'/worning',
      name:'OpinionWarning',
      component: reslove => require(['@/components/OpinionWarning/OpinionWarning'],reslove)
    },
    {
      path:'/topicSetting',
      name:'OpinionTopicSetting',
      component: reslove => require(['@/components/OpinionTopicSetting/OpinionTopicSetting'],reslove)
    },
    {
      path:'/categorySetting',
      name:'OpinionCategorySetting',
      component: reslove => require(['@/components/OpinionCategorySetting/OpinionCategorySetting'],reslove)
    },
    {
      path:'/search',
      name:'OpinionSearch',
      component: reslove => require(['@/components/OpinionSearch/OpinionSearch'],reslove)
    },
    {
      path: '/collection',
      name: 'OpinionCellection',
      component: reslove => require(['@/components/OpinionCollection/OpinionCollection'],reslove)
    },
    {
      path: '/topic/detail',
      name: 'OpinionTopicDetail',
      component: reslove => require(['@/components/OpinionTopic/OpinionTopicDetail'],reslove)
    },
    {
      path:'/analysis',
      name:'OpinionAnalysis',
      component: reslove => require(['@/components/OpinionAnalysis/OpinionAnalysis'],reslove)
    },
    {
      path:'/weibo',
      name:'OpinionWeibo',
      component: reslove => require(['@/components/OpinionWeibo/OpinionWeibo'],reslove)
    },
    {
      path: '/home',
      name: 'HomePage',
      component: reslove => require(['@/components/HomePage/HomePage'],reslove)
    },
    {
      path: '/login',
      name: 'Login',
      component: reslove => require(['@/components/Login/Login'],reslove)
    },
    {
      path: '/register',
      name: 'Register',
      component: reslove => require(['@/components/Register/Register'],reslove)
    },
    {
      path: '/original-text',
      name: 'OriginalText',
      component: reslove => require(['@/components/OriginalText/OriginalText'],reslove)
    }
  ]
})
export default router