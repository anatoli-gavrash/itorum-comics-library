import { LocalUser } from './services/local-storage.types';
import iconItorum from './assets/img/jpg/icon__itorum.jpg';


const usersData: LocalUser[] = [
  {
    id: 999999,
    login: 'itorum',
    password: 'marvel',
    firstname: 'Дмитрий',
    lastname: 'Бахметьев',
    avatar: iconItorum,
    favorites: null,
    purchases: null
  }
];

export default usersData;
