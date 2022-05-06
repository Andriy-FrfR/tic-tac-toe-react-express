import { useState } from 'react';
import { modalsContext } from './modalsContext';

const ProvideModals = ({ children }) => {
  const [displayBackdrop, setDisplayBackdrop] = useState(false);
  const [displayCreateRoomModal, setDisplayCreateRoomModal] = useState(false);
  const [displayJoinRoomModal, setDisplayJoinRoomModal] = useState(false);
  const [displayExitRoomModal, setDisplayExitRoomModal] = useState(false);

  const showBackdrop = () => {
    setDisplayBackdrop(true);
  };

  const hideModals = () => {
    setDisplayBackdrop(false);
    setDisplayCreateRoomModal(false);
    setDisplayJoinRoomModal(false);
    setDisplayExitRoomModal(false);
  };

  const showCreateRoomModal = () => {
    showBackdrop();
    setDisplayCreateRoomModal(true);
  };

  const showJoinRoomModal = () => {
    showBackdrop();
    setDisplayJoinRoomModal(true);
  };

  const showLeaveRoomModal = () => {
    showBackdrop();
    setDisplayExitRoomModal(true);
  };

  return (
    <modalsContext.Provider
      value={{
        hideModals,
        displayBackdrop,
        displayCreateRoomModal,
        showCreateRoomModal,
        displayJoinRoomModal,
        showJoinRoomModal,
        displayExitRoomModal,
        showLeaveRoomModal,
      }}
    >
      {children}
    </modalsContext.Provider>
  );
};

export default ProvideModals;
