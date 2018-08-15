<template>
  <div class="my-opinion" ref="myTop" @touchmove="touch">
    <div class="top">
      <div class="avatar-wrapper">
        <div class="avatar" v-if="!!(user && user.logourl)">
          <img :src="imgUrl" alt="logo">
        </div>
      </div>
      <div class="info">
        <div class="company">{{user.sysname}}</div>
        <div class="me">               
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="line">
        <router-link  to="/userinfo">
        <Icon type="icon-ziyuan" color="#2d324f" size="20"></Icon>
        <span>我的信息</span>
        </router-link>
        <router-link  to="/notice-setting">
        <Icon type="icon-shezhi-xue" color="#2d324f" size="20"></Icon>
        <span>通知设置</span>
        </router-link>
        <a @click.prevent="exit()">
        <Icon type="icon-tuichu" color="#2d324f" size="20"></Icon>
        <span>退出</span>
        </a>
      </div>
      <div class="line">
        <router-link  to="/report">
          <img src="http://p4nbsa4s3.bkt.clouddn.com/report.png">
          <span>我的报告</span>
        </router-link>
        <router-link to="/material">
          <img src="http://p4nbsa4s3.bkt.clouddn.com/folder.png">
          <span>素材库</span>
        </router-link>
        <router-link to="/collection">
          <img src="http://p4nbsa4s3.bkt.clouddn.com/star.png">
          <span>收藏库</span>
        </router-link>
      </div>
      <div class="line">
        <router-link to="/worning">
          <icon-svg type="icon-warning1" color="#2d324f" size="22"></icon-svg>
          <span>预警设置</span>
        </router-link>
        <router-link to="/topicSetting">
          <img src="http://p4nbsa4s3.bkt.clouddn.com/hot.png">
          <span>专题设置</span>
        </router-link>
        <router-link to="/categorySetting">
          <img src="http://p4nbsa4s3.bkt.clouddn.com/sort.png">
          <span>分类设置</span>
        </router-link>
      </div>
    </div>
    <!-- <div style="height:2rem;width:100%;"></div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import request from '@/utils/request'
  import {api_get_userInfo} from '@/services/api'
  import {baseHost} from '@/services/api'
  import Icon from '@/base/IconSvg/IconSvg'
  import IconSvg from '@/base/IconSvg/IconSvg'
  export default {
    name: 'my-opinion',
    data() {
      return {
        user: {}
      }
    },
    created() {
      request(api_get_userInfo).then((res) => {
        this.user = res.data
      })
    },
    mounted(){
       this._calcHeight()
    },
    computed: {
      imgUrl() {
        return baseHost.substring(0, baseHost.length - 1) + this.user.logourl +'&t= '+new Date()
      }
    },
    methods: {
        _calcHeight() {
        const watch = this.$refs.myTop.getBoundingClientRect()
        this.$refs.myTop.style.height = watch.height+10+ 'px'
      },
      touch(event){
           event.preventDefault();
      },
      exit() {
        const that = this
        this.$vux.confirm.show({
          title: '退出',
          content: '确定退出？',
          async onConfirm () {
            const res = await request(baseHost + 'common/login/loginDo?action=loginOut')
            if (res.data.code === 1) {
              localStorage.removeItem('user')
              that.$router.push('/login')
            }
          }
        })
      }
    },
    components:{
      Icon,
      IconSvg
    }
  }
</script>

<style scoped lang="less">
  .my-opinion {
    min-height: 100%;
    width:100%;
    background-color: #e6e6e6;
    .top {
      font-size: 0.26rem;
      height: 1.6rem;
      background-color: #2d324f;
      display: flex;
      .avatar-wrapper {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 1.2rem;
          height: 1.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            max-width: 100%;
            max-height:100%;
          }
        }
      }
      .info {
        width: 70%;
        color: #ffffff;
        margin-top: 0.1rem;
        padding-top: 0.4rem;
        .me {
          margin-top: 0.3rem;
          a {
            line-height: 0.26rem;
            height: 0.26rem;
            color: #ffffff;
            margin-right: 0.1rem;
            img {
              width: 0.30rem;
              vertical-align: top;
            }
            span {
              vertical-align: top;
              margin-left: 0.06rem;
            }
          }
        }
      }
    }
    .bottom {
      .line {
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        min-height: 1.2rem;
        &:nth-child(2) {
          margin-top: 0.16rem;
        }
        &:last-child {
          margin-top: 0.16rem;
        }
        img {
          width: 0.36rem;
        }
        a {
          color: #2d324f;
          width: 33.33%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
      font-size: 0.22rem;
    }
  }
</style>
