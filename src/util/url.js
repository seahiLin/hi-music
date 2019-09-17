const baseUrl = 'http://127.0.0.1:3000';
// 登录

function formatUrl (path) {
  return (baseUrl + path);
}

const phoneLoginUrl = formatUrl('/login/cellphone');
const personalizedUrl = formatUrl('/personalized');
const playListUrl = formatUrl('/playlist/detail');
const songUrl = formatUrl('/song/url');
const songDetailUrl = formatUrl('/song/detail');

export {
  phoneLoginUrl,
  personalizedUrl,
  playListUrl,
  songUrl,
  songDetailUrl
};
