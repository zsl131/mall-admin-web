import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "moduleService";
export default {
  state: {
    data:[],
    totalElements: 0,
    item:[],
    addVisible: false,
    updateVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      query.apiCode = baseService+".list";
      const data = yield call(httpGet, query);
      // const data = yield call(objService.list, query);
      yield put({ type: 'modifyState', payload: {data: data.data, totalElements: data.size} });
    },
    *addOrUpdate({payload: obj}, {call}) {
      obj.apiCode = baseService+".addOrUpdate";
      // yield call(objService.addOrUpdate, obj);
      yield call(httpGet, obj);
    },
    *deleteObj({ payload: id }, { call }) {
      let query = {id};
      query.apiCode = baseService+".delete";
      // const data = yield call(objService.deleteObj, { id });
      const data = yield call(httpGet, query);
      if(data) {message.success(data.message);}
    },
    *reSubmit({payload: id}, {call}) {
      let query = {id};
      query.apiCode = baseService+".send";
      // const data = yield call(objService.reSubmit, {id});
      const data = yield call(httpGet, query);
      if(data) {message.success(data.message);}
    },
    *onSynch({payload: obj}, {call}) {
      const query = {apiCode: baseService+".synch"};
      // const data = yield call(objService.synch, {});
      const data = yield call(httpGet, query);
      if(data) {message.success(data.message);}
    },
    *onUpdate({payload: id}, {call,put}) {
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/module') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
