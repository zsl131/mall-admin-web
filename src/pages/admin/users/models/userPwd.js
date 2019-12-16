import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "adminUserService";
export default {
  namespace: 'userPwd',
  state: {
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *updatePwd({ payload: values }, { call }) {
      values.apiCode = baseService+".updatePwd";
      const data = yield call(httpGet, values);
      console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {

  }
}
