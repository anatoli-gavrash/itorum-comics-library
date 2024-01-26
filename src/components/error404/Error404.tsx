import { Link } from 'react-router-dom';
import styles from './Error404.module.scss';
import Header from '../header';
import Footer from '../footer';

const Error404: React.FC = () => {
  return (
    <section className={styles.error}>
      <Header />
      <main className={styles.main}>
        <p className={styles.text}>404</p>
        <h2 className={styles.title}>Запрашиваемая страница не найдена</h2>
        <Link className={styles.link} to='/'>Вернуться на главную</Link>
      </main>
      <Footer />
    </section>
  );
};

export default Error404;
