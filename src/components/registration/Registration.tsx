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
import { isObjectEmpty, randomInteger } from '../../utils/utils';

interface RegistrationProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface ValidationErrors {
  login?: string
  password?: string
  rePassword?: string
  firstname?: string
  lastname?: string
}

interface UserValidation extends LocalUser {
  rePassword?: string
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
  const [errors, setErrors] = useState<ValidationErrors>({});
  
  const validation = (user: UserValidation): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!user.login) {
      errors.login = 'Обязательное поле.';
    } else if (user.login.length < 3) {
      errors.login = 'Имя должно быть больше 3 символов.';
    } else if (checkUser({login})) {
      errors.login = 'Такой логин уже есть в базе.';
    }

    if (!user.firstname) {
      errors.firstname = 'Обязательное поле.';
    } else if (user.firstname.length < 3) {
      errors.firstname = 'Имя должно быть больше 3 символов.';
    }

    if (!user.lastname) {
      errors.lastname = 'Обязательное поле.';
    } else if (user.lastname.length < 3) {
      errors.lastname = 'Фамилия должна быть больше 3 символов';
    }

    if (!user.password) {
      errors.password = 'Обязательное поле.';
    } else if (user.password.length < 7) {
      errors.password = 'Пароль должен быть больше 6 символов.';
    }

    if (!user.rePassword) {
      errors.rePassword = 'Обязательное поле.';
    } else if (user.rePassword.length < 7) {
      errors.rePassword = 'Пароль должен быть больше 6 символов.';
    } else if (user.password !== user.rePassword) {
      errors.rePassword = 'Пароли не совпадают.';
    }

    return errors;
  };
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const newUser: UserValidation = {
      id: randomInteger(),
      login,
      password,
      rePassword,
      firstname,
      lastname,
      avatar: '',
      favorites: null,
      purchases: null,
    };

    const errors: ValidationErrors = validation(newUser);

    if (isObjectEmpty(errors)) {
      delete newUser.rePassword;
      const user: LocalUser = {...newUser};

      addUserToLocalData(LocalDataKeys.USERS_DATA, user);
      handleResetButton();
      setIsOpenModal(false);
    } else {
      setErrors(errors);
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
          error={errors.login ? true : false}
        />
        <FormHelperText
          className={styles.error}
          id={'login'}
          title={''}
          error={errors.login ? true : false}
        >{errors.login}</FormHelperText>
      </FormControl>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="firstname">Имя</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="firstname"
          label="Имя"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          error={errors.firstname ? true : false}
        />
        <FormHelperText
          className={styles.error}
          id={'firstname'}
          title={''}
          error={errors.firstname ? true : false}
        >{errors.firstname}</FormHelperText>
      </FormControl>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="lastname">Фамилия</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="lastname"
          label="Фамилия"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          error={errors.lastname ? true : false}
        />
        <FormHelperText
          className={styles.error}
          id={'lastname'}
          title={''}
          error={errors.lastname ? true : false}
        >{errors.lastname}</FormHelperText>
      </FormControl>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password ? true : false}
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
          error={errors.password ? true : false}
        >{errors.password}</FormHelperText>
      </FormControl>
      <FormControl className={styles.inputWrapper} variant="outlined">
        <InputLabel htmlFor="re-password">Повторите пароль</InputLabel>
        <OutlinedInput
          className={styles.input}
          id="re-password"
          label="Повторите пароль"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          error={errors.rePassword ? true : false}
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
          error={errors.rePassword ? true : false}
        >{errors.rePassword}</FormHelperText>
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