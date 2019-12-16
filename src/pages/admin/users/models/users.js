import { message } from 'antd';
import { httpGet } from '@/utils/normalService';

const baseService = "adminUserService";

export default {
  namespace: 'users',
  state: {
    datas:[],
    item:{},
    totalElements:0,
    modalVisible: false,
    updateModalVisible: false,
    roleVisible: false,
    curId: 0,
    curNickname: '',
    authRoleIds: [],
    roleList: [],
    selectRoleIds:[],
  },
  reducers: {
    'list'(state, { payload: datas }) {
      // console.log("list", datas, state);
      const newState = {...state, datas: datas.datas, totalElements: datas.size};
      // console.log("newState", newState);
      return newState;
    },
    'updateUser'(state, { payload: user }) {
      return {...state, item: user, updateModalVisible: true};
    },
    showModal(state, { payload }) {
      return {...state, modalVisible: true}
    },
    hideModal(state) {
      return {...state, modalVisible: false}
    },

    showUpdateModal(state) {
      return {...state, updateModalVisible: true}
    },
    hideUpdateModal(state) {
      return {...state, updateModalVisible: false}
    },
    setModalVisible(state, { payload: options }) {
      return {...state, ...options};
    },
    showRoleModal(state, { payload: datas }) {
      return {...state, roleVisible: true, authRoleIds: datas.authIds, roleList: datas.roleList};
    },
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *userList({ payload: query }, { put, call }) {
      query.apiCode = baseService+".listUser";
      // console.log(query);
      const data = yield call(httpGet, query);
      //console.log(data);
      yield put({ type:'list', payload: data });
    },
    *saveUser({payload}, { put, call }) {
      payload.apiCode = baseService+".saveUser";
      const data = yield call(httpGet, payload);
      //console.log(data);
      if(data.flag==="0") {
        message.error(data.message);
      } else {
        message.success("保存用户成功");
        yield put({ type: 'hideModal' });
      }
    },
    *delete({ payload: id }, { call }) {
      const query = {id: id, apiCode: baseService+".deleteUser"};
      const data = yield call(httpGet, query);
      if(data) {
        message.success(data.message);
      }
    },
    *update({ payload: id }, { put, call }) {
      const query = {id:id,apiCode:baseService+".loadOne"};
      const data = yield call(httpGet, query);
      if(data) {
        yield put({ type: 'updateUser', payload: data.obj });
      } else {
        message.warning("没有对应数据");
      }
    },
    *onMatchRole({ payload: id }, { put, call }) {
      const query = {id:id, apiCode:baseService+".matchRole"};
      const data = yield call(httpGet, query);
      yield put({ type: 'showRoleModal', payload: data.obj });
    },
    *setRoles({ payload: obj }, { put, call }) {
      obj.apiCode = baseService+".authRole";
      const data = yield call(httpGet, obj);
      //console.log("setRoles", data);
      if(data) {message.success(data.message);}
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen((location) => {
        if(location.pathname === '/admin/users') {
          dispatch({ type: 'userList', payload: location.query });
        }
      });
    }
  }
}
