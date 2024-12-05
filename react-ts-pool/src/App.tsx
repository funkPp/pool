import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Nav } from "./ui-kit/Nav";

function App() {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="md:max-w-[80%] mx-auto 2xl:max-w-[70%] p-2 bg-gray-100 h-screen">
        <Nav />
        <div className=""></div>
      </div>
    </div>
  );
}

export default App;
