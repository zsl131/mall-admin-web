import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "adminBaseTaskService";
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
    *stopTask({payload}, {call}) {
      payload.apiCode = baseService+".stopRun";
      const data = yield call(httpGet, payload);
      if(data) {
        message.success(data.message);
      }
    },
    *startTask({payload},{call}) {
      payload.apiCode = baseService+".start";
      const data = yield call(httpGet, payload);
      if(data) {
        message.success(data.message);
      }
    },
    *addBaseTask({payload: obj}, {call, put}) {
      obj.apiCode = baseService+".add";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
      yield put({ type:'modifyState', payload: {addVisible: false} });
    },
    *updateBaseTask({payload: obj}, {call}) {
      obj.apiCode = baseService + ".update";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
    *deleteObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".delete";
      const data = yield call(httpGet, obj);
      if(data) {message.info(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/basic/baseTask') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
