import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.content}></span>
    </div>
  );
};

export default Loader;
