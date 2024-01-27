import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import Header from "./components/header";
import Footer from './components/footer';
import Aside from "./components/aside";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { currentUser, setCurrentUser } from "./store/slices/login/login-slice";
import { getCurrentUserLocal, setLocalData } from "./services/local-storage";
import { LocalDataKeys } from "./services/local-storage.types";
import usersData from "./usersData";

const App: React.FC = () => {
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLocalData(LocalDataKeys.USERS_DATA, usersData);
    
    if (user === null) {
      dispatch(setCurrentUser(getCurrentUserLocal(LocalDataKeys.CURRENT_USER)));
    }
  }, [])

  useEffect(() => {
  }, [user] )

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
