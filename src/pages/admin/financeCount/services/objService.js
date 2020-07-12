import request from '../../../../utils/request';

const baseService = "financeCountService";

function count(query) {
  return request(baseService+".count", query, true);
}

export {
  count,
}
