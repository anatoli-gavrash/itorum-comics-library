import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { currentUser, setCurrentUser } from "./store/slices/login/login-slice";
import { getCurrentUserLocal, getLocalData, setLocalData, updateUserLocalData } from "./services/local-storage";
import { LocalDataKeys } from "./services/local-storage.types";
import usersData from "./usersData";
import styles from "./App.module.scss";
import Header from "./components/header";
import Aside from "./components/aside";
import Footer from './components/footer';

const App: React.FC = () => {
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!getLocalData(LocalDataKeys.USERS_DATA)) {
      setLocalData(LocalDataKeys.USERS_DATA, usersData);
    }
    
    dispatch(setCurrentUser(getCurrentUserLocal(LocalDataKeys.CURRENT_USER)));
  }, [dispatch]);

  useEffect(() => {
    if (user !== undefined) {
      setLocalData(LocalDataKeys.CURRENT_USER, user?.id || null);
      user && updateUserLocalData(LocalDataKeys.USERS_DATA, user);
    }
  }, [user]);

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
