import { useModals } from '../../../../hooks/useModals';
import './Modal.css';

const Modal = ({
  confirmBtnLabel,
  onConfirm,
  children,
  title,
  reverseBtnColors,
}) => {
  const modals = useModals();

  const hideModal = () => {
    modals.hideModals();
  };

  const confirmBtnClasses = ['waves-effect', 'waves-light', 'btn'];

  if (reverseBtnColors) {
    confirmBtnClasses.push('red', 'lighten-1');
  }

  const cancelBtnClasses = ['waves-effect', 'waves-light', 'btn'];

  if (!reverseBtnColors) {
    cancelBtnClasses.push('red', 'lighten-1');
  }

  return (
    <div className="Modal">
      <div className="title">{title}</div>
      <div className="content">
        {children}
        <div className="buttons">
          <button className={confirmBtnClasses.join(' ')} onClick={onConfirm}>
            {confirmBtnLabel}
          </button>
          <button className={cancelBtnClasses.join(' ')} onClick={hideModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
