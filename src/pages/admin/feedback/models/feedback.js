import {message} from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "feedbackService";
export default {
  state: {
    datas: [],
    totalElements: 0,
    item:{},
    replyVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *index({ payload: query }, { call, put }) {
      query.apiCode = baseService+".list";
      // const data = yield call(feedbackService.list, query);
      const data = yield call(httpGet, query);
      yield put({ type: 'modifyState', payload: { datas: data.datas, totalElements: data.size } });
    },
    *setStatus({payload: record}, { call }) {
      const status = record.status === '1'?'0':'1';
      const obj = {apiCode: baseService+".updateStatus", id: record.id, status: status};
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
    *onReply({payload: values}, { call }) {
      values.apiCode = baseService+".reply";
      const data = yield call(httpGet, values);
      // const data = yield call(feedbackService.reply, values);
      if(data) {
        message.success("回复成功");
      }
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === "/admin/feedback") {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
