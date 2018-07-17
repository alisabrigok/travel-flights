import React from 'react';
import Button from '../../components/Button/Button';
import SearchContainer from '../../components/SearchContainer/SearchContainer';
import Logo from '../../components/Logo/Logo';
import styles from './Home.css';

// create home page
const Home = () => {
  return (
    <header className={styles.home}>
      <Logo />
      <div className={styles.container}>
        <SearchContainer />
        <div className={styles.button}>
          <Button />
        </div>
      </div>
    </header>
  );
};

export default Home;
