/**
 * 生成CopyRight日期
 */
function buildCopyYear() {
  const date = new Date();
  const curYear = date.getFullYear();
  return "© "+curYear + "-" + (curYear+2);
}

/**
 * 退出登陆
 *  - 手动点击时需要使用
 *  - 当服务端提示登陆失效时需要调用
 */
function logout() {
  sessionStorage.clear();
  localStorage.clear();
}

export {
  buildCopyYear,
  logout
}
