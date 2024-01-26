import styles from './Aside.module.scss';

const Aside: React.FC = () => {
  return (
    <aside className={styles.aside}>
      <h2 className={styles.title}>Лучшие</h2>
      <hr className={styles.delimeter} />
    </aside>
  );
}

export default Aside;
