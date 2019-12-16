const APP_CONFIG_SESSION_NAME = "appConfig";

export function setAppConfig(appConfigStr) {
  sessionStorage.setItem(APP_CONFIG_SESSION_NAME, appConfigStr);
}

export function getAppConfig() {
  return sessionStorage.getItem(APP_CONFIG_SESSION_NAME);
}

export function getAppConfigObj() {
  const str = getAppConfig();
  if(str==null || str==="") {return {};}
  try {
    return JSON.parse(str);
  } catch (e) {
    console.log(e);
    return {};
  }
}
