<template>
  <div class="change-email" @touchmove="touch">
    <div class="blank-box"></div>
    <div class="box-wrapper">
      <div class="box vux-1px-b">
        <span class="username">用户名</span>
        <span class="username">{{username}}</span>
      </div>
      <div class="box vux-1px-b">
        <x-input title="新邮箱" placeholder="请输入新的邮箱" type="email" is-type="email" required v-model="email"></x-input>
      </div>
      <div class="confirm-button-wrapper">
        <x-button text="确定" mini style="background-color: #2d324f;color: #ffffff;" class="btn" :show-loading="btnLoading" @click.native="submitEmail"></x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { XInput, XButton, AlertModule } from 'vux'
  import request from '@/utils/request'
  import {api_get_userInfo,api_edit_email} from '@/services/api'
  export default {
    name: 'change-email',
    data() {
      return {
        btnLoading: false,
        email: '',
        username:''
      }
    },
    created(){
      request(api_get_userInfo).then((res) => {
        this.username = res.data.sysname
      })
    },
    methods: {
      touch(event){
           event.preventDefault();
      },
      submitEmail() {
        if (this.email) {
          const parttan = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          if (parttan.test(this.email)) {
             request(api_edit_email +'&email=' + this.email).then(res=>{
                   if(res.data.code === 1 ){
                        AlertModule.show({
                        content: res.data.msg
                        })
                   }
             })
          } else {
            AlertModule.show({
              content: '邮箱格式不正确'
            })
          }
        }
      }
    },
    components: {
      XInput,
      XButton,
      AlertModule
    }
  }
</script>

<style scoped lang="less">
  .change-email {
    background-color: #e6e6e6;
    height: 100%;
    padding-top:0.2rem;
    .blank-box {
      height: 0.9rem;
    }
    .box-wrapper {
      margin-left: 0.56rem;
      margin-right: 0.56rem;
      border-radius: 6px;
      font-size: 0.26rem;
      background-color: #ffffff;
      .box {
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        height: 1rem;
        line-height: 1rem;
        .username {
          padding: 10px 15px;
        }
      }
      .confirm-button-wrapper {
        display: flex;
        .btn {
          margin-top: 1.6rem;
          margin-bottom: 0.5rem;
          width: 50%;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.28rem;
        }
      }
    }
  }
</style>
