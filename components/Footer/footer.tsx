import type { NextPage } from 'next';

import styles from './footer.module.css';

const Footer: NextPage = () => {
  return (
    <footer className={styles.footer}>
      <span>Coded by</span>
      <a href='https://github.com/Lorenzo-Pappalardo'>Lorenzo Pappalardo</a>
      <a href='https://github.com/Helias'>Stefano Borzì</a>
      <a href='https://github.com/Gigi-G'>Luigi Seminara</a>
    </footer>
  );
};

export default Footer;
