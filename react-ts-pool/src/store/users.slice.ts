import {
  ActionCreatorWithPreparedPayload,
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { authActions, RootState } from ".";
import { apiService, IUser } from "../services";

interface IUsersState {
  list: {
    value: IUser[] | null;
    error: null | Error;
    loading: null | boolean;
  };
  item: {
    value: IUser | null;
    error: null | Error;
    loading: null | boolean;
  };
}

interface IUresRegister {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
}

const name = "users";
const initialState: IUsersState = {
  list: {
    value: null,
    error: null,
    loading: null,
  },
  item: {
    value: null,
    error: null,
    loading: null,
  },
};
const extraActions = createExtraActions();
// const extraReducers = createExtraReducers();
const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getAll();
    getById();
    // _delete();

    function getAll() {
      var { pending, fulfilled, rejected } = extraActions.getAll;
      builder
        .addCase(pending, (state, action) => {
          state.list.loading = true;
        })
        .addCase(fulfilled, (state, action) => {
          state.list.value = action.payload;
        })
        .addCase(rejected, (state, action) => {
          state.list.error = action.error as Error;
        });
    }

    function getById() {
      var { pending, fulfilled, rejected } = extraActions.getById;
      builder
        .addCase(pending, (state, action) => {
          state.item.loading = true;
        })
        .addCase(fulfilled, (state, action) => {
          state.item.value = action.payload;
        })
        .addCase(rejected, (state, action) => {
          state.item.error = action.error as Error;
        });
    }

    // function _delete() {
    //   var { pending, fulfilled, rejected } = extraActions.delete;
    //   builder
    //     .addCase(pending, (state, action) => {
    //       const user = state.list.value.find((x: IUser) => x.id === action.meta.arg);
    //       user.isDeleting = true;
    //     })
    //     .addCase(fulfilled, (state, action) => {
    //       state.list.value = state.list.value?.filter(
    //         (x : IUser) => x.id !== action.meta.arg,
    //       );
    //     })
    //     .addCase(rejected, (state, action) => {
    //       const user = state.list.value.find((x: IUser) => x.id === action.meta.arg);
    //       user.isDeleting = false;
    //     });
    // }
  },
});

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

function createExtraActions() {
  const URL_API = process.env.REACT_APP_API_URL ?? "http://localhost:5555";
  const baseUrl = `${URL_API}/users`;

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
      async (user: IUresRegister) =>
        await apiService.post(`${baseUrl}/register`, user),
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

        const auth = (getState() as RootState).auth.value;
        if (id === auth?.id.toString()) {
          const user = { ...auth, ...data };
          localStorage.setItem("auth", JSON.stringify(user));

          dispatch(authActions.setAuth(user));
        }
      },
    );
  }

  function _delete() {
    return createAsyncThunk(
      `${name}/delete`,
      async function (id, { getState, dispatch }) {
        await apiService.delete(`${baseUrl}/${id}`, null);

        if (id === (getState() as RootState).auth.value?.id) {
          dispatch(authActions.logout());
        }
      },
    );
  }
}
