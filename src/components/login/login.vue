<template>
  <div class="login-page">
      <input type="number" id="phoneNum" v-model="phoneNumber">
      <label for="phoneNum">手机号码</label>
      <input type="text" id="password" v-model="password">
      <label for="password">密码</label>
      <button @click="loginWithPhone">登录</button>
  </div>
</template>

<script>
import { loginPhone } from '../../util/request';
export default {
  name: 'login',
  data () {
    return {
      phoneNumber: '',
      password: ''
    };
  },
  methods: {
    loginWithPhone () {
      let params = {
        phone: this.phoneNumber,
        password: this.password
      };
      loginPhone(params)
        .then((data) => {
          console.log(data);
        });
    }
  },
  mounted () {
  }
};
</script>

<style lang="less">
  @import './login.less';
</style>
