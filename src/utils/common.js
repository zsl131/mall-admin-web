/**
 * 生成CopyRight日期
 */
function buildCopyYear() {
  const date = new Date();
  const curYear = date.getFullYear();
  return "© "+curYear + "-" + (curYear+2);
}

export default {
  buildCopyYear
}
