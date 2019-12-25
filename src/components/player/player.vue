<template>
  <div class="player" :class="!!currentSongUrl ? 'active' : ''">
    <audio :src="currentSongUrl" autoplay ref="audio"></audio>
    <div class="controlers" :class="{'scroll-to-view' : currentSongUrl}">
      <span class="iconfont" @click="changePlayStatus" :class="playBtn"></span>
      <span class="iconfont icon-pre pre-song"></span>
      <span class="iconfont icon-nxt nxt-song"></span>
    </div>
    <div class="scroll" :class="{'scroll-to-view' : currentSongUrl}">
      <div class="song-detail">
        <img :src="songDetail.img" alt="专辑封面" class="song-img">
        <div class="content">
          <span class="songname">{{songDetail.name}}</span>
          <span class="album" v-if="!!songDetail.album">({{songDetail.album}})</span>
          <span class="mv" v-if="!!songDetail.mv">mv</span>
          <span class="singer">{{songDetail.singers}}</span>
        </div>
        <div class="progress">
          <input type="range" ref="progress"
            @input="changeTime"
            class="iconfont"
            :class="waiting ? 'waiting' : ''"
            min="0" :value="currentTime" :max="duration">
          <span class="progress-rate">{{progressRate}}</span>
        </div>
      </div>
      <div class="function">
        <span class="iconfont icon-collect"></span>
        <span class="iconfont icon-share"></span>
        <span class="volume"></span>
        <span class="play-mode"></span>
        <span class="playlist"></span>
      </div>
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
      audio: {},
      paused: true,
      waiting: false,
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
    }),
    progressRate () {
      return `${this.formatTime(this.currentTime, 'ceil')} / ${this.formatTime(this.duration, 'ceil')}`;
    },
    progress () {
      if (this.currentTime && this.duration) {
        return Math.ceil(this.currentTime / this.duration * 100);
      }
    },
    playBtn () {
      return this.paused ? 'icon-play' : (this.waiting ? 'icon-loading' : 'icon-pause');
    }
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
      } else if (mode === 'ceil') {
        decimal = Math.ceil(minutes.toString().slice(minutes.toString().indexOf('.') + 1, minutes.toString().indexOf('.') + 3) * 0.6);
      }
      if (decimal < 10) {
        decimal = '0' + decimal;
      }
      return `${integer}:${decimal}`;
    },
    addAudioListeners () {
      this.audio = this.$refs.audio;
      this.audio.addEventListener('canplay', () => {
        this.duration = this.audio.duration;
      });
      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = this.audio.currentTime;
      });
      this.audio.addEventListener('ended', () => {
        this.paused = true;
        this.waiting = false;
      });
      this.audio.addEventListener('waiting', () => {
        this.waiting = true;
      });
      this.audio.addEventListener('playing', () => {
        this.waiting = false;
      });
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
    changeTime (e) {
      let progress = e.target.value;
      this.audio.currentTime = progress;
      this.audio.play();
      this.paused = false;
    },
    changePlayStatus () {
      this.paused = !this.paused;
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
        this.paused = false;
      }
    },
    paused (newValue) {
      if (newValue === true) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
    },
    progress (newValue) {
      let progress = newValue + '%';
      this.$refs.progress.setAttribute('style', 'background-size: ' + progress + ' 100%');
    }
  },
  mounted () {
    this.addAudioListeners();
  }
};
</script>
