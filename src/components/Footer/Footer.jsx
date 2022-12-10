import classes from "./Footer.module.css";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className={classes.main}>
        <div className={classes.left}>
          <img src={Logo} alt="" className={classes.logo} />
          <h2 className={classes.name}>Geo Collector</h2>
        </div>
        <div className={classes.right}>
            <Link to="/" className={classes.link}>Home</Link>
            <Link to="/" className={classes.link}>Maps</Link>
            <Link to="/profile" className={classes.link}>Profile</Link>
        </div>
      </div>
    </>
  );
}
