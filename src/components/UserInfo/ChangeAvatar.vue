<template>
  <div class="avatar">
  <div class="change-avatar">
      <div class="wrapper vux-1px">    
        <img :src="imgUrl" alt="logo" class="avatar-img">
        <vue-core-image-upload
            class="btn btn-primary"
            :style="{color:'#ffffff', background: '#35495e'}"
            :crop="false"
            @imageuploaded="imageuploaded"
            :max-file-size="5242880"
            text="上  传"
            :url="uploadUrl" >
        </vue-core-image-upload>
      </div>
  </div>
        <div class="text">
          可上传图片最大为512KB
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import request from '@/utils/request'
  import {api_get_userInfo, api_upload_logo, baseHost} from '@/services/api'
  import VueCoreImageUpload from 'vue-core-image-upload'
  export default {
      name: 'change-avatar',
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
      computed: {
        imgUrl() {
            return baseHost.substring(0, baseHost.length - 1) + this.user.logourl+ '&t= '+new Date()
        },
        uploadUrl() {
            return api_upload_logo + '&id=' + this.user.id
        }
      },
      methods: {
        imageuploaded(res) {
            const _this=this
            if(res.code === 1) {
              console.log(123)
              request(api_get_userInfo).then((res) => {
                 this.user = res.data
                 _this.$store.commit('USER_INFO',res.data)

               })
            } else {
                this.$vux.alert.show({
                    title: '图片过大，请小于512KB' 
              })
            }
        }
      },
      components: {
        VueCoreImageUpload
      }
  }
</script>

<style scoped lang="less">
.avatar{
    min-height:100%;
    background: #ffffff;
    padding-top: 0.4rem;
.text{
    font-size: 0.28rem;
    text-align: center;
    margin-top: 0.2rem;
}
.change-avatar {
    width: 100%;
    display: flex;
    justify-content: center;
    .wrapper {
        padding: 0.4rem;
        .avatar-img {
            max-width: 4rem;
        }
        .btn-primary {
            color: #fff;
            background: #2ecc71;
            border-color: #2ecc71;
        }
        .btn {
            display: block;
            line-height: 40px;
            padding: 0 15px;
            border-radius: 2px;
            background: #fff;
            border: 1px solid #e7eaec;
            min-width: 46px;
            color: #323c48;
            text-align: center;
            transition: all .15s ease;
            font-size: 16px;
            cursor: pointer;
            outline: none!important;
            box-shadow: 0 1px 2px -1px hsla(0,0%,100%,.1);
            transition: all .25s ease;
        }
    }
}
}
</style>
