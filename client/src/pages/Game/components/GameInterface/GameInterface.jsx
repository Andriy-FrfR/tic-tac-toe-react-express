import './GameInterface.css';
import { useTicTacToe } from '../../../../hooks/useTicTacToe';
import { useModals } from '../../../../hooks/useModals';
import GameField from './components/GameField/GameField';
import NextRoundCheckboxes from './components/NextRoundCheckboxes/NextRoundCheckboxes';
import PlayersInfo from './components/PlayersInfo/PlayersInfo';

const GameInterface = () => {
  const ticTacToe = useTicTacToe();
  const modals = useModals();

  return (
    <div className="GameInterface">
      <PlayersInfo />
      <GameField />
      {ticTacToe.gameState.isGameEnded ? (
        <NextRoundCheckboxes />
      ) : (
        <div className="exit-btn-wrapper">
          <button className="btn red" onClick={modals.showLeaveRoomModal}>
            EXIT
          </button>
        </div>
      )}
    </div>
  );
};

export default GameInterface;
