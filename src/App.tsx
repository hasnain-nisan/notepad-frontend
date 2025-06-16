import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { setCredentials } from "./features/auth/store/auth.slice";
import { httpService } from "./shared/services/http.service";
import { ProtectedRoute } from "./shared/components/ProtectedRoute/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { NotesPage } from "./pages/NotesPage";
import "./shared/di/container"; // Initialize DI container

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check for stored authentication
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(setCredentials({ user, token }));
        httpService.setAuthToken(token);
      } catch (error) {
        // Clear invalid stored data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
