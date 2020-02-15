import { httpGet } from '@/utils/normalService';

const baseService = "searchRecordService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
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
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/searchRecord') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
