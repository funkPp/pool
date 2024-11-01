import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Login, PasswordReset, Signup} from './components/UserFrontComponents'
import { useUserfront, LogoutButton } from "@userfront/react";
import Home from './components/Home'
import Dashboard from './components/Dashboard'

export default function App() {
  const { isAuthenticated, isLoading, user } = useUserfront();
  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/Signup">Signup</Link>
            </li>
            <li>
              <Link to="/reset">Reset</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <LogoutButton />
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />          
          <Route path="/reset" element={<PasswordReset />} />
          {/* <Route path="/dashboard" element={<DefaultLayout />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />          
        </Routes>
      </div>
    </Router>
  );
}