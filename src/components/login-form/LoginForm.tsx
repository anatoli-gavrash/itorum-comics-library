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
import { useAppDispatch } from '../../hooks/hooks';
import { setCurrentUser } from '../../store/slices/login/login-slice';
import { getUserFromLocalData } from '../../services/local-storage';
import styles from './LoginForm.module.scss';

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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = getUserFromLocalData(login, password);

    if (user) {
      setIsValid(true);
      dispatch(setCurrentUser(user));
      setIsOpenModal(false);
      setLogin('');
      setPassword('');
    } else {
      setIsValid(false);
    }
  };
  
  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <FormControl className={styles.inputWrapper} variant="outlined">
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
      <FormControl className={styles.inputWrapper} variant="outlined">
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
      <ButtonMui className={styles.button} size='large' type='submit'>Войти</ButtonMui>
    </form>
  );
};

export default LoginForm;
