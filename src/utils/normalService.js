import request from '@/utils/request';

function httpGet(apiCode, values) {
  return request(apiCode, values, true);
}

export {
  httpGet
}
