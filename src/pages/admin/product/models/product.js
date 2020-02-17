import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "productService";
const cateService = "productCategoryService";
const specsService = "productSpecsService";
const mediumService = "mediumService";
export default {
  state: {
    item:{},
    selectCate:[],
    totalElements:0,
    datas:[],
    addVisible: false,
    updateVisible: false,
    specsList:[],
    specsVisible: false,
    picVisible: false,
    videoVisible: false,
    picList:[],
    preProduct: {}, //预售信息
    preVisible: false, //预售显示
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    rebuildSpecs(state, {payload: obj}) {
      const list = state.specsList;
      const oldObj = obj.oldObj, newObj = obj.newObj;
      let array = [];
      list.map((item)=> {
        if(item.id === oldObj.id) {array.push(newObj); return newObj;}
        else {array.push(item); return item;}
      });
      return {...state, ...{specsList: array}};
    },
    delSpecs(state, {payload: obj}) {
      const list = state.specsList;
      let array = [];
      list.map((item)=> {
        if(item.id !== obj.id) {array.push(item); return item;}
        return obj;
      });
      return {...state, ...{specsList: array}};
    },
  },
  effects: {
    *list({ payload: query }, { call, put }) {
      query.apiCode = baseService+".list";
      const data = yield call(httpGet, query);
      //console.log(data);
      yield put({ type:'modifyState', payload: {totalElements: data.size, datas: data.datas} });
    },
    *onAdd({payload: obj}, {call,put}) {
      const isUpdate = obj.isUpdate;
      obj.apiCode = cateService+".listSelect";
      obj.needSub = true;
      const data = yield call(httpGet, obj);
      // console.log(data);
      let modifyObj = {selectCate: data.data};
      if(isUpdate) {modifyObj.updateVisible=true;}
      else {modifyObj.addVisible=true;}
      yield put({type: 'modifyState', payload: modifyObj});
    },
    *onShowSpecs({payload: obj}, {call,put}) {
      obj.apiCode = specsService+".listByProduct";
      const data = yield call(httpGet, obj);
      yield put({type:"modifyState", payload: {specsList: data.data, specsVisible: true}});
    },
    *saveSpecs({payload: obj}, {call,put}) {
      obj.apiCode = specsService+".save";
      const data = yield call(httpGet, obj);
      //console.log(data)
      if(data) {
        message.success("保存成功");
        yield put({type: 'rebuildSpecs', payload: {oldObj: obj, newObj: data.obj}});
      }
      // yield put({type:"modifyState", payload: {specsList: data.data}});
    },
    *deleteSpecs({payload: obj}, {call,put}) {
      obj.apiCode = specsService+".delete";
      const data = yield call(httpGet, obj);
      if(data) {
        message.success("删除成功");
        yield put({type: "delSpecs", payload: obj});
      }
    },
    *modifyStatus({payload: obj}, {call}) {
      obj.apiCode = baseService+".modifyStatus";
      const data = yield call(httpGet, obj);
      if(data.flag==="1") {
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    },
    *onPic({payload:obj},{call,put}) {
      const apiCode = mediumService+".listByObj";
      const data = yield call(httpGet, {id: obj.id, objType: "Product", apiCode: apiCode});
      yield put({type: "modifyState", payload: {item: obj, picVisible: true, picList: data.data}});
    },
    *modifySaleMode({payload: obj},{call}) {
      obj.apiCode = baseService+".modifySaleMode";
      const data = yield call(httpGet, obj);
      if(data) {message.success(data.message);}
    },
    *onPresale({payload: obj}, {call,put}) {
      const query = {
        apiCode: baseService+".onPresale",
        id: obj.id
      };
      const data = yield call(httpGet, query);
     // console.log(data, obj);
      if(data) {
        yield put({type: "modifyState", payload: {item: obj, preVisible: true, preProduct: data.obj}});
      }
    },
    *savePresale({payload: obj}, {call, put}) {
      obj.apiCode = baseService+".savePresale";
      const data = yield call(httpGet, obj);
      if(data) {
        message.success(data.message);
        yield put({type: "modifyState", payload: {preVisible: false}});
      }
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
        if(location.pathname === '/admin/product') {
          dispatch({ type: 'list', payload: location.query });
        }
      })
    }
  }
}
