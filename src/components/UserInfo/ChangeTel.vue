<template>
  <div class="change-email" @touchmove="touch">
    <div class="blank-box"></div>
    <div class="box-wrapper">
      <div class="box vux-1px-b">
        <x-input title="新电话" placeholder="请输入电话号码"  required v-model="tel"></x-input>
      </div>
      <!--<div class="box vux-1px-b">-->
        <!--<x-input title="获取短信验证码" placeholder="验证码" type="email" is-type="email" required v-model="email"></x-input>-->
      <!--</div>-->
      <div class="confirm-button-wrapper">
        <x-button text="确定" mini style="background-color: #2d324f;color: #ffffff;" class="btn" :show-loading="btnLoading" @click.native="submitTel"></x-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { XInput, XButton, AlertModule } from 'vux'
  import request from '@/utils/request'
  import {api_edit_telephone} from '@/services/api'
  export default {
    name: 'change-tel',
    data() {
      return {
        btnLoading: false,
        tel: ''
      }
    },
    methods: {
      touch(event){
           event.preventDefault();
      },
      async submitTel() {
        if (this.tel) {
          const reg = /^[1][0-9]{10}$/
          if (reg.test(this.tel)) {
            const res = await request(`${api_edit_telephone}&tel=${this.tel}`)
            this.$vux.alert.show({
              content: res.data.msg
            })
          } else {
            this.$vux.alert.show({
              content: '请输入11位手机号码'
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
    padding-top: 0.2rem;
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
