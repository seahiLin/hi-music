<template>
  <div class="player" :class="!!currentSongUrl ? 'active' : ''">
    <audio :src="currentSongUrl" autoplay ref="audio"></audio>
    <div class="controlers">
      <span class="iconfont" :class="paused ? 'icon-play' : 'icon-pause'"></span>
      <span class="iconfont icon-pre pre-song"></span>
      <span class="iconfont icon-nxt nxt-song"></span>
    </div>
    <div class="song-detail" v-if="!!this.currentSongUrl">
      <img :src="songDetail.img" alt="专辑封面" class="song-img">
      <div class="content">
        <span class="songname">{{songDetail.name}}</span>
        <span class="album" v-if="!!songDetail.album">({{songDetail.album}})</span>
        <span class="mv" v-if="!!songDetail.mv">mv</span>
        <span class="singer">{{songDetail.singers}}</span>
      </div>
      <div class="progress">
        <input type="range" min="0" :max="duration">
        <span class="progress-rate">{{progressRate()}}</span>
      </div>
    </div>
    <div class="song-function">
      <span class="iconfont icon-collect"></span>
      <span class="iconfont icon-share"></span>
    </div>
    <div class="player-function">
      <span class="volume"></span>
      <span class="play-mode"></span>
      <span class="playlist"></span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import './player';
</style>

<script>
import { mapState } from 'vuex';
import { getSongUrl, getSongDetail } from '../../util/request';

export default {
  name: 'Player',
  data () {
    return {
      paused: true,
      currentSongUrl: '',
      // 音频时长（以秒记）
      duration: 0,
      // 音频当前播放位置
      currentTime: 0,
      // 音频已缓冲部分
      buffered: 0,
      // 是否在结束时重新播放
      loop: false,
      songDetail: {
        img: '',
        name: '',
        mv: 0,
        singers: '',
        album: ''
      }
    };
  },
  computed: {
    ...mapState({
      currentSongId: 'currentSongId'
    })
  },
  methods: {
    formatTime (second, mode) {
      let minutes = second / 60;
      let integer = parseInt(minutes).toString();
      let decimal;
      // 根据传参决定是四舍五入还是向下舍入
      if (mode === 'round') {
        decimal = Math.round(minutes.toString().slice(minutes.toString().indexOf('.') + 1, minutes.toString().indexOf('.') + 3) * 0.6);
      } else if (mode === 'floor') {
        decimal = Math.floor(minutes.toString().slice(minutes.toString().indexOf('.') + 1, minutes.toString().indexOf('.') + 3) * 0.6);
      }
      if (decimal < 10) {
        decimal = '0' + decimal;
      }
      return `${integer}:${decimal}`;
    },
    addListeners () {
      let audio = this.$refs.audio;
      audio.addEventListener('canplay', () => {
        this.duration = audio.duration;
      });
      audio.addEventListener('timeupdate', () => {
        this.currentTime = audio.currentTime;
      });
    },
    progressRate () {
      return `${this.formatTime(this.currentTime, 'floor')} / ${this.formatTime(this.duration, 'round')}`;
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
    }
  },
  watch: {
    currentSongId (newValue) {
      if (newValue) {
        let songParams = {
          id: newValue
        };
        let songDetailParams = {
          ids: newValue
        };
        getSongUrl(songParams).then((res) => {
          this.currentSongUrl = res.data[0].url;
        });
        getSongDetail(songDetailParams).then((res) => {
          this.songDetail.mv = res.songs[0].mv;
          this.songDetail.name = res.songs[0].name;
          this.songDetail.singers = this.formatSinger(res.songs[0].ar);
          this.songDetail.album = res.songs[0].al.name;
          this.songDetail.img = res.songs[0].al.picUrl;
        });
      }
    }
  },
  mounted () {
    this.addListeners();
  }
};
</script>
