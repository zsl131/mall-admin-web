import request from '../../../utils/request';

const baseService = "baseAppConfigService";

function remoteLoad() {
  return request(baseService+".loadOne", {});
}

function initSystem(values) {
  return request(baseService + ".initSystem", values);
}

function checkInit(values) {
  return request(baseService + ".checkInit", values);
}

export {
  remoteLoad,
  initSystem,
  checkInit,
}
