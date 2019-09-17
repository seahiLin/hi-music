<template>
  <div class="play-lists">
    <section class="play-list-item"
      v-for="item in playLists" :key="item.id"
      @click="handlePlayList(item.id)">
      <div class="main">
        <div class="mask">
          <div class="tool-bar">
            <span class="play-count iconfont icon-music">{{formatCount(item.playCount)}}</span>
            <a class="iconfont icon-play" href=""></a>
          </div>
        </div>
        <img :src="item.picUrl" :alt="item.copywriter">
      </div>
      <p class="name">{{item.name}}</p>
    </section>
  </div>
</template>

<style lang="less" scoped>
  @import './personalizedPlayLists.less';
</style>

<script>
import { getPersonalizedSongSheet } from '../../util/request';

export default {
  name: 'Songsheet',
  data () {
    return {
      playLists: []
    };
  },
  methods: {
    formatCount (count) {
      // 不足十万直接显示数量，否则显示以万为单位，不显示小数
      if (count < 100000) return count;
      return count.toString().slice(0, -4) + '万';
    },
    handlePlayList (id) {
      this.$router.push({
        name: 'playlist',
        query: {
          id
        }
      });
    }
  },
  created () {
    getPersonalizedSongSheet().then((data) => {
      this.playLists = data.result;
    });
  }
};
</script>
