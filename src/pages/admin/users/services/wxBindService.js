import request from "../../../../utils/request";

const wxLoginService = "wxLoginService";

function buildQr4Bind(query) {
  return request(wxLoginService+".buildQr4Bind", query, true);
}

function wxBindCheck(obj) {
  return request(wxLoginService+".wxBindCheck", obj, true);
}

export {
  buildQr4Bind,
  wxBindCheck,
}
