import type { User } from "../store/slices/login/login.types";
import { LocalDataKeys } from './local-storage.types';
import type { FindUserParams, LocalData, LocalDataStruct, LocalUser} from "./local-storage.types";

const getLocalData = (key: LocalDataKeys): LocalDataStruct | null => {
  const result = localStorage.getItem(key);

  return result ? {[key]: JSON.parse(result)} : null;
};

const setLocalData = (key: LocalDataKeys, data: LocalData): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const findUser = (params: FindUserParams): User | null => {
  const data = getLocalData(LocalDataKeys.USERS_DATA);
  const users = data && data[LocalDataKeys.USERS_DATA];

  if (users) {
    const findUser = users.find((localUser: LocalUser) => {
      for (const key in params) {
        if (localUser[key as keyof LocalUser] !== params[key as keyof FindUserParams]) {
          return false;
        }
      }

      return true;
    });
  
    return findUser ? {
      id: findUser.id,
      login: findUser.login,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      avatar: findUser.avatar,
      favorites: findUser.favorites,
      purchases: findUser.purchases
    } : null;
  }

  return null;
};

const checkUser = (params: FindUserParams): boolean => {
  return findUser(params) ? true : false;
};

const getCurrentUserLocal = (key: LocalDataKeys): User | null => {
  const currentUserId = getLocalData(key);
  const id = currentUserId && currentUserId[key];
  
  return typeof id === 'number' ? findUser({id}) : null;
};

const getUserFromLocalData = (login: string, password: string): User | null => {
  if (login === import.meta.env.VITE_LOGIN && password === import.meta.env.VITE_PASSWORD) {
    return findUser({login});
  }
  
  return findUser({login, password});
}

const updateUserLocalData = (key: LocalDataKeys, user: User): void => {
  const data = getLocalData(key);
  const users = data && data[key];

  if (Array.isArray(users)) {
    const newData = users.map((localUser) => {
      if (localUser.id === user.id) {
        return {...localUser, ...user};
      }

      return localUser;
    });

    setLocalData(key, newData);
  }
};

const addUserToLocalData = (key: LocalDataKeys, user: LocalUser): void => {
  const data = getLocalData(key);
  const users = data && data[key];

  if (Array.isArray(users)) {
    users.push(user);
    setLocalData(key, users);
  }
};

export {
  getLocalData,
  setLocalData,
  checkUser,
  getCurrentUserLocal,
  getUserFromLocalData,
  updateUserLocalData,
  addUserToLocalData
};
