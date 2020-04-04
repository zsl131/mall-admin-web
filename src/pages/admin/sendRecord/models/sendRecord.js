import { httpGet } from '@/utils/normalService';

const baseService = "sendRecordService";
export default {
  state: {
    datas:[],
    totalElements:0,
    surplus:0
  },
  reducers: {
    modifyState(state, { payload: options }) {
      // console.log("listRole", datas);
      return {...state, ...options};
    },
  },
  effects: {
    *listObj({ payload: query }, { call, put }) {
      // console.log("listObj:::", query);
      query.apiCode = baseService+".list";
      const data = yield call(httpGet, query);
      // const data = yield call(objService.list, query);
      yield put({ type:'modifyState', payload: {totalElements: data.size, datas: data.data, surplus: data.surplus} });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/sendRecord') {
          dispatch({ type: 'listObj', payload: location.query });
        }
      })
    }
  }
}
