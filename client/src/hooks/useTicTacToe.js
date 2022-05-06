import { useContext } from 'react';
import { ticTacToeContext } from '../contexts/ticTacToe/ticTacToeContext';

export const useTicTacToe = () => {
  return useContext(ticTacToeContext);
};
