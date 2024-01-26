import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/header";
import Footer from './components/footer';
import Aside from "./components/aside";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Библиотека комиксов</h1>
        <Outlet />
      </main>
      <Aside />
      <Footer />
    </div>
  );
};

export default App;
