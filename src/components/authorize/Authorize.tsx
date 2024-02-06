import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, IconButton, Menu } from '@mui/material';
import { currentUser, setCurrentUser } from '../../store/slices/login/login-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import styles from './Authorize.module.scss';
import ModalWindow from '../modal-window';
import LoginForm from '../login-form/LoginForm';
import Registration from '../registration';

const Authorize: React.FC = () => {
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalChild, setModalChild] = useState<string>('');
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => setAnchorEl(null);

  const handleLogin = () => {
    handleClose();
    setModalChild('login');
    setIsOpenModal(true);
  };

  const handleRegistration = () => {
    handleClose();
    setModalChild('registration');
    setIsOpenModal(true);
  }

  const handleLogout = (e: Event | React.SyntheticEvent) => {
    handleClose();
    setTimeout(() => dispatch(setCurrentUser(null)), 200);
  };

  return (
    <div className={styles.authorize}>
      <IconButton
        className={styles.button}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar src={user?.avatar} alt={user?.login} />
      </IconButton>
      <Menu
        className={styles.menu}
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {!user && <MenuItem className={styles.menuListItem} onClick={handleLogin}>Войти</MenuItem>}
        {!user && <MenuItem className={styles.menuListItem} onClick={handleRegistration}>Регистрация</MenuItem>}
        {user && <MenuItem className={styles.menuListItem} onClick={handleLogout}>Выйти</MenuItem>}
      </Menu>
      <ModalWindow isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
        {modalChild === 'login' && <LoginForm setIsOpenModal={setIsOpenModal} />}
        {modalChild === 'registration' && <Registration setIsOpenModal={setIsOpenModal} />}
      </ModalWindow>
    </div>
  );
}

export default Authorize;
