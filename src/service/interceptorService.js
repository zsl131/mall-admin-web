import request from '../utils/request';

function loadWebBaseConfig() {
  return request("webInterceptorService.loadWebBase",{});
}

export {
  loadWebBaseConfig,
}
