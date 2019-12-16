import request from "../../../../utils/request";
import {getLoginUser} from "../../../../utils/authUtils";

const serviceName = "smsService";
function sendCode(query) {
  return request(serviceName+".sendCode", query, true);
}
function bindPhone(obj) {
  const loginUser = getLoginUser();
  obj.username = loginUser.username;
  // console.log(obj, loginUser);
  return request(serviceName+".bindPhoneByUsername", obj, true);
}
export  {
  sendCode,
  bindPhone,
}
