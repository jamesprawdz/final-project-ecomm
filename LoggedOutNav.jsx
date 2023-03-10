import { NavLink } from "react-router-dom";

export default function LoggedOutNav() {
  return (
    <div className="logged-out-nav">
      <NavLink to="/signup">Sign up</NavLink>
      <p>or</p>
      <NavLink to="/">Login</NavLink>
    </div>
  );
}
