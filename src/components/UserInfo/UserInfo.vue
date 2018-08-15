<template>
  <div class="user-info" ref="userInfo" @touchmove="touch">
    <div class="avatar-wrapper">
      <div class="avatar" v-if="!!(user && user.logourl)"
       >
        <img :src="imgUrl" alt="logo" @click="goLogo">
      </div>
      <h2 class="name">{{user.sysname}}</h2>
    </div>
    <div class="info">
      <group>
        <cell title="邮箱" :value="user.email" link="/change-email"></cell>
        <cell title="电话" :value="user.tel" link="/change-telephone"></cell>
        <cell title="昵称" :value="user.nickname"></cell>
      </group>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import request from '@/utils/request'
  import { Group, Cell, Actionsheet } from 'vux'
  import {api_get_userInfo, api_upload_logo, baseHost} from '@/services/api'
  import VueCoreImageUpload from 'vue-core-image-upload'
  export default {
    name: 'user-info',
    data() {
      return {
        user: {},
        showActionsheet: false,
        menus: {
          menu1: '选择图片'
        }
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
        return baseHost.substring(0, baseHost.length - 1) + this.user.logourl + '&t= '+new Date()
      },
      uploadUrl() {
        return api_upload_logo + '&id=' + this.user.id
      }
    },
    methods: {
      touch(event){
           event.preventDefault();
      },
      _calcHeight() {
        const watch = this.$refs.userInfo.getBoundingClientRect()
        this.$refs.userInfo.style.height = watch.height+10+ 'px'
      },
      imageuploaded(res) {
        if(res.code === 1) {
          location.reload()
        } else {
          this.$vux.alert.show({
            title: res.data.msg
          })
        }
      },
      activeActionsheet() {
        this.showActionsheet = true
      },
      clickActionsheet(key) {
        console.log(key)
      },
      goLogo(){
        this.$router.push('/change-avatar')
      }
    },
    components: {
      Group,
      Cell,
      VueCoreImageUpload,
      Actionsheet
    }
  }
</script>

<style scoped lang="less">
  .user-info {
    min-height:100%;
    background: #ffffff;
    .avatar-wrapper {
      padding-top: 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #2d324f;
      .avatar {
        img {
          max-width: 2rem;
          max-height:2rem;
        }
        }
      .name {
        font-size: 0.2rem;
        font-weight: 400;
        color: #ffffff;
        margin-top: 0.2rem;
        margin-bottom: 0.4rem;
      }
    }
  }
</style>
