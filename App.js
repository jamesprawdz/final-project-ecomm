import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        });
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {isAuthenticated ? (
          <LoggedIn
            currentUser={currentUser}
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
            quantity={quantity}
            setQuantity={setQuantity}
            setCurrentUser={setCurrentUser}
          />
        ) : (
          <LoggedOut
            setCurrentUser={setCurrentUser}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
      </Router>
    </div>
  );
};

export default App;
