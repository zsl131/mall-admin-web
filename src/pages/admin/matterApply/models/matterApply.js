import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "matterApplyService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({ payload: query }, { call, put }) {
      query.apiCode = baseService+".list";
      const data = yield call(httpGet, query);
      //console.log(data);
      yield put({ type:'modifyState', payload: {totalElements: data.size, datas: data.datas} });
    },

    *modifyStatus({payload: obj}, {call}) {
      obj.apiCode = baseService+".modifyStatus";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/matterApply') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
