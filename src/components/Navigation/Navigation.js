import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navBar}>
      <NavLink
        className={styles.navLink}
        activeClassName={styles.navLink_active}
        exact
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.navLink}
        activeClassName={styles.navLink_active}
      >
        Search movie
      </NavLink>
    </nav>
  );
}

export { Navigation };
