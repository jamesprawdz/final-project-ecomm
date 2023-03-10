import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const LoginForm = ({ setCurrentUser, setIsAuthenticated }) => {
  const navigate = useNavigate();

  // const [errorMsg, setErrorMsg] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
          navigate("/");
        });
      } else {
        console.log(res);
        // setErrorMsg(true);
      }
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <ul className="wrapper">
          <li style={{ "--i": 3 }}>
            <input
              className="input"
              placeholder="Email"
              required=""
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
          </li>
          <li style={{ "--i": 2 }}>
            <input
              className="input"
              placeholder="Password"
              required=""
              type="text"
              name="password"
              checked={formData.password}
              onChange={handleChange}
            />
          </li>
          <button className="auth-button" style={{ "--i": 1 }} type="submit">
            Submit
          </button>
        </ul>
      </form>
    </div>
  );
};

export default LoginForm;
