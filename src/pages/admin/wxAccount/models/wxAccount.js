import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "wxAccountService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,

    relationVisible: false,
    type: '',
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
    *updateObj({payload: obj},{call}) {
      obj.apiCode = baseService+".update";
      const data = yield call(httpGet, obj);
      if(data) {message.success("保存成功");}
    },
    *updateType ({ payload: obj }, { call, put }) {
      obj.apiCode = baseService+".updateType";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/wxAccount') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
