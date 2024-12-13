import { store, authActions } from "../store";

export const apiService = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request<Ibody>(method: string) {
  return (url: string, body: Ibody) => {
    const requestOptions: {
      method: string;
      headers: {
        Authorization?: string;
        "Content-Type"?: string;
      };
      body?: string;
    } = {
      method,
      headers: authHeader(url),
    };
    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

function authHeader(url: string) {
  const token = authToken();
  const isLoggedIn = !!token;
  const isApiUrl = url.startsWith(
    process.env.REACT_APP_API_URL ?? "http://localhost:5555",
  );
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

function authToken() {
  const localJson = localStorage.getItem("auth");
  if (!localJson) return;
  const user = JSON.parse(localJson);
  console.log(user);
  return user?.token;
}

async function handleResponse(response: Response) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    if ([401, 403].includes(response.status) && authToken()) {
      const logout = () => store.dispatch(authActions.logout());
      logout();
    }

    const error = (data && data.error) || `Error, status: ${response.status}`;
    return Promise.reject(error);
  }

  return data;
}
