import React from 'react';
import { FaFacebookF, FaFacebookMessenger } from 'react-icons/fa';
import styles from '../assets/styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footerList}>
        <li className={styles.message}>
          With Love, <span>JD & JR</span>
        </li>
        <li className={styles.credit}>
          © 2025 Our Wedding. All rights reserved.
        </li>
        <li className={styles.dev}>
        Site developed by:<strong>Ronnel Santos</strong>
        </li>
        <li className={styles.socials}>
          <a
            href="https://facebook.com/ronnelsantos08"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://m.me/ronnelsantos08"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Messenger"
          >
            <FaFacebookMessenger />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
