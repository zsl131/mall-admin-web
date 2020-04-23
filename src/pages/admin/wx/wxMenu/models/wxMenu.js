import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "wxMenuService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,
    proList:[],
    treeList:[],
    menu:{},
    pid:0,
    pname: '根',
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
      yield put({ type:'modifyState', payload: data, menu: data.menu });
    },
    *addObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".add";
      const data = yield call(httpGet, obj);
      // console.log(data);
      if(data) {message.success("添加成功");}
    },
    *updateObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".update";
      const data = yield call(httpGet, obj);
      // console.log(data);
      if(data) {message.success("修改成功");}
    },
    *deleteObj({payload: obj}, {call}) {
      obj.apiCode = baseService+".delete";
      const data = yield call(httpGet, obj);
      // console.log(data);
      if(data) {message.success("删除成功");}
    },


    *handlerPublishMenu({payload: obj}, {call}) {
      obj.apiCode = baseService+".publishMenu";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/wx/wxMenu') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
