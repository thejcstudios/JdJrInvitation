import React from 'react';
import styles from '../assets/styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.message}>
        With Love, <span>JD & JR</span>
      </p>
      <p className={styles.credit}>© 2025 Our Wedding. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
