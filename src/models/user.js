import { query as queryUsers, queryCurrent,queryCurrentUser } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      console.log('1')
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      let param ={};
      param.id=sessionStorage.getItem('user_id');
      const response = yield call(queryCurrentUser,param);
      yield put({
        type: 'saveCurrentUser',
        payload: response.Data.UserViewModel,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    }
  },
};
