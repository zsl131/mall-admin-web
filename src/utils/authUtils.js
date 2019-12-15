const LOGIN_USER_SESSION = "loginUser";
const NAV_MENU_SESSION = "navMenus";
const AUTH_MENU_SESSION = "authMenus";

const NO_NEED_AUTH = ["/admin/index"];

/** 登陆时调用该方法 */
export function setLoginUser(loginObj) {
  const loginUser = loginObj.user;
  const navMenus = loginObj.navMenus;
  const authMenus = loginObj.authMenus;
  //console.log(loginObj)
  sessionStorage.setItem(LOGIN_USER_SESSION, JSON.stringify(loginUser));
  sessionStorage.setItem(NAV_MENU_SESSION, JSON.stringify(navMenus));
  sessionStorage.setItem(AUTH_MENU_SESSION, JSON.stringify(authMenus));
}

export function getAuthMenus() {
  return JSON.parse(sessionStorage.getItem(AUTH_MENU_SESSION));
}

function getSessionValue(field) {
  const str = sessionStorage.getItem(field);
  if(str === null || str === '' || str === undefined) {return null;}
  else {return JSON.parse(str);}
}

/** 获取登陆用户 */
export function getLoginUser() {
  return getSessionValue(LOGIN_USER_SESSION);
}

/** 检测是否有用户登陆 */
export function checkLogin() {
  const loginUser = getLoginUser();
  if(loginUser!==null && loginUser!==undefined) {
    return true;
  }
  return false;
}

//不需要检测权限的，但需要登陆
const NO_NEED_CHECK = ["/admin/users/updatePwd"];

/** 通过url检测权限 */
export function checkAuthByUrl(pathname) {
  if(NO_NEED_CHECK.includes(pathname)) {return true;}
  let hasAuth = false;
  NO_NEED_AUTH.map((url) => {
    if(pathname === url) {hasAuth = true; }
    return url; //不加会有警告
  });
  if(hasAuth) {return hasAuth;}
  else {
    const authMenus = JSON.parse(sessionStorage.getItem(AUTH_MENU_SESSION));
    const navMenus = JSON.parse(sessionStorage.getItem(NAV_MENU_SESSION));

    navMenus.map((item) => {
      if (item.menu.href === pathname) {
        hasAuth = true;
      }
      if (!hasAuth) {
        item.children.map((menu) => {
          if (menu.href === pathname) {
            hasAuth = true;
          }

          return menu.id; //不加会有警告
        })
      }
      return item.id; //不加会有警告
    });

    if (!hasAuth) {
      authMenus.map((menu) => {
        if (menu.href === pathname) {
          hasAuth = true;
        }
        return menu.id; //不加会有警告
      })
    }
    return hasAuth;
  }
}
