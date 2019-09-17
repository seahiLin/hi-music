<template>
  <div class="play-list">
    <section class="play-list-detail-container">
      <div class="cover-image">
        <img :src="playlist.coverImgUrl" alt="cover image">
      </div>
      <div class="play-list-detail">
        <div class="name">
          <span>歌单</span>
          <p>{{playlist.name}}</p>
        </div>
        <div class="creator">
          <img :src="playlist.creator.avatarUrl" alt="creator's avatar image">
          <span class="creator-name">{{playlist.creator.nickname}}</span>
          <span class="create-time">{{formatUnixTime(playlist.createTime)}}创建</span>
          <span class="update-time">{{formatUnixTime(playlist.updateTime)}}更新</span>
        </div>
        <div class="tool-bar">
          <div class="play-function">
            <button class="play">
              <span class="iconfont icon-play">播放</span>
            </button>
            <button class="add-to-play">
              <span class="iconfont icon-add"></span>
            </button>
          </div>
          <button class="collect-play-list">
            <span class="iconfont icon-collect">{{formatToTenShousand(playlist.subscribedCount)}}</span>
          </button>
          <button class="share-play-list">
            <span class="iconfont icon-share">{{formatToTenShousand(playlist.shareCount)}}</span>
          </button>
          <button class="comment-play-list">
            <span class="iconfont icon-comment">{{formatToTenShousand(playlist.commentCount)}}</span>
          </button>
        </div>
        <div class="tag-collection">
          <span>标签：</span>
          <a v-for="(value, index) in playlist.tags" :key="index">
            <span class="tag">{{value}}</span>
          </a>
        </div>
        <div class="description">
          <button class="unfold-description"
            @click="unfoldDes">展开
          </button>
          <p>介绍：{{playlist.description}}</p>
        </div>
      </div>
    </section>
    <section class="song-sheet">
      <div class="message">
        <span class="title">歌曲列表</span>
        <span class="song-count">-{{playlist.trackCount}}首歌</span>
        <span class="play-count">播放：
          <span>{{playlist.playCount}}</span>次
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th><span></span></th>
            <th><span>歌曲标题</span></th>
            <th><span>时长</span></th>
            <th><span>歌手</span></th>
            <th><span>专辑</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(song, index) in playlist.tracks" :key="song.id">
            <td>
              <span>{{index + 1}}</span>
            </td>
            <td>
              <span>
                <span @click="setSongId(song.id)">{{song.name}}</span>
                <span v-if="song.alia.length !== 0">{{formatAlia(song.alia)}}</span>
              </span>
              <button class="mv" v-if="song.mv !== 0">mv</button>
            </td>
            <td><span>{{formatSongTime(song.dt)}}</span></td>
            <td><span>{{formatSinger(song.ar)}}</span></td>
            <td><span>{{song.al.name}}</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style lang="less">
  @import url('./playList.less');
</style>

<script>
import { getPlayListDetail } from '../../util/request.js';

export default {
  name: 'PlayList',
  data () {
    return {
      playlist: {
        creator: {},
        tracks: [],
        trackIds: []
      }
    };
  },
  methods: {
    formatUnixTime (time) {
      var nativeTime = new Date(time);
      var month = nativeTime.getMonth() + 1;
      var year = nativeTime.getFullYear();
      var date = nativeTime.getDate();
      return `${year}-${month}-${date}`;
    },
    unfoldDes () {
    },
    formatAlia (alia) {
      return alia;
    },
    formatSongTime (millisecond) {
      let minutes = millisecond / 60000;
      let integer = parseInt(minutes).toString();
      // 显示两位秒数，四舍五入
      let decimal = Math.round(minutes.toString().slice(minutes.toString().indexOf('.') + 1, minutes.toString().indexOf('.') + 3) * 0.6);
      if (decimal < 10) {
        decimal = '0' + decimal;
      }
      return `${integer}:${decimal}`;
    },
    formatSinger (singers) {
      let singerNames = '';
      for (let singer of singers) {
        if (!singerNames) {
          singerNames += singer.name;
        } else {
          singerNames += `/${singer.name}`;
        }
      }
      return singerNames;
    },
    formatToTenShousand (count) {
      if (!count) return;
      if (count < 10000) return count;
      let countStr = count.toString();
      return countStr.slice(0, -4) + '.' + countStr.slice(-4, -3) + '万';
    },
    setSongId (id) {
      this.$store.state.currentSongId = id;
    }
  },
  created () {
    let params = {
      id: this.$route.query.id
    };
    getPlayListDetail(params).then((data) => {
      this.playlist = data.playlist;
    });
  }
};
</script>
