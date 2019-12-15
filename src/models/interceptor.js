import * as objService from '@/service/interceptorService';
import { getAppConfig, setAppConfig } from '../utils/InitSystemUtils';
import router from 'umi/router';
import { message } from 'antd';
import configApi from '@/utils/configApi';

const APP_CONFIG_SESSION_NAME = "appConfig";
export default {
  namespace: 'interceptor',
  state: {
    appConfig:[],
  },
  reducers: {
    'cacheAppConfig'(state, { payload: data }) {
      sessionStorage.setItem(APP_CONFIG_SESSION_NAME, JSON.stringify(data));
      return {...state, appConfig: data || []};
    },
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    reloadPage(state, {payload}) {
      window.location.reload();
      return {...state};
    }
  },
  effects: {
    *init({ payload }, { put, call }) {

      // const appConfig = sessionStorage.getItem(APP_CONFIG_SESSION_NAME);
      // const wxConfig = sessionStorage.getItem(WX_CONFIG_SESSION_NAME);
      const appConfig = getAppConfig();
      //console.log(appConfig)
      if(appConfig === undefined || appConfig === null || appConfig === 'null') {
        const data = yield call(objService.loadWebBaseConfig);
        //console.log(data);
        if(!data.obj) { //未初始化
          message.error("请先初始化系统", 3, ()=>{router.push(configApi.url.init);})
        }
        setAppConfig(JSON.stringify(data.obj));
        yield put({type: 'modifyState', payload: {appConfig: data.obj}});
      }  else {
        yield put({type: 'modifyState', payload: {appConfig: JSON.parse(appConfig)}});
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return dispatch({ type: 'init'})
    }
  }
}
