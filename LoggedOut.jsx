import { Route, Routes } from "react-router-dom";
import LoggedOutNav from "./LoggedOutNav";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import "./auth.css";

export default function LoggedOut({ setCurrentUser, setIsAuthenticated }) {
  return (
    <div className="logged-out-app">
      <LoggedOutNav />
      <Routes>
        <Route
          path="/"
          element={
            <LoginForm
              setCurrentUser={setCurrentUser}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupForm
              setCurrentUser={setCurrentUser}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
      </Routes>
    </div>
  );
}
