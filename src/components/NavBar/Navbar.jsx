import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
export default function Navbar() {
  let activeStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
    transition: "0.1s ease-in",
  };
  return (
    <div>
      <ul className={classes.list}>
        <li className={classes.lis}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? classes.active : classes.li
            }
          >
            Home
          </NavLink>
        </li>
        <li className={classes.lis}>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? classes.active : classes.li
            }
          >
            Map
          </NavLink>
        </li>
        <li className={classes.lis + " " + classes.hidden}>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? classes.active : classes.li
            }
          >
            Log In/ Sign In
          </NavLink>
        </li>
        <li className={classes.lis}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? classes.active : classes.li
            }
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
