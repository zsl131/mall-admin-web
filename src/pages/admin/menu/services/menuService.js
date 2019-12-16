import request from '../../../../utils/request';

function listRoot(query) {
  return request("menuService.listRoot", JSON.stringify(query), true);
}

function listChildren(pid) {
  return request("menuService.listChildren", JSON.stringify(pid), true);
}

function update(obj) {
  return request("menuService.update", JSON.stringify(obj), true);
}

function init() {
  return request("menuService.init", JSON.stringify({}), true);
}

function deleteMenu(id) {
  return request("menuService.delete", JSON.stringify(id), true);
}

export {
  listRoot,
  listChildren,
  update,
  init,
  deleteMenu,
}
