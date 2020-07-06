import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const roleService = "adminRoleService";
export default {
  namespace: 'role',
  state: {
    datas:[],
    item:{},
    menuTree:[],
    menuList:[],
    menuElements:0,
    totalElements:0,
    addVisible: false,
    updateVisible: false,
    matchMenuVisible: false,
    curRole:[],
    curAuthMenu:[],
  },
  reducers: {
    'list'(state, { payload: datas }) {
      // console.log("listRole", datas);
      return {...state, datas: datas.datas, totalElements: datas.size};
    },
    'setModalVisible'(state, { payload: options }) {
      return {...state, ...options};
    },
    'updateItem'(state, { payload: obj }) {
      // console.log("updateItem", obj);
      return {...state, updateVisible: true, item: obj};
    },
    showMenus(state, { payload: data }) {
      // console.log(data);
      return {...state, menuTree: data.treeList, menuElements: data.menuList.length, menuList: data.menuList, matchMenuVisible: true};
    },
  },
  effects: {
    *listObj({ payload: query }, { call, put }) {
      // console.log("listObj:::", query);
      query.apiCode = roleService+".list";
      const data = yield call(httpGet, query);
      yield put({ type:'list', payload: data });
    },
    *addRole({ payload: obj }, { call, put }) {
      obj.apiCode = roleService+".add";
      const data = yield call(httpGet, obj);
      if(data) {
        yield put({ type: 'setModalVisible', payload: { addVisible: false } });
      }
    },
    *deleteObj({ payload: id }, { call, put }) {
      const query = {id: id, apiCode: roleService+".delete"};
      const data = yield call(httpGet, query);
      if(data) {message.success(data.message);}
    },
    *update({ payload: id }, { call, put }) {
      const query = {id:id, apiCode: roleService+".loadOne"};
      const data = yield call(httpGet, query);
      //console.log(data);
      if(data) {
        yield put({ type: 'updateItem', payload: data.obj });
      } else {
        message.error("没有找到对应数据");
      }
    },
    *updateRole({ payload: obj }, { call, put }) {
      obj.apiCode = roleService+".update";
      const data = yield call(httpGet, obj);
      if(data) {message.success("修改成功");}
    },
    *queryMenus({ payload: query }, { put, call }) {
      //console.log("queryMenus::", query);
      query.apiCode = roleService+".onAuth";
      const data = yield call(httpGet, query);

     // console.log(data)

      yield put({ type: 'setModalVisible', payload: { curAuthMenu: data.mids } });
      yield put({ type: 'showMenus', payload: data.tree });
      // console.log("data2===", data2);
    },
    *authMenu({ payload: obj }, { call }) {
      obj.apiCode = roleService+".authMenu";
      const data = yield call(httpGet, obj);
      message.success(data.message);
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/basic/role') {
          dispatch({ type: 'listObj', payload: location.query });
        }
      })
    }
  }
}
