import * as initService from '../service/initService';
import router from 'umi/router';
import { message } from 'antd';
export default {
  namespace: 'init',
  state: {
    spinVisible: true
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *check({payload}, {put,call}) {
      const data = yield call(initService.checkInit, {});
      //console.log(data);
      if(data.res) { //如果已经初始化，则跳转
        message.info("系统已经初始化，不可再次初始化", 3, ()=> {
          router.push("/login");
        });
      } else {
        yield put({type: "modifyState", payload: {spinVisible: false}});
      }
      //yield put({type: "modifyState", payload: {spinVisible: false}});
    },
    /**load({payload}, { put, call }) {
      const data = yield call(initService.remoteLoad);
      if(data.size===0 || data.datas.initFlag !== '1') {
        yield put({ type: 'hideSpin' });
      } else {
        router.push("/login");
      }
    },*/
    *initSystem({ payload: values }, { put, call }) {
      const data = yield call(initService.initSystem, values);
      if(data) {
        yield put({ type: 'showSpin' });
        message.success(data.message, 3, (res) => {
          router.push("/login");
        });
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/init') {
          dispatch({ type: 'check' });
        }
      });
    }
  }
}
