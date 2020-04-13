import { httpGet } from '@/utils/normalService';
import { message } from 'antd';

const baseService = "ordersService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],

    expressVisible: false,
    express: {}, //发货信息
    companyList:[], //物流公司
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
    *onExpress({payload: obj}, {call,put}) {
      let query = {
        apiCode: 'ordersExpressService.onExpress',
        ordersNo: obj.ordersNo
      };
      // obj.apiCode = "ordersExpressService.onExpress";
      const data = yield call(httpGet, query);
      ////console.log(data);
      yield put({ type:'modifyState', payload: {item: obj, express: data.express, companyList: data.companyList, expressVisible: true} })
    },

    *express({payload: obj}, {call}) {
      obj.apiCode = "ordersExpressService.express";
      const data = yield call(httpGet, obj);
      if(data) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/orders') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
