import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "couponRuleService";
const couponService = "couponService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,
    couponList: [],
    couponIds: [],
    tempIds: [],
    settingVisible: false,
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
    *addObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".add";
      const data = yield call(httpGet, obj);
      if(data) {message.success("保存成功");}
    },
    *updateObj({payload: obj},{call}) {
      obj.apiCode = baseService+".update";
      const data = yield call(httpGet, obj);
      if(data) {message.success("保存成功");}
    },
    *deleteObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".delete";
      const data = yield call(httpGet, obj);
      if(data) {message.info(data.message);}
    },

    *modifyStatus({payload: obj}, {call}) {
      obj.apiCode = baseService+".modifyStatus";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
    *initOrderNo({payload: obj}, {call}) {
      obj.apiCode = baseService+".initOrderNo";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },

    *settingDetail({payload: obj}, {call, put}) {
      obj.apiCode = couponService+".queryCoupon";
      const data = yield call(httpGet, obj);
      if(data) {
        yield put({ type:'modifyState', payload: {item: obj, couponIds: data.couponIds, couponList: data.couponList, settingVisible: true} });
      }
    },
    *authCoupon({payload: obj}, {call}) {
      obj.apiCode = couponService+".authCoupon";
      const data = yield call(httpGet, obj);
      if(data) {
        message.success(data.message);
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/couponRule') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
