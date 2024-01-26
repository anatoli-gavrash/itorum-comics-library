import styles from './Purchases.module.scss';

const Purchased: React.FC = () => {
  return (
    <section className={styles.purchased}>
      <h2 className={styles.title}>Покупки</h2>
      <hr className={styles.delimeter} />
    </section>
  );
};

export default Purchased;
