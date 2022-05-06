import './MenuPage.css';
import Input from '../../components/common/Input/Input';
import { useModals } from '../../hooks/useModals';
import { useInput } from '../../hooks/useInput';
import { useEffect } from 'react';
import { useTicTacToe } from '../../hooks/useTicTacToe';

const Menu = () => {
  const modals = useModals();
  const ticTacToe = useTicTacToe();

  const nicknameInput = useInput({
    placeholder: 'Your nickname:',
    validation: { required: true },
  });

  useEffect(() => {
    ticTacToe.setNickname(nicknameInput.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nicknameInput.value]);

  const showCreateRoomModal = () => {
    if (!nicknameInput.isValid) {
      return nicknameInput.markAsTouched();
    }

    modals.showCreateRoomModal();
  };

  const showJoinRoomModal = () => {
    if (!nicknameInput.isValid) {
      return nicknameInput.markAsTouched();
    }

    modals.showJoinRoomModal();
  };

  return (
    <div className="MenuPage">
      <div className="menu">
        <Input input={nicknameInput} />
        <div className="buttons">
          <button
            className="btn-large orange orange accent-2 join-to-room"
            onClick={showJoinRoomModal}
          >
            Join to room
          </button>
          <button
            className="btn-large create-room"
            onClick={showCreateRoomModal}
          >
            Create room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
