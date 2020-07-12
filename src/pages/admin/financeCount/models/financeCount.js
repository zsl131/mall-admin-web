import * as objService from '../services/objService';

export default {
  state: {
    totalIn:0,
    totalOut:0,
    in1:[],
    in2:[],
    out1:[],
    out2:[],
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    }
  },
  effects: {
    *index({payload: query}, {call,put}) {
      const data = yield call(objService.count, query);
      yield put({ type: 'modifyState', payload: data });
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/admin/financeCount') {
          dispatch({ type: 'index', payload: location.query });
        }
      });
    }
  }
}
