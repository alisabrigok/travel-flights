import React from 'react';
import styles from './Loader.css';

// create loader to be shown until async operation is completed
const Loader = () => {
  return <div className={styles.loader}>Loading...</div>;
};

export default Loader;
