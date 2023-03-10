import React, { useState, useEffect } from "react";
import axios from "axios";

function Account() {
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    axios
      .get("/account", { withCredentials: true })
      .then((response) => {
        setAccountInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="account">
      {accountInfo && (
        <div className="account-info">
          <h2>Account Information</h2>
          <p>Email: {accountInfo.email}</p>
          <p>Username: {accountInfo.username}</p>
          <p>First Name: {accountInfo.first_name}</p>
          <p>Last Name: {accountInfo.last_name}</p>
        </div>
      )}

      {!accountInfo && (
        <div className="loading">
          <p>Loading account information...</p>
        </div>
      )}

      <div className="account-actions">
        <button>Edit Profile</button>
        <button>Change Password</button>
        <button>Delete Account</button>
      </div>
    </div>
  );
}

export default Account;
