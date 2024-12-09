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
    state.value = action.payload;
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

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
          dispatch(authActions.setAuth(user));

          localStorage.setItem("auth", JSON.stringify(user));

          const { from } = history.location?.state || {
            from: { pathname: "/" },
          };

          history.navigate!(from);
        } catch (error) {
          if (error instanceof Error) {
            dispatch(alertActions.error(error));
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
