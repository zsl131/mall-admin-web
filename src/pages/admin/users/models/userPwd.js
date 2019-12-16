import { updatePwd } from '../services/users';
import { message } from 'antd';

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
      const data = yield call(updatePwd, values);
      // console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {

  }
}
