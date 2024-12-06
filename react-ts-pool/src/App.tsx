import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "./components/ui-kit/Nav";
import { Home } from "./components/home";
import { UsersLayout } from "./components/admin";
import { AccountLayout } from "./components/account";

function App() {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="md:max-w-[80%] mx-auto 2xl:max-w-[70%] p-2 bg-gray-100 h-screen">
        <Nav auth={{ role: "admin" }} logout={() => {}} />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="admin/*" element={<UsersLayout />} />
            <Route path="account/*" element={<AccountLayout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
