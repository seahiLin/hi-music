export function get (url, params) {
  let query = '';
  if (params) {
    Object.keys(params).forEach((key) => {
      // 如果值未定义，填空值
      let value = params[key] !== undefined ? params[key] : '';
      query += `&${key}=${value}`;
    });
    // 清除首个&
    if (query.indexOf('&') === 0) {
      query = query.substring(1);
    }
    // url里未包含?符号时添加
    if (url.indexOf('?') < 0) {
      url += '?';
    }
  }
  return fetch(`${url}${query}`);
}
