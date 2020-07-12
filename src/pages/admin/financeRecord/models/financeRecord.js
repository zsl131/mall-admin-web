import * as objService from '../services/objService';
import {message} from 'antd';

export default {
  state: {
    data:[],
    totalElements: 0,
    item:[],
    totalIn:0,
    totalOut:0,
    cateList:[],
    addVisible: false,
    updateVisible: false,
    invalidVisible: false,
    downloadVisible: false,
    detailList:[],
    ticketList:[],
    chineseMoney:'',
    record:{},
    showVisible: false,
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *list({payload: query}, {call,put}) {
      const data = yield call(objService.list, query);
      yield put({ type: 'modifyState', payload: {data: data.data, totalElements: data.size, totalIn: data.totalIn, totalOut: data.totalOut,cateList:data.cateList} });
    },
    *add({payload: obj}, {call}) {
      const data = yield call(objService.save, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *loadOne({payload: id}, {call,put}) {
      const data = yield call(objService.loadOne, {id});
      yield put({type: 'modifyState', payload: {item: data.obj, addVisible: true}})
    },
    *updateStatus({payload: obj}, {call}) {
      const data = yield call(objService.updateStatus, obj);
      if(data) {
        message.success(data.message);
      }
    },
    *showDetail({payload: obj}, {call,put}) {
      const data = yield call(objService.loadOne, obj);
      yield put({type: "modifyState", payload: {...data, showVisible: true}});
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/financeRecord') {
          dispatch({ type: 'list', payload: location.query });
        }
      });
    }
  }
}
