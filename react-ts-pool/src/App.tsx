import React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Nav } from "./components/ui-kit/Nav";
import { Home } from "./components/student";
import { UsersLayout } from "./components/coach";
import { AccountLayout } from "./components/account";
import { PrivateRoute, PrivateAdminRoute } from "./components/private";
import { history } from "./services/history";

function App() {
  
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <div className="bg-gray-200 h-screen">
      <div className="md:max-w-[80%] mx-auto 2xl:max-w-[70%] p-2 bg-gray-100 h-screen">
        <Nav auth={{ role: "admin" }} logout={() => {}} />
        <div className="">
          <Routes>
            <Route path="account/*" element={<AccountLayout />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateAdminRoute />}>
                <Route path="admin/*" element={<UsersLayout />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
