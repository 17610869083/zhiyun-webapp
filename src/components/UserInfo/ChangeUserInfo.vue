<template>
  <div class="change-user-info" @touchmove="touch">
    <div class="top">&nbsp;</div>
    <group>  
      <Cell title="修改邮箱" link="/change-email" is-link></Cell>   
      <Cell title="修改密码" link="/change-password" is-link></Cell>   
      <Cell title="修改电话" link="/change-telephone" is-link></Cell>   
      <Cell title="修改头像" link="/change-avatar" is-link></Cell>   
    </group>
  </div>
</template>
<script type="text/ecmascript-6">
  import { XInput, Group,Cell } from 'vux'
  export default {
    name: 'change-user-info', 
    components: {
      XInput,
      Group,
      Cell
    },
    methods:{
      touch(event){
           event.preventDefault();
      }
    }
  }
</script>
<style scoped lang="less">
  .change-user-info {
    background-color: #e6e6e6;
    height: 100%;
    padding-top:0.2rem;
    .top {
      height: 0;
    }
    .img-wrapper {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
