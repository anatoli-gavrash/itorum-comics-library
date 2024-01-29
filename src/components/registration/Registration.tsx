import { useState } from 'react';
import {
  Button as ButtonMui,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './Registration.module.scss';
import type { LocalUser } from '../../services/local-storage.types';
import { LocalDataKeys } from '../../services/local-storage.types';
import { addUserToLocalData, checkUser } from '../../services/local-storage';
import { randomInteger } from '../../utils/utils';

interface RegistrationProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Registration: React.FC<RegistrationProps> = (props) => {
  const {setIsOpenModal} = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [login, setLogin] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkUser({login})) {
      const newUser: LocalUser = {
        id: randomInteger(),
        login,
        password,
        firstname,
        lastname,
        avatar: '',
        favorites: null,
        purchases: null,
      };
      
      addUserToLocalData(LocalDataKeys.USERS_DATA, newUser);
      handleResetButton();
      setIsOpenModal(false);
    }
  };

  const handleResetButton = () => {
    setLogin('');
    setFirstname('');
    setLastname('');
    setPassword('');
    setRePassword('');
  };

  return (
    <form className={styles.registration} onSubmit={handleFormSubmit}>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="login">Логин</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="login"
          label="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          error={!isValid}
        />
        <FormHelperText
          className={styles.error}
          id={'login'}
          title={''}
          error={!isValid}
        ></FormHelperText>
      </FormControl>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="firstname">Имя</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="firstname"
          label="Имя"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          error={!isValid}
        />
        <FormHelperText
          className={styles.error}
          id={'firstname'}
          title={''}
          error={!isValid}
        ></FormHelperText>
      </FormControl>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="lastname">Фамилия</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="lastname"
          label="Фамилия"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          error={!isValid}
        />
        <FormHelperText
          className={styles.error}
          id={'lastname'}
          title={''}
          error={!isValid}
        ></FormHelperText>
      </FormControl>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!isValid}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Показать пароль"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText
          className={styles.error}
          id={'password'}
          title={''}
          error={!isValid}
        ></FormHelperText>
      </FormControl>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="re-password">Повторите пароль</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="re-password"
          label="Повторите пароль"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          error={!isValid}
          type={showRePassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Показать пароль"
                onClick={handleClickShowRePassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showRePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText
          className={styles.error}
          id={'re-password'}
          title={''}
          error={!isValid}
        ></FormHelperText>
      </FormControl>
      <div className={styles.buttons}>
        <ButtonMui
          className={styles.button}
          size='large'
          type='button'
          onClick={handleResetButton}
        >Очистить</ButtonMui>
        <ButtonMui className={styles.button} size='large' type='submit'>Регистрация</ButtonMui>
      </div>
    </form>
  );
};

export default Registration;