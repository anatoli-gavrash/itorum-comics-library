import { useState } from 'react';
import {
  Button as ButtonMui,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './LoginForm.module.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { setCurrentUser } from '../../store/slices/login/login-slice';
import iconItorum from '../../assets/img/jpg/icon__itorum.jpg';
import type { User } from '../../store/slices/login/login.types';

const defaultUser: User = {
  id: 999999,
  login: 'itorum',
  firstname: 'Дмитрий',
  lastname: 'Бахметьев',
  avatar: iconItorum,
  purchases: null
}

interface LoginFormProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const {setIsOpenModal} = props;
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validation = (login: string, password: string): boolean => {
    return login === import.meta.env.VITE_LOGIN && password === import.meta.env.VITE_PASSWORD;
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validation(login, password)) {
      setIsValid(true);
      dispatch(setCurrentUser(defaultUser));
      setIsOpenModal(false);
      setLogin('');
      setPassword('');
    } else {
      setIsValid(false);
    }
  };
  
  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="login">Логин</InputLabel>
        <OutlinedInput
          className={styles.input}
          error={!isValid}
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          label="Логин"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <OutlinedInput
          className={styles.input}
          error={!isValid}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          label="Пароль"
        />
      </FormControl>
      <ButtonMui className={styles.button} size='large' type='submit' sx={{height: 50}}>Войти</ButtonMui>
    </form>
  );
};

export default LoginForm;
