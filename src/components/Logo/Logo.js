import React from 'react';
import styles from './Logo.css';
import { Link } from 'react-router-dom';

// create logo section to be used both on home page and result page
const Logo = () => {
  return (
    <header className={styles.logo}>
      <h1>
        <Link to="/">
          <span className={styles.braces}>[</span>travel<span
            className={styles.braces}
          >
            ]
          </span>
        </Link>
      </h1>
      <h3>just pack your bag, we know the way</h3>
    </header>
  );
};

export default Logo;
