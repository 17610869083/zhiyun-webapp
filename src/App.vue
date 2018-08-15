<template>
  <div id="app">
    <drawer width="300px;"
    :show.sync="drawerVisibility"
    :show-mode="showModeValue"
    :placement="showPlacement"
    :drawer-style="{width: '220px'}"
    >
      <div slot="drawer" class="drawer-left">
        <div class="user-info">
          <div class="avatar" v-if="info.logourl">
            <img :src="'http://web.is8.com.cn/om'+info.logourl +'&t= '+new Date()" alt="logo">
            <!-- <img src="./components/OpinionSearch/logo.jpg" alt="logo"> -->
          </div>
          <div class="desc">
            <h2 class="name">{{info && info.sysname}}</h2>
          </div>
        </div>
        <div class="vux-1px-b" style="width:80%;margin:0 auto;"></div>
        <div class="menu-list-wrapper">
          <ul class="menu-list">
            <li class="menu-item" @click="goToSitution">
              <span>舆情概况</span>
            </li>
            <li class="menu-item" @click="goToWatch">
              <span>舆情监测</span>
            </li>
            <li class="menu-item" @click="goWeibo">
              <span>微博舆情</span>
            </li>
            <li class="menu-item" @click="goToTopic">
              <span>专题舆情</span>
            </li>
            <li class="menu-item" @click="goToCategory">
              <span>分类舆情</span>
            </li>
            <li class="menu-item" @click="goToReport">
              <span>舆情报告</span>
            </li>
            <li class="menu-item" @click="goToSearch">
              <span>舆情搜索</span>
            </li>
            <!-- <li class="menu-item" @click="goToAnalysis">
              <span>舆情分析</span>
            </li> -->
          </ul>
        </div>
      </div>
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="53px">
        <x-header slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color: #2d324f;"
        :left-options="leftOptions"
        :right-options="rightOptions"
        :title="title"
        v-if="isShowHeaderAndFooter && isShowHeader"
        >
          <span slot="overwrite-left"  v-if="showBackBtn" @click="goBack">
            <x-icon type="ios-arrow-back" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
          <span slot="overwrite-left" @click="drawerVisibility = !drawerVisibility" v-else>
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
          <span slot="right" v-if="isShowAddBtn" @click="goAdd" >
            <x-icon type="ios-plus-empty" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
          <span slot="right" v-if="isShowSettingBtn" @click="showEdit(delKeywordState)" >
                 {{delKeywordState?'添加':'编辑'}}
          </span>
          <span slot="right" v-if="isShowWaringBtn" @click="showWaring(waringState)" >
                 {{waringState?'添加':'编辑'}}
          </span>
          <span slot="right" v-if="isShowReportBtn" @click="showReport(reportState)" >
                 编辑
          </span>
          <span slot="right" v-if="isShowEditBtn" @click="goEdit" >
               修改
          </span>
        </x-header>
        <transition name="vux-pop-in">
          <router-view class="router-view"></router-view>
        </transition>
        <tabbar slot="bottom" v-if="isShowHeaderAndFooter" icon-class="tabbar"
        >
          <tabbar-item  link="/home" :selected="path==='/home'?true:false">
             <Icon slot="icon" type="icon-mn_zhuye-copy" color="#000000" size="28"></Icon>
             <Icon slot="icon-active" type="icon-zhuye-selected-copy" color="#ff0000" size="28"></Icon>
             <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item link="/watch" :selected="path==='/watch'?true:false">
            <img slot="icon" src="http://p4nbsa4s3.bkt.clouddn.com/watch-normal.png">
            <img slot="icon-active" src="http://p4nbsa4s3.bkt.clouddn.com/watch-active.png">
            <span slot="label">监测</span>
          </tabbar-item>
          <tabbar-item link="/analysis" :selected="path==='/analysis'?true:false">
            <img slot="icon" src="http://p4nbsa4s3.bkt.clouddn.com/analysis-normal.png">
            <img slot="icon-active" src="http://p4nbsa4s3.bkt.clouddn.com/analysis-active.png">
            <span slot="label">分析</span>
          </tabbar-item>
          <tabbar-item link="/search" :selected="path==='/search'?true:false">
            <img slot="icon" src="http://p4nbsa4s3.bkt.clouddn.com/search-normal.png">
            <img slot="icon-active" src="http://p4nbsa4s3.bkt.clouddn.com/search-active.png">
            <span slot="label">搜索</span>
          </tabbar-item>
          <tabbar-item link="/myopinion" :selected="path==='/myopinion'?true:false">
            <img slot="icon" src="http://p4nbsa4s3.bkt.clouddn.com/my-normal.png">
            <img slot="icon-active" src="http://p4nbsa4s3.bkt.clouddn.com/my-active.png">
            <span slot="label">我的</span>
          </tabbar-item>
        </tabbar>
      </view-box>
    </drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import { ViewBox, Tabbar, TabbarItem, Drawer, XHeader } from 'vux'
import { mapState } from 'vuex'
import request from '@/utils/request'
import Icon from './base/IconSvg/IconSvg'
export default {
  name: 'App',
  data () {
    return {
      drawerVisibility: false,
      showModeValue: 'push',
      showPlacement: 'left'
    }
  },
  computed: {
    ...mapState({
      route: state => state.RouteModule,
      path: state => state.RouteModule.path,
      delKeywordState: state => state.delKeyword ,
      waringState: state => state.waring,
      reportState: state => state.delReport,
      info:state => state.info
    }),
    isShowAddBtn(){
        if( this.path === '/topic' || this.path === '/category'){
             return true
        }else {                      
             return false 
        }
    },
    isShowSettingBtn(){
        if( this.path === '/categorySetting' || this.path === '/topicSetting'){
             return true
        }else {                      
             return false 
        }
    },
    isShowEditBtn(){
        if(this.path === '/userinfo'){
            return true
        }else{
            return false
        }
    },
    isShowWaringBtn(){
        if(this.path === '/worning'){
            return true
        }else{
            return false
        }
    },
    isShowHeaderAndFooter () {
      if (this.path === '/login') {
        return false
      }
      if (this.path === '/register') {
        return false
      }
      return true
    },
    isShowHeader () {
      if (this.path === '/resetnotice') {
        return false
      }
      return true
    },
    isShowReportBtn(){
      if(this.path === '/report'){
         return true
      }else{
         return false
      }
    },
    title () {
      if (this.path === '/') return '主页'
      if (this.path === '/myopinion') return '我的'
      if (this.path === '/analysis') return '分析'
      if (this.path === '/watch') return '舆情监测'
      if (this.path === '/search' || this.path === '/search-logo') return '搜索'
      if (this.path === '/situation') return '舆情概况'
      if (this.path === '/detail') return '详情'
      if (this.path === '/weibo') return '微博舆情'
      if (this.path === '/topic') return '专题舆情'
      if (this.path === '/category') return '分类舆情'
      if (this.path === '/leader') return '领导舆情'
      if (this.path === '/infochange') return '修改信息'
      if (this.path === '/change-email') return '修改邮箱'
      if (this.path === '/change-password') return '修改密码'
      if (this.path === '/change-telephone') return '修改电话'
      if (this.path === '/report') return '我的报告'
      if (this.path === '/material') return '素材库'
      if (this.path === '/collection') return '收 藏'
      if (this.path === '/kewords-setting') return '关键词设置'
      if (this.path === '/userinfo') return '我的信息'
      if (this.path === '/topic/add') return '专题编辑'
      if (this.path === '/topic/setting') return '关键词设置'
      if (this.path === '/category/add') return '分类编辑'
      if (this.path === '/topic/chart') return this.route.query.topicname
      if (this.path === '/topic/detail') return this.route.query.topicname
      if (this.path === '/worning') return '预警设置'
      if (this.path === '/topicSetting') return '专题设置'
      if (this.path === '/categorySetting') return '分类设置'
      if (this.path === '/home') return '知舆情'
      if (this.path === '/original-text') return '原文'
      if (this.path === '/change-userinfo') return '修改信息'
      if (this.path === '/notice-setting') return '通知设置'
      if (this.path === '/change-avatar') return '修改头像'
      return '暂未定义'
    },
    showBackBtn(){
      if (this.path === '/topic/add') return true
      if (this.path === '/topic/setting') return true
      if (this.path === '/category/add') return true
      if (this.path === '/topic/chart') return true
      if (this.path === '/worning') return true
      if (this.path === '/topicSetting') return true
      if (this.path === '/categorySetting') return true
      if (this.path === '/topic/detail') return true
      if (this.path === '/detail') return true
      if (this.path === '/original-text') return true
      if (this.path === '/report') return true
      if (this.path === '/material') return true
      if (this.path === '/collection') return true
      if (this.path === '/userinfo') return true
      if (this.path === '/notice-setting') return true
      if (this.path.split('-')[0] === '/change') return true 
    },
    leftOptions () {
      return {
        showBack: false
      }
    },
    rightOptions () {
      return {
        showMore: false
      }
    }
  },
  methods: {
    showEdit(state){
        this.$store.commit('showDelBtn',true)  
         if(state&& this.path === '/topicSetting'){
             this.$router.push('/topic/add')
         }else if (state && this.path === '/categorySetting'){
             this.$router.push('/category/add')
         }
    },
    showWaring(state){
         this.$store.commit('showWaringBtn',true)  
         if(state&& this.path === '/worning'){
             this.$router.push('/topic/setting?type=warning')
         }
    },
    showReport(state){
         this.$store.commit('showReportBtn',!state)    
    },
    goAdd(){ 
       if(this.path=== '/topic' ){
           this.$router.push('/topic/add')
       }else{
           this.$router.push('/category/add')
       }
    },
    goToSitution () {
      this.drawerVisibility = false
      this.$router.push('/situation')
    },
    goToWatch () {
      this.drawerVisibility = false
      this.$router.push('/watch')
    },
    goToTopic () {
      this.drawerVisibility = false
      this.$router.push('/topic')
    },
    goToCategory () {
      this.drawerVisibility = false
      this.$router.push('/category')
    },
    goToReport () {
      this.drawerVisibility = false
      this.$router.push('/report')
    },
    goToSearch () {
      this.drawerVisibility = false
      this.$router.push('/search')
    },
    goToAnalysis () {
      this.drawerVisibility = false
      this.$router.push('/analysis')
    },
    goBack () {
      this.$router.go('-1')
    },
    goWeibo () {
      this.drawerVisibility = false
      this.$router.push('/weibo')
    },
    goEdit(){
      this.$router.push('/change-userinfo')
    }
  },
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
    Drawer,
    XHeader,
    Icon
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
.vux-drawer{
     overflow: hidden;
}
  .vux-drawer > .drawer-left {
    left: 0;
    -webkit-transform: translateX(-92%);
    transform: translateX(-92%);
}
#app {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, PingFang SC, 'Open Sans', 'Helvetica Neue', sans-serif;
  .vux-drawer {
    position: absolute;
  }
  .weui-tab {
  .weui-bar__item_on{
    .weui-tabbar__label{
      color:#2D324F;
    }
  }
    /*#vux_view_box_body {*/
      /*.vux-pop-out-enter-active,*/
      /*.vux-pop-out-leave-active,*/
      /*.vux-pop-in-enter-active,*/
      /*.vux-pop-in-leave-active {*/
        /*will-change: transform;*/
        /*transition: all 500ms;*/
        /*height: 100%;*/
        /*top: 46px;*/
        /*position: absolute;*/
        /*backface-visibility: hidden;*/
        /*!*perspective: 1000;*!*/
      /*}*/
      /*.vux-pop-out-enter {*/
        /*opacity: 0;*/
        /*transform: translate3d(-100%, 0, 0);*/
      /*}*/
      /*.vux-pop-out-leave-active {*/
        /*opacity: 0;*/
        /*transform: translate3d(100%, 0, 0);*/
      /*}*/
      /*.vux-pop-in-enter {*/
        /*opacity: 0;*/
        /*transform: translate3d(100%, 0, 0);*/
      /*}*/
      /*.vux-pop-in-leave-active {*/
        /*opacity: 0;*/
        /*transform: translate3d(-100%, 0, 0);*/
      /*}*/
    /*}*/
  }

  .drawer-left {
    background: url('http://owd9ip8d2.bkt.clouddn.com/left-background.jpg') no-repeat left;
    color: #ffffff;
    .user-info {
      margin-top: 0.42rem;
      margin-bottom: 0.42rem;
      .avatar {
        img {
           max-width: 64px;
           max-height:60px;
           display: block;
           margin:0 auto;
        }
      }
      .desc {
        margin-top: 10px;
        text-align: center;
        .name {
          font-size: 12px;
        }
      }
    }
    .menu-list-wrapper {
      font-size: 18px;
      padding-top: 0.36rem;
      .menu-list {
        .menu-item {
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.v-transfer-dom {
  font-size: 16px;
}
</style>
