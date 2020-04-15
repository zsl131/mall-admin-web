import { httpGet } from '@/utils/normalService';
import { message } from 'antd';

const baseService = "templateMessageRelationService";

export default {
  state: {
    configed: [],
    noConfig: [],
    item: {},
    configVisible: false,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *list({ payload: query }, { call, put }) {

      query.apiCode = baseService+".list";
      const data = yield call(httpGet, query);
      //console.log(data);
      yield put({ type:'modifyState', payload: {noConfig: data.noConfig || [], configed: data.configed || []}});
    },
    *config({payload: obj}, {call}) {
      obj.apiCode = baseService+".add";
      const data = yield call(httpGet, obj);
      //console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
    *deleteObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".delete";
      const data = yield call(httpGet, obj);
      //console.log(data);
      if(data) {
        message.success(data.message);
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen((location) => {
        if(location.pathname === "/admin/templateMessageRelation") {
          dispatch({type: "list", payload: location.query});
        }
      });
    }
  }
}
