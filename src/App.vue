<template>
  <div id="app">
    <LoginPage />
    <homepage />
  </div>
</template>

<script>
import LoginPage from './components/login/login.vue';
import Homepage from './components/homepapge/homepage.vue';

export default {
  name: 'app',
  data () {
    return {
    };
  },
  components: {
    LoginPage,
    Homepage
  }
};
</script>

<style lang="less">
  @import url(//at.alicdn.com/t/font_1401825_sanrc60022.css);

  #app {
    background-color: #f5f5f5;

    *::selection {
      background-color: #d76ba0;
      color: #fff;
    }
  }
</style>>
