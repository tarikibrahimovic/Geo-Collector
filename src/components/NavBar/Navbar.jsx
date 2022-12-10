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
            to="/layout/manga"
            className={({ isActive }) =>
              isActive ? classes.active : classes.li
            }
          >
            Manga
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
