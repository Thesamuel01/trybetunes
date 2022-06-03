import * as api from '../../services/userAPI';

export const CREATE_USER_LOADING = 'CREATE_USER_LOADING';
export const CREATE_USER_SUCESS = 'CREATE_USER_SUCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

const createUserLoading = () => ({
  type: CREATE_USER_LOADING,
});

const createUserSucess = (name) => ({
  type: CREATE_USER_SUCESS,
  payload: {
    name,
  },
});

const createUserError = (error) => ({
  type: CREATE_USER_ERROR,
  payload: {
    error,
  },
});

export const createUserThunk = (name) => async (dispatch) => {
  console.log('action');
  dispatch(createUserLoading);

  try {
    await api.createUser({ name });
    const userName = await api.getUser().name;

    dispatch(createUserSucess(userName));
  } catch (error) {
    dispatch(createUserError(error));
  }
};
