import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ResumeAnalyzer from "./ResumeAnalyzer";
import Login from "./Login";
import Register from "./Register";

function PrivateRoute({ children }) {

  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/login" />;
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <ResumeAnalyzer />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;