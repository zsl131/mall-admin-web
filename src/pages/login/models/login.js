import * as userService from '../services/login';
import router from 'umi/router';
import { checkLogin, setLoginUser } from '@/utils/authUtils';

export default {
  namespace: 'login',
  state:{
    showError: false,
    errMsg: "请先登陆"
  },
  reducers: {
    'cacheLogin'(state, { payload: datas }) {
      setLoginUser(datas.obj);
      router.push("/admin/index");
    },
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *login({ payload: values }, { put, call }) {
      const data = yield call(userService.login, values);
      //console.log(data);
      if(!data || data.flag==="0") {
        yield put({type: "modifyState", payload: {showError: true, errMsg: data.message}});
      } else {
        //console.log(data.obj);
        setLoginUser(data.obj);
        router.push("/admin/index");
      }
    },
  },
  subscriptions: {
    setup({history}) {
      return history.listen((location) => {
        if(location.pathname === "/login") {
          if(checkLogin()) {
            router.push("/admin/index");
          }
        }
      });
    }
  }
}
