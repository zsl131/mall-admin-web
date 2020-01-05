import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "agentService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,
    paperVisible: false,
    verifyVisible: false,
    passVerifyVisible: false,
    paperList: [],
    levelList: [],
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
    *listPapers({payload: obj}, {call,put}) {
      obj.apiCode = baseService+".listPapers";
      const data = yield call(httpGet, obj);
      if(data) {
        yield put({type: 'modifyState', payload: {paperVisible: true, item: obj, paperList: data.data}});
      }
    },
    *onPassVerify({payload: obj}, {call,put}) {
      const data = yield call(httpGet, {apiCode: "agentLevelService.list"});
      //console.log(data);
      yield put({type: 'modifyState', payload: {passVerifyVisible: true, item: obj, levelList: data.datas}});
    },
    *verify({payload: obj}, {call}) {
      obj.apiCode = baseService+".verify";
      const data = yield call(httpGet, obj);
      //console.log(data);
      message.success(data.message);
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/agent') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
