import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Footer from '../components/Footer/footer';

import styles from '../styles/Hub.module.css';

const Hub: NextPage = () => {
  const router = useRouter();
  const { submodule } = router.query;

  return (
    <div className={styles.container}>
      <main className={styles.main}>{/* Should render corresponding component */}</main>

      <Footer />
    </div>
  );
};

export default Hub;
