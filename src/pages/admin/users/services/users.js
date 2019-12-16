import request from '../../../../utils/request';

function remoteUserList(query) {
  if(query===null || query === undefined) {query = {}};
  query.page = query.page?query.page:0;
  query.size = query.size?query.size:15;
  return request("userService.listUser", query, true);
}

function remoteSaveUser(user) {
  user.isAdmin = (user.isAdmin && user.isAdmin !== undefined)?"1":"0";
  user.status = (user.status || user.status === undefined)?'1':'0';
  return request("userService.saveUser", user, true);
}

function remoteDelete(id) {
  return request("userService.deleteUser", id, true);
}

function loadOne(id) {
  return request("userService.loadOne", id, true);
}

function matchRole(id) {
  return request("userService.matchRole", id, true);
}

function authRole(obj) {
  return request("userService.authRole", obj, true);
}

function updatePwd(obj) {
  return request("userService.updatePwd", obj, true);
}

export {
  remoteUserList,
  remoteSaveUser,
  remoteDelete,
  loadOne,
  matchRole,
  authRole,
  updatePwd
}
