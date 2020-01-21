import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "agentLevelSpecsRateService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,
    treeList:[],
    category:{},
    product:{},
    specsList:[],
    levelList:[],
    rateList:[],
    type: '', //base、
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({ payload: query }, { call, put }) {
      query.apiCode = baseService+".listRoot";
      const data = yield call(httpGet, query);
      // console.log(data);
      yield put({ type:'modifyState', payload: data });
    },
    *addOrUpdate({payload: obj}, {call}) {
      obj.apiCode = baseService+".addOrUpdateRate";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
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
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/agentLevelSpecsRate') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
