import './Backdrop.css';
import { useModals } from '../../../../hooks/useModals';

const Backdrop = () => {
  const modals = useModals();

  const hideModals = () => {
    modals.hideModals();
  };

  return <div className="Backdrop" onClick={hideModals}></div>;
};

export default Backdrop;
