import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ticTacToeContext } from './ticTacToeContext';
import { baseURL } from '../../config';
import { useModals } from '../../hooks/useModals';

const ProvideTicTacToe = ({ children }) => {
  const modals = useModals();

  const [socket, setSocket] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [isShowGame, setIsShowGame] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('connect', () => {
      socket.emit('PLAYER:SEND_ID', playerId, (result) => {
        if (!result.isGameFound) {
          setIsLoading(false);
          setIsShowGame(false);
        }
      });
    });

    socket.on('SERVER:SEND_DATA', (data) => {
      setGameState(data);
      modals.hideModals();
      setIsLoading(false);
      setIsShowGame(true);
    });

    socket.on('SERVER:ROOM_DELETED', ({ isLeavedPlayer }) => {
      if (!isLeavedPlayer) {
        window.M.toast({ html: 'Your opponent leaved the room' });
      }

      setGameState(null);
      modals.hideModals();
      setIsShowGame(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const connect = () => {
    const plId = +localStorage.getItem('playerId') || Date.now();
    localStorage.setItem('playerId', plId);
    setPlayerId(plId);

    setSocket(io(baseURL));
  };

  const createRoom = (roomName) => {
    socket.emit(
      'PLAYER:CREATE_ROOM',
      playerId,
      nickname,
      roomName,
      (response) => {
        if (!response.isRoomCreated) {
          window.M.toast({ html: response.message });
        }
      }
    );
  };

  const joinRoom = (roomName) => {
    socket.emit(
      'PLAYER:JOIN_ROOM',
      playerId,
      nickname,
      roomName,
      (response) => {
        if (!response.joinedToRoom) {
          window.M.toast({ html: response.message });
        }
      }
    );
  };

  const leaveRoom = () => {
    socket.emit('PLAYER:LEAVE_ROOM', playerId);
  };

  const makeMove = (cellIdx) => {
    socket.emit('PLAYER:MAKE_MOVE', playerId, cellIdx);
  };

  const setReadyForNextRound = () => {
    socket.emit('PLAYER:SET_READY_FOR_NEXT_ROUND', playerId);
  };

  return (
    <ticTacToeContext.Provider
      value={{
        connect,
        createRoom,
        leaveRoom,
        joinRoom,
        isLoading,
        setNickname,
        isShowGame,
        gameState,
        makeMove,
        setReadyForNextRound,
      }}
    >
      {children}
    </ticTacToeContext.Provider>
  );
};

export default ProvideTicTacToe;
