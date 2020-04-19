import { httpGet } from '@/utils/normalService';
import { message } from 'antd';

const baseService = "ordersAfterSaleService";
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
    *handleExc({payload: obj}, {call}) {
      obj.apiCode = baseService+".handleExp";
      const data = yield call(httpGet, obj);
      if(data) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/ordersAfterSale') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
