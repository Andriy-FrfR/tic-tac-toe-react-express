import { useTicTacToe } from '../../../../hooks/useTicTacToe';
import './PlayersInfo.css';

const PlayersInfo = () => {
  const ticTacToe = useTicTacToe();

  return (
    <div className="PlayersInfo">
      <div className="players-info-item">
        <div className="players-info-item-nickname">
          {ticTacToe.gameState.yourNickname} (You)
        </div>
        <div className="players-info-item-score">
          {ticTacToe.gameState.yourScore}
        </div>
      </div>
      {ticTacToe.gameState.isGameEnded ? (
        <div className="players-info-game-state">
          {ticTacToe.gameState.isWin ? (
            <div className="green-text text-darken-2">VICTORY</div>
          ) : null}
          {ticTacToe.gameState.isLose ? (
            <div className="red-text text-darken-2">DEFEAT</div>
          ) : null}
          {ticTacToe.gameState.isDraw ? (
            <div className="grey-text">DRAW</div>
          ) : null}
        </div>
      ) : ticTacToe.gameState.isYourTurn ? (
        <div className="players-info-game-state turn">Your turn</div>
      ) : (
        <div className="players-info-game-state turn">Opponent's turn</div>
      )}

      <div className="players-info-item">
        <div className="players-info-item-nickname">
          {ticTacToe.gameState.opponentNickname}
        </div>
        <div className="players-info-item-score">
          {ticTacToe.gameState.opponentScore}
        </div>
      </div>
    </div>
  );
};

export default PlayersInfo;
