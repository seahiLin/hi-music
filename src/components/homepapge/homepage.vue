<template>
  <div class="home-page">
    <div class="top-bar">
      <div class="left-bar">
        <span class="icon-img">
          <img src="../../assets/海象.png" alt="music-icon">
          <span>seahi</span>
        </span>
      </div>
      <div class="center-bar">
        <ul>
          <li>
            <router-link to="/findmusic">
              <span>发现音乐</span>
            </router-link>
          </li>
          <li>
            <router-link to="/mymusic">
              <span>我的音乐</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right-bar">
        <span class="search-icon"></span>
        <input type="text" class="search-input" placeholder="音乐/视频/电台/用户">
        <div class="login">
          <span>登录</span>
          <span class="triangle"></span>
          <div class="login-method">

          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <player />
  </div>
</template>

<style lang="less">
  @import './homepage';
</style>

<script>
import Player from '../player/player';

export default {
  name: 'Homepage',
  components: {
    Player
  }
};
</script>
