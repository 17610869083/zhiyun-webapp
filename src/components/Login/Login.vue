<template>
  <div class="login">
    <div class="logo-wrapper">
      <!-- <img src="./webwxgetmsgimg.jpg" alt="logo" height="80"> -->
    </div>
    <div class="login-box">
      <form  class="form">
        <div class="username-wrapper vux-1px-b">
          <input type="text" name="username" id="username" v-model.trim="username" placeholder="请输入账号"/>
        </div>
        <div class="password-wrapper vux-1px-b">
          <input type="password" name="password" id="password" v-model.trim="password" placeholder="请输入密码"/>
        </div>
        <div class="btn"  @click="submitForm">
         登录
        </div>
      </form>
    </div>
    <div>
      <loading :show="this.showLoading" text="正在加载..."></loading>
      <alert v-model="showUsernameError" title="用户名不能为空！" content="用户名不能为空！"></alert>
      <alert v-model="showPasswordError" title="密码不能为空！" content="密码不能为空！"></alert>
      <alert v-model="showOtherError" :title="this.otherMsg" :content="this.otherMsg"></alert>
    </div>
    <!-- <a href="" class="apply">申请使用</a> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import { Alert, Loading } from 'vux'
  import request from '@/utils/request'
  import {baseHost} from '@/services/api'
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: '',
        showUsernameError: false,
        showPasswordError: false,
        showOtherError: false,
        otherMsg: '',
        showLoading: false
      }
    },
    created(){
        const state=JSON.parse(localStorage.getItem('user'))
        if(state.user){
          request(`${baseHost}common/login/loginDo?action=login2&username=${state.user}&password=${state.password}`)
          .then(res => {
             if(res.data.code === 1){
                this.$router.push('/home')
             }
          })
          
        }
    },
    methods: {
      async submitForm() {
        this.showLoading = true
        if (!this.username) {
          this.showUsernameError = true
          this.showLoading = false
          return 0
        }
        if (!this.password) {
          this.showPasswordError = true
          this.showLoading = false
          return 0
        }
        const res = await request(`${baseHost}common/login/loginDo?action=login2&username=${this.username}&password=${this.password}`)
        if (res.data.code === 1) {
          this.showLoading = false
          this.$router.push('/home')
          localStorage.setItem('user',JSON.stringify({user:this.username,password:this.password}))
          return 0
        } else {
          this.otherMsg = res.data.msg
          this.showOtherError = true
          this.showLoading = false
        }
      }
    },
    components: {
      Alert,
      Loading
    }
  }
</script>

<style scoped lang="less">
  .login {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("./back.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 0.3rem;
    .logo-wrapper {
      margin-top: 1.2rem;
      display: flex;
      justify-content: center;
    }
    .login-box {
      margin-top: 3rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      background: #ffffff;
      border-top-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
      .form {
        width: 100%;
        padding-top: 0.4rem;
        label {
          color: #cccccc;
          font-size: 16px;
        }
        input {
          display: block;
          width: 100%;
          border: none;
          height: 34px;
          line-height: 34px;
          font-size: 14px;
        }
        .username-wrapper {
          width: 80%;
          margin: 0 auto;
        }
        .password-wrapper {
          width: 80%;
          margin: 0 auto;
          margin-top: 0.34rem;
        }
        .btn {
          margin-top: 0.54rem;
          width: 100%;
          height: 0.8rem;
          line-height: 0.8rem;
          font-size: 0.3rem;
          background-color: #2d324f;
          color: #ffffff;
          border: none;
          text-align: center;
        }
      }
    }
    .apply {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: #2d324f;
    }
  }
</style>
