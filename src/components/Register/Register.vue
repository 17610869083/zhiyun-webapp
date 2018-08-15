<template>
  <div class="register">
    <div class="logo-wrapper">
      <img src="http://p4nbsa4s3.bkt.clouddn.com/blue-logo.png" alt="logo" class="logo" width="60" height="60">
    </div>
    <div class="form-wrapper">
      <form action="#" class="form">
        <input type="text" name="username" placeholder="请输入姓名" class="input">
        <input type="text" name="username" placeholder="请输入公司名称" class="input">
        <input type="text" name="username" placeholder="请输入手机号" class="input">
        <input type="submit" value="申请试用" class="submit">
      </form>
    </div>
  </div>
</template>

<script>
	export default {
	  name: 'register'
	}
</script>

<style scoped lang="less">
  .register {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("http://p4nbsa4s3.bkt.clouddn.com/bg2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 0.3rem;
    .logo-wrapper {
      margin-top: 1.6rem;
      display: flex;
      justify-content: center;
    }
    .form-wrapper {
      margin-top: 2rem;
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      background-color: #ffffff;
      border-radius: 0.1rem;
      .form {
        width: 90%;
        padding-top: 0.5rem;
        margin-left: auto;
        margin-right: auto;
        .input {
          display: block;
          box-sizing: border-box;
          height: 40px;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.42857143;
          color: #555;
          background-color: #fff;
          background-image: none;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-top: 0.14rem;
          width: 100%;
        }
        .submit {
          width: 100%;
          box-sizing: border-box;
          margin: 0.3rem 0;
          display: inline-block;
          height: 44px;
          padding: 6px 12px;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.42857143;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          touch-action: manipulation;
          cursor: pointer;
          user-select: none;
          border: 1px solid transparent;
          border-radius: 4px;
          background-color: #4cd964;
          color: #ffffff;
        }
      }
    }
  }
</style>
