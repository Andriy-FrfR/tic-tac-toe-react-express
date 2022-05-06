import { useModals } from '../../../../hooks/useModals';
import { useTicTacToe } from '../../../../hooks/useTicTacToe';
import './WaitingForOpponent.css';

const WaitingForOpponent = () => {
  const modals = useModals();
  const ticTacToe = useTicTacToe();

  const showLeaveRoomModal = () => {
    modals.showLeaveRoomModal();
  };

  return (
    <div className="WaitingForOpponent">
      <div className="room-name">Room: {ticTacToe.gameState.roomName}</div>
      <div className="loading">Waiting for the opponent</div>
      <button className="btn red" onClick={showLeaveRoomModal}>
        Exit
      </button>
    </div>
  );
};

export default WaitingForOpponent;
