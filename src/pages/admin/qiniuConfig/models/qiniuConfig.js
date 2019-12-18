import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "qiniuConfigService";
export default {
  state: {
    item:{},
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *config({ payload: query }, { call, put }) {
      query.apiCode = baseService+".loadOne";
      const data = yield call(httpGet, query);
      // console.log(data);
      yield put({ type:'modifyState', payload: {item: data.obj} });
    },
    *save({payload: obj}, {call, put}) {
      obj.apiCode = baseService+".save";
      const data = yield call(httpGet, obj);
      if(data) {message.success("保存成功");}
      yield put({ type:'modifyState', payload: {item: data.obj} });
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/qiniuConfig') {
          dispatch({ type: 'config', payload: location.query });
        }
      })
    }
  }
}
