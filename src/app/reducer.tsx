import { SET_USER, UPDATE_USER, DELETE_USER } from './actions';

// 초기 상태 정의
const initialState = {
  user: null,
};

// 리듀서 함수
function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER:
      return {
        user :{
          ...(state.user || {}),
          userPosts: action.payload.post
        }
      }
    case DELETE_USER:
      return {
        user :{
          ...(state.user || {}),
          userPosts: action.payload.post
        }
      }
    default:
      return state;
  }
}

export default userReducer;