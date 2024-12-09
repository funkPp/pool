import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authActions } from ".";
import { apiService, IUser } from "../services";

export interface UsersState {
  list: IUser[] | null;
  item: IUser | null;
}

const name = "users";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers: {}, extraReducers });

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

function createInitialState() {
  return {
    list: null,
    item: null,
  };
}

function createExtraActions() {
  const API_URL = process.env.REACT_APP_API_URL;
  const baseUrl = `${API_URL}/users`;

  return {
    register: register(),
    getAll: getAll(),
    getById: getById(),
    update: update(),
    delete: _delete(),
  };

  function register() {
    return createAsyncThunk(
      `${name}/register`,
      async (user) => await apiService.post(`${baseUrl}/register`, user),
    );
  }

  function getAll() {
    return createAsyncThunk(
      `${name}/getAll`,
      async () => await apiService.get(baseUrl, null),
    );
  }

  function getById() {
    return createAsyncThunk(
      `${name}/getById`,
      async (id) => await apiService.get(`${baseUrl}/${id}`, null),
    );
  }

  function update() {
    return createAsyncThunk(
      `${name}/update`,
      async function (
        { id, data }: { id: number; data: IUser },
        { getState, dispatch },
      ) {
        await apiService.put(`${baseUrl}/${id}`, data);

        // update stored user if the logged in user updated their own record
        const auth = getState().auth.value;
        if (id === auth?.id.toString()) {
          // update local storage
          const user = { ...auth, ...data };
          localStorage.setItem("auth", JSON.stringify(user));

          // update auth user in redux state
          dispatch(authActions.setAuth(user));
        }
      },
    );
  }

  // prefixed with underscore because delete is a reserved word in javascript
  function _delete() {
    return createAsyncThunk(
      `${name}/delete`,
      async function (id, { getState, dispatch }) {
        await apiService.delete(`${baseUrl}/${id}`, null);

        // auto logout if the logged in user deleted their own record
        if (id === getState().auth.value?.id) {
          dispatch(authActions.logout());
        }
      },
    );
  }
}

function createExtraReducers() {
  return (builder) => {
    getAll();
    getById();
    _delete();

    function getAll() {
      var { pending, fulfilled, rejected } = extraActions.getAll;
      builder
        .addCase(pending, (state) => {
          state.list = { loading: true };
        })
        .addCase(fulfilled, (state, action) => {
          state.list = { value: action.payload };
        })
        .addCase(rejected, (state, action) => {
          state.list = { error: action.error };
        });
    }

    function getById() {
      var { pending, fulfilled, rejected } = extraActions.getById;
      builder
        .addCase(pending, (state) => {
          state.item = { loading: true };
        })
        .addCase(fulfilled, (state, action) => {
          state.item = { value: action.payload };
        })
        .addCase(rejected, (state, action) => {
          state.item = { error: action.error };
        });
    }

    function _delete() {
      var { pending, fulfilled, rejected } = extraActions.delete;
      builder
        .addCase(pending, (state, action) => {
          const user = state.list.value.find((x) => x.id === action.meta.arg);
          user.isDeleting = true;
        })
        .addCase(fulfilled, (state, action) => {
          state.list.value = state.list.value.filter(
            (x) => x.id !== action.meta.arg,
          );
        })
        .addCase(rejected, (state, action) => {
          const user = state.list.value.find((x) => x.id === action.meta.arg);
          user.isDeleting = false;
        });
    }
  };
}
