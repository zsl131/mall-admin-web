import configApi from './configApi';

export function setLoginAccount(loginAccountStr) {
  localStorage.setItem(configApi.accountSessionName, loginAccountStr);
}

export function getLoginAccount() {
  return localStorage.getItem(configApi.accountSessionName);
}

export function getLoginAccount2Obj() {
  const str = getLoginAccount();
  if(str) {
    return JSON.parse(str);
  } else {return null;}
}

export function getOpenid() {
  try {
    const loginAccount = getLoginAccount2Obj();
    return loginAccount.openid;
  } catch (e) {
    return '';
  }
}
