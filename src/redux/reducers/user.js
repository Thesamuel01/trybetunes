import {
  CREATE_USER_ERROR,
  CREATE_USER_LOADING,
  CREATE_USER_SUCESS,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  image: '',
  description: '',
  isFetching: false,
  error: '',
};

const user = (state = INITIAL_STATE, action) => {
  console.log('reducer user');
  switch (action.type) {
  case CREATE_USER_LOADING:
    return {
      ...state,
      isFetching: true,
    };

  case CREATE_USER_SUCESS:
    return {
      ...state,
      name: action.payload.name,
      isFetching: false,
      error: '',
    };

  case CREATE_USER_ERROR:
    return {
      ...state,
      error: action.payload.error,
      isFetching: false,
    };

  default:
    return state;
  }
};

export default user;
