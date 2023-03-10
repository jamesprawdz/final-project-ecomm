import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const SignupForm = ({ setCurrentUser, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  function handleSubmit(e) {
    e.preventDefault();

    const userCreds = { ...formData };

    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
          navigate("/");
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  }

  return (
    <div>
    <form className="form" onSubmit={handleSubmit}>
      <ul className="wrapper">
      <li style={{ "--i": 6 }}>
          <input
            className="input"
            placeholder="First Name"
            required=""
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
          />
        </li>
      <li style={{ "--i": 5 }}>
          <input
            className="input"
            placeholder="Last Name"
            required=""
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
          />
        </li>
        <li style={{ "--i": 4 }}>
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
        <li style={{ "--i": 3 }}>
          <input
            className="input"
            placeholder="Username"
            required=""
            type="text"
            name="username"
            value={formData.username}
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

export default SignupForm;
