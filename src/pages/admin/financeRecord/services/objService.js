import request from '../../../../utils/request';

const baseService = "financeRecordService";

function list(query) {
  return request(baseService+".list", query, true);
}

function save(obj) {
  return request(baseService+".save", obj, true);
}

function loadOne(id) {
  return request(baseService+".loadOne", id, true);
}

function updateStatus(obj) {
  return request(baseService+".updateStatus", obj, true);
}

export {
  list,
  loadOne,
  save,
  updateStatus,
}
