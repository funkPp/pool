import { NavigateFunction } from "react-router-dom";
interface Ihistory {
  navigate: null | NavigateFunction;
  location: null | {
    state: {
      from: { pathname: string };
    };
  };
}

export const history: Ihistory = {
  navigate: null,
  location: null,
};
