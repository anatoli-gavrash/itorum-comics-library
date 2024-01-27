import styles from './Purchases.module.scss';

const Purchases: React.FC = () => {
  return (
    <section className={styles.purchases}>
      <h2 className={styles.title}>Покупки</h2>
      <hr className={styles.delimeter} />
    </section>
  );
};

export default Purchases;
