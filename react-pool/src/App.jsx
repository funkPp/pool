import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { history } from "_helpers";
import { Nav, Alert, PrivateRoute, PrivateAdminRoute } from "_components";
import { Home } from "home";
import { AccountLayout } from "account";
import { UsersLayout } from "users";

export { App };

function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();
  console.log(process.env.REACT_APP_API_URL);
  return (
    <div className="app-container bg-light">
      <Nav />
      <Alert />
      <div className="container pt-4 pb-4">
        <Routes>
          {/* private */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            {/* Админка */}
            <Route element={<PrivateAdminRoute />}>
              <Route path="admin/*" element={<UsersLayout />} />
            </Route>
          </Route>

          {/* public */}
          <Route path="account/*" element={<AccountLayout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
