import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { alertActions } from ".";
import { apiService } from "../services";
import { history } from "../services/history";

interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  token: string;
}
interface IAuthState {
  value: IAuthUser | null;
}
const URL_API = process.env.REACT_APP_API_URL ?? "http://localhost:5555";
const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({ name, initialState, reducers });

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

function createInitialState() {
  return {
    value: JSON.parse(localStorage.getItem("auth") ?? "null"),
  };
}

function createReducers() {
  return {
    setAuth,
  };

  function setAuth(state: IAuthState, action: PayloadAction<IAuthUser | null>) {
    // console.log(action.payload)
    state.value = action.payload;
  }
}

function createExtraActions() {
  const baseUrl = `${URL_API}/users`;

  return {
    login: login(),
    logout: logout(),
  };

  function login() {
    return createAsyncThunk(
      `${name}/login`,
      async function (
        { username, password }: { username: string; password: string },
        { dispatch },
      ) {
        dispatch(alertActions.clear());
        try {
          const user = await apiService.post(`${baseUrl}/authenticate`, {
            username,
            password,
          });

          console.log('user:',user)
          dispatch(authActions.setAuth(user));

          localStorage.setItem("auth", JSON.stringify(user));

          const { from } = history.location?.state || {
            from: { pathname: "/" },
          };
          console.log(from);
          history.navigate!(from);
        } catch (error) {
          if (typeof error === 'string') {
            dispatch(alertActions.error(error));
          } else {
            throw error
          }
        }
      },
    );
  }

  function logout() {
    return createAsyncThunk(`${name}/logout`, function (arg, { dispatch }) {
      dispatch(authActions.setAuth(null));
      localStorage.removeItem("auth");
      history.navigate!("/account/login");
    });
  }
}
