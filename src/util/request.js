import {get} from './get';

import {
  phoneLoginUrl,
  personalizedUrl,
  playListUrl,
  songUrl,
  songDetailUrl
} from './url';

// 将fetch返回的promise中的json data提取出来，并返回resolved promise进行链式调用
function formatToJson (res) {
  return Promise.resolve(res.json());
}

// 请求公用方法提取
function commonRequest (url, params) {
  return get(url, params).then((res) => {
    return formatToJson(res);
  });
}

// 手机号登录
function loginPhone (params) {
  return commonRequest(phoneLoginUrl, params);
}

// 获取推荐歌单列表
function getPersonalizedSongSheet () {
  return commonRequest(personalizedUrl);
}

// 获取歌单内容信息
function getPlayListDetail (params) {
  return commonRequest(playListUrl, params);
}

// 获取音乐url
function getSongUrl (params) {
  return commonRequest(songUrl, params);
}

function getSongDetail (params) {
  return commonRequest(songDetailUrl, params);
}

export {
  loginPhone,
  getPersonalizedSongSheet,
  getPlayListDetail,
  getSongUrl,
  getSongDetail
};
