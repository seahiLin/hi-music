<template>
  <div class="find-music">
    <nav>
      <ul>
        <li>
          <router-link to="recommend">
            <span>推荐</span>
          </router-link>
        </li>
        <li>
          <router-link to="ranklist">
            <span>排行榜</span>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <span>歌单</span>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <span>主播电台</span>
          </router-link>
        </li>
        <li>
          <router-link to="">
            <span>歌手</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
  @import './findMusic.less';
</style>

<script>
export default {
  name: 'FindMusic'
};
</script>
