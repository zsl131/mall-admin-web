import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "productService";
const cateService = "productCategoryService";
export default {
  state: {
    item:{},
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,
    proList:[],
    treeList:[],
    category:{},
    type: '', //base、
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *list({ payload: query }, { call, put }) {
      query.apiCode = cateService+".listRoot";
      const data = yield call(httpGet, query);
      // console.log(data);
      yield put({ type:'modifyState', payload: data });
    },
    *addCategory({payload: obj}, {call}) {
      obj.apiCode = cateService+".add";
      const data = yield call(httpGet, obj);
      // console.log(data);
      if(data) {message.success("添加成功");}
    },
    *updateCategory({payload: obj}, {call}) {
      obj.apiCode = cateService+".update";
      const data = yield call(httpGet, obj);
      // console.log(data);
      if(data) {message.success("修改成功");}
    },
    *deleteCategory({payload: obj}, {call}) {
      obj.apiCode = cateService+".delete";
      const data = yield call(httpGet, obj);
      // console.log(data);
      if(data) {message.success("删除成功");}
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
    *changeOrderNo({payload: obj}, {call}) {
      obj.apiCode = cateService+".changeOrderNo";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
    *initOrderNo({payload: obj}, {call}) {
      obj.apiCode = cateService+".initOrderNo";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/productCategory') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
