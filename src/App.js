import React from "react";
import "./styles/App.css";

import { SignUp } from "./components/session/SignUp";
import { SignIn } from "./components/session/SignIn";

import { Home } from "./components/Home";
import { useAuth, AuthProvider } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route caseSensitive={false} path="/signup" element={<SignUp />} />
            <Route caseSensitive={false} path="/signin" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

function RequireAuth() {
  const { currentUser } = useAuth();
  let location = useLocation();
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
}
export default App;
