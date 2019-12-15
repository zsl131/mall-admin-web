import request from "../../../../utils/request";

const baseService = "adminIndexService";
function findNoConfigTemplateMessage(query) {
  return request(baseService+".noConfig", query);
}

export {
  findNoConfigTemplateMessage,
}
