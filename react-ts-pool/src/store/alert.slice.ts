import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAlertState {
  value: IAlert | null;
}

export interface IAlert {
  type: string;
  message: string;
  showAfterRedirect?: boolean;
}

const name = "alert";
const initialState = createInitialState();
const reducers = createReducers();
const slice = createSlice({ name, initialState, reducers });

export const alertActions = { ...slice.actions };
export const alertReducer = slice.reducer;

function createInitialState() {
  return {
    value: null,
  };
}

function createReducers() {
  return {
    success,
    error,
    clear,
  };

  function success(state: IAlertState, action: PayloadAction<Omit<IAlert, 'type'>>) {
    state.value = {
      type: "success",
      message: action.payload.message,
      showAfterRedirect: action.payload.showAfterRedirect,
    };
  }

  function error(state: IAlertState, action: PayloadAction<string>) {
    console.log('AlertErr', action)
    state.value = {
      type: "alert",
      message: action.payload,
      showAfterRedirect: true,
    };
  }

  function clear(state: IAlertState) {
    if (state.value?.showAfterRedirect) {
      state.value.showAfterRedirect = false;
    } else {
      state.value = null;
    }
  }
}
