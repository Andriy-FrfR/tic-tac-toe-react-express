import './GameField.css';
import { useTicTacToe } from '../../../../../../hooks/useTicTacToe';
import { useEffect, useState } from 'react';

const GameField = () => {
  const ticTacToe = useTicTacToe();
  const [crossOutCls, setCrossOutCls] = useState(['cross-out']);

  const checkEnd = (arr) => {
    // Checking rows
    if (arr[0] === arr[1] && arr[0] === arr[2] && arr[1] !== 0) {
      return setCrossOutCls(['cross-out', `co${1}`]);
    }

    if (arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== 0) {
      return setCrossOutCls(['cross-out', `co${2}`]);
    }

    if (arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== 0) {
      return setCrossOutCls(['cross-out', `co${3}`]);
    }

    // Checking columns
    if (arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== 0) {
      return setCrossOutCls(['cross-out', `co${4}`]);
    }

    if (arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== 0) {
      return setCrossOutCls(['cross-out', `co${5}`]);
    }

    if (arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== 0) {
      return setCrossOutCls(['cross-out', `co${6}`]);
    }

    // Checking diagonals
    if (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== 0) {
      return setCrossOutCls(['cross-out', `co${7}`]);
    }

    if (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== 0) {
      return setCrossOutCls(['cross-out', `co${8}`]);
    }

    setCrossOutCls(['cross-out']);
  };

  useEffect(() => {
    if (!ticTacToe.gameState.gameField) {
      return;
    }

    checkEnd(ticTacToe.gameState.gameField);
  }, [ticTacToe.gameState.gameField]);

  const makeMove = (cellIdx) => {
    ticTacToe.makeMove(cellIdx);
  };

  return (
    <div className="GameField">
      {ticTacToe.gameState.gameField.map((value, index) => {
        return (
          <div className="cell" key={index} onClick={() => makeMove(index)}>
            {value === 1 ? (
              <span className="material-symbols-outlined x">close</span>
            ) : value === -1 ? (
              <span className="material-symbols-outlined o">
                radio_button_unchecked
              </span>
            ) : null}
          </div>
        );
      })}
      <div className="horizontal-separator s1"></div>
      <div className="horizontal-separator s2"></div>
      <div className="vertical-separator s3"></div>
      <div className="vertical-separator s4"></div>
      <div className={crossOutCls.join(' ')}></div>
    </div>
  );
};

export default GameField;
