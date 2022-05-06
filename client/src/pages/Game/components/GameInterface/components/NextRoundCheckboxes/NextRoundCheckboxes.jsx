import './NextRoundCheckboxes.css';
import { useModals } from '../../../../../../hooks/useModals';
import { useTicTacToe } from '../../../../../../hooks/useTicTacToe';

const NextRoundCheckboxes = () => {
  const ticTacToe = useTicTacToe();
  const modals = useModals();

  return (
    <div className="NextRoundCheckboxes">
      <div className="checkboxes">
        <label>
          <input
            type="checkbox"
            className="filled-in"
            readOnly={true}
            checked={ticTacToe.gameState.youReadyForNextRound}
          />
          <span id="cb-1"></span>
        </label>
        <label>
          <input
            type="checkbox"
            className="filled-in"
            readOnly={true}
            checked={ticTacToe.gameState.opponentReadyForNextRound}
          />
          <span id="cb-2"></span>
        </label>
      </div>
      <div className="buttons">
        <button className="btn" onClick={ticTacToe.setReadyForNextRound}>
          Next round
        </button>
        <button className="btn red" onClick={modals.showLeaveRoomModal}>
          EXIT
        </button>
      </div>
    </div>
  );
};

export default NextRoundCheckboxes;
