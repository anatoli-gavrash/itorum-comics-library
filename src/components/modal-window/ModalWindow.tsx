import { Modal } from '@mui/material';
import styles from './ModalWindow.module.scss';

interface ModalWindowProps {
  isOpen: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  children?: React.ReactNode
}

const ModalWindow: React.FC<ModalWindowProps> = (props) => {
  const {isOpen, setIsOpenModal, children} = props;

  return (
    <div>
      <Modal
        className={styles.modal}
        disableScrollLock={true}
        open={isOpen}
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {children}
        </>
      </Modal>
    </div>
  );
};

export default ModalWindow;
