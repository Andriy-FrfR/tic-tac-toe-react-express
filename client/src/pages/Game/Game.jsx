import { useTicTacToe } from '../../hooks/useTicTacToe';
import GameInterface from './components/GameInterface/GameInterface';
import WaitingForOpponent from './components/WaitingForOpponent/WaitingForOpponent';

const Game = () => {
  const ticTacToe = useTicTacToe();

  return ticTacToe.gameState.isRoomFull ? (
    <GameInterface />
  ) : (
    <WaitingForOpponent />
  );
};

export default Game;
