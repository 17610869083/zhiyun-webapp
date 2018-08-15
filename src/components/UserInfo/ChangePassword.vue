<template>
    <div class="change-password" @touchmove="touch">
      <div class="blank-box"></div>
      <div class="box-wrapper">
        <div class="box vux-1px-b">
          <x-input title="原密码" placeholder="请输入当前密码" :type="inputType" :show-clear="false"  v-model="oldPassword">
            <div class="password-show-type" slot="right" @click="toggleEyeOpen">
              <img v-show="!open" src="http://p4nbsa4s3.bkt.clouddn.com/eye-close.png">
              <img v-show="open" src="http://p4nbsa4s3.bkt.clouddn.com/eye-open.png">
            </div>
          </x-input>
        </div>
        <div class="box vux-1px-b">
          <x-input title="新密码" placeholder="请输入新的密码" v-model="newPassword"></x-input>
        </div>
        <div class="tips">密码是8-16位字母和数字组合</div>
        <div class="confirm-button-wrapper">
          <x-button text="确定" mini style="background-color: #2d324f;color: #ffffff;" class="btn" :show-loading="btnLoading" @click.native="submitPassword"></x-button>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import { XInput, Group, XButton, AlertModule } from 'vux'
  import request from '@/utils/request'
  import {api_edit_password,api_get_userInfo} from '@/services/api'
  export default {
    name: 'change-password',
    data() {
      return {
        open: true,
        btnLoading: false,
        newPassword: '',
        oldPassword: '',
        user:''
      }
    },
    computed: {
      inputType() {
        if (this.open) {
          return 'text'
        } else {
          return 'password'
        }
      }
    },
    created(){
      request(api_get_userInfo).then((res) => {
        this.user = res.data
      })
    },
    methods: {
      touch(event){
           event.preventDefault();
      },
      toggleEyeOpen() {
        this.open = !this.open
      },
      submitPassword() {
        if (!this.oldPassword) {
          AlertModule.show({
            content: '旧密码不能为空'
          })
          return
        }else if (this.oldPassword!==this.user.password){
          AlertModule.show({
            content: '旧密码输入有误，请重新输入'
          })
          return 
        }
        if (!this.newPassword) {
          AlertModule.show({
            content: '新密码不能为空'
          })
          return
        }
        if (!!this.oldPassword && !!this.newPassword) {
          request(api_edit_password +`&password=${this.newPassword}&oldPassword=${this.user.password}`).then(res => {
            if (res.data) {
              let user = JSON.parse(localStorage.getItem('user'));
              user.password = this.newPassword;
              localStorage.setItem('user',JSON.stringify(user));
              AlertModule.show({
                content: res.data.msg
              })
            }
          })
        }
      }
    },
    components: {
      XInput,
      Group,
      XButton
    }
  }
</script>

<style scoped lang="less">
  .change-password {
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
        .password-show-type {
          height: 0.8rem
        }
      }
      .tips {
        margin-left: 0.56rem;
        height: 1rem;
        line-height: 1rem;
        color: #8d8d8d;
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
