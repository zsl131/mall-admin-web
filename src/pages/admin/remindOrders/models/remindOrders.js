import { httpGet } from '@/utils/normalService';

const baseService = "remindOrdersService";
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
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/remindOrders') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
