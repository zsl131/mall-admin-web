import request from '@/utils/request';

const baseService = "adminUserService";
function login(values) {
  return request(baseService+".login", values, true);
}

export {
  login
}
