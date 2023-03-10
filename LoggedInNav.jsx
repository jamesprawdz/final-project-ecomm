import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoggedInNav = ({ setIsAuthenticated, cart }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setIsAuthenticated(false);
        navigate("/");
      }
    });
  };

  const cartItemCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0)
    : 0;

  return (
    <nav>
      <div className="loader">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/cart">
            Cart {cartItemCount > 0 && <span>({cartItemCount})</span>}
          </Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li className="lul">
          <Link
            to="/"
            onClick={() => {
              handleLogOut();
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LoggedInNav;
