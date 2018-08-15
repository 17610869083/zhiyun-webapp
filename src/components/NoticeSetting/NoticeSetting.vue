<template>
  <div class="notice-setting">
    <group>
      <x-switch title="通知" v-model="isNotice" width="10"></x-switch>
      <!--<cell title="推送方式"></cell>-->
      <cell title="邮件推送" class="emali-cell">
        <cell class="text" v-if="!isNotice"></cell>
        <check-icon :value.sync="isPushWarning">推送预警</check-icon>
        <check-icon :value.sync="isPushNegative">推送负面</check-icon>
      </cell>
      <x-input title="邮箱" v-for="(item,index) in emailAddressList"
       :key="index" :show-clear="false" placeholder="请输入邮箱地址"
       :value.sync="item.email"
       :data-id="item.id"
       class="input-email"
       name="email">
        <div v-if="index!==emailAddressList.length-1" slot="right" @click="isNotice?deleteEmail(index, item.id):dosomething">
          <icon-svg type="icon-ios-minus" color="#2D324F" size="24"></icon-svg>
        </div>
        <div v-else slot="right" @click="isNotice?addEmail():dosomething">
          <icon-svg type="icon-ios-plus" color="#2D324F" size="24"></icon-svg>
        </div>
      </x-input>
      <datetime v-model="startTime" title="开始时间" format="HH:mm" :readonly="isNotice?false:true"></datetime>
      <datetime v-model="endTime" title="结束时间" format="HH:mm" :readonly="isNotice?false:true"></datetime>
      <selector ref="defaultValueRef" title="推送频次" :options="list" v-model="frequency" :readonly="isNotice?false:true"></selector>
      <x-switch title="周末推送" v-model="isWeekendPush" :disabled="isNotice?false:true"></x-switch>
    </group>
    <div class="submit-wrapper">
      <x-button :gradients="['#2D324F','#2D324F']" class="submit-btn" @click.native="submit">提交</x-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Cell, CellBox, Group, XSwitch, CheckIcon, XInput, Datetime, Checker, CheckerItem, Selector, XButton } from 'vux'
  import IconSvg from '@/base/IconSvg/IconSvg'
  import request from '@/utils/request'
  import {api_show_emailConfig,api_remove_emailConfig,api_save_emailConfig} from '@/services/api'
  export default {
    name: 'notice-setting',
    data() {
      return {
        isNotice: false,
        isWeekendPush: true,
        isPushWarning: true,
        isPushNegative: true,
        emailAddressList: [{email:''}],
        value: '',
        startTime: '00:00',
        endTime: '23:59',
        checkBox: '1',
        frequency: '0',
        list: [{key: 0, value: '实时推送'},
          {key: 5, value: '5分钟推送'},
          {key: 10, value: '10分钟推送'}
        ]
      }
    },
    created() {
      this._showConfig()
    },
    methods: {
      _showConfig() {
        request(api_show_emailConfig).then(res => {
          // 邮箱地址列表
          if(res.data.emailAddressList.length!==0){
            this.emailAddressList = res.data.emailAddressList
          }
          this.emailConfig = res.data.emailConfig
          // 是否推送
          this.isNotice = (res.data.emailConfig.pushState === '1')
          // 推送预警
          this.isPushWarning = (res.data.emailConfig.warning === '1')
          // 推送负面
          this.isPushNegative = (res.data.emailConfig.negative === '1')
          // 开始时间
          this.startTime = res.data.emailConfig.startEveryDay
          // 结束时间
          this.endTime = res.data.emailConfig.endEveryDay
          // 推送频次
          this.frequency = res.data.emailConfig.frequency
          // 周末推送
          this.isWeekendPush = (res.data.emailConfig.weekendOpen === '1')
          this.id = res.data.emailConfig.id
          this.userId = res.data.emailConfig.userId
        })
      },
      addEmail() {
        this.emailAddressList.push({email: ''})
      },
      async deleteEmail(index, id) {
        let list =this._checkEmail();
        list.splice(index, 1)
        this.emailAddressList=list
        if (id) {
          await request(api_remove_emailConfig + `&id=${id}`)
        }
      },
      _checkEmail() {
        const emalilInput = document.getElementsByClassName('input-email')
        const p = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
        const emailArray = []
        Array.from(emalilInput).forEach((item) => {
          let id = item.dataset.id
          let emailAddr = item.getElementsByClassName('weui-input')[0]
          if(emailAddr.value && p .test(emailAddr.value)) {
            emailArray.push({email: emailAddr.value, id: id})
          }
        })
        return emailArray
      },
      submit() {
        const emailConfig = {
          endEveryDay: this.endTime,
          frequency: this.frequency,
          id: this.id,
          negative: this.isPushNegative ? '1' : '0',
          pushState: this.isNotice ? '1' : '0',
          startEveryDay: this.startTime,
          userId: this.userId,
          warning: this.isPushWarning ? '1' : '0',
          weekendOpen: this.isWeekendPush ? '1' : '0'
        }
        const emailAddressList = this._checkEmail()
        const url = `${api_save_emailConfig}&emailConfig=${JSON.stringify(emailConfig)}&emailAddressList=${JSON.stringify(emailAddressList)}`
        request(url).then(res => {
            if(res.data){
                this.$vux.alert.show({
                     title:res.data.message
                })
            }
        })
      },
      dosomething(){

      }
    },
    components: {
      IconSvg,
      Cell,
      CellBox,
      Group,
      XSwitch,
      CheckIcon,
      XInput,
      Datetime,
      Checker,
      CheckerItem,
      Selector,
      XButton
    }
  }
</script>

<style scoped lang="less">
.notice-setting {
   background: #ffffff;
   min-height:100%;
   .emali-cell{
       position: relative;
       .text{
         position: absolute;
         z-index:50;
         top:0;
         left:0;
         width: 100%;
         height: 100%;
       }
   }
  .time {
    width: 100px;
  }
  .submit-wrapper {
    .submit-btn {
      margin-top: 0.3rem;
      width: 50%;
    }
  }
}
</style>
