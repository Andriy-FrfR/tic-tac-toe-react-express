const Room = require('../models/room');

const getPlayerRoom = async (playerId) => {
  const candidate1 = await Room.findOne({
    'firstPlayer.playerId': playerId,
  });

  if (candidate1) {
    return candidate1;
  }

  const candidate2 = await Room.findOne({
    'secondPlayer.playerId': playerId,
  });

  if (candidate2) {
    return candidate2;
  }
};

const checkEndOfGame = (room) => {
  const setGameWinner = (winnerSign) => {
    room.gameEndedInfo.isGameEnded = true;

    if (room.firstPlayer.moveSign === winnerSign) {
      room.gameEndedInfo.winner = room.firstPlayer.playerId;
      room.firstPlayer.score++;
    } else {
      room.gameEndedInfo.winner = room.secondPlayer.playerId;
      room.secondPlayer.score++;
    }
  };

  const arr = room.gameField;

  if (arr[0] === arr[1] && arr[0] === arr[2] && arr[1] !== 0) {
    return setGameWinner(arr[0]);
  }

  if (arr[3] === arr[4] && arr[3] === arr[5] && arr[3] !== 0) {
    return setGameWinner(arr[3]);
  }

  if (arr[6] === arr[7] && arr[6] === arr[8] && arr[6] !== 0) {
    return setGameWinner(arr[6]);
  }

  // Checking columns
  if (arr[0] === arr[3] && arr[0] === arr[6] && arr[0] !== 0) {
    return setGameWinner(arr[0]);
  }

  if (arr[1] === arr[4] && arr[1] === arr[7] && arr[1] !== 0) {
    return setGameWinner(arr[1]);
  }

  if (arr[2] === arr[5] && arr[2] === arr[8] && arr[2] !== 0) {
    return setGameWinner(arr[2]);
  }

  // Checking diagonals
  if (arr[0] === arr[4] && arr[0] === arr[8] && arr[0] !== 0) {
    return setGameWinner(arr[0]);
  }

  if (arr[2] === arr[4] && arr[2] === arr[6] && arr[2] !== 0) {
    return setGameWinner(arr[2]);
  }

  if (!arr.includes(0)) {
    room.gameEndedInfo.isGameEnded = true;
  }
};

const sendRoomDeleted = (io, room, leavedPlayerId) => {
  io.to(room.firstPlayer.playerId).emit('SERVER:ROOM_DELETED', {
    isLeavedPlayer: room.firstPlayer.playerId === leavedPlayerId,
  });

  io.to(room.secondPlayer.playerId).emit('SERVER:ROOM_DELETED', {
    isLeavedPlayer: room.secondPlayer.playerId === leavedPlayerId,
  });
};

const sendDataToPlayers = async (io, room) => {
  const buildPlayerResponseData = (player, opponent) => {
    const data = {
      roomName: room.name,
      isRoomFull: room.isRoomFull,
      gameField: room.gameField,
      isGameEnded: room.gameEndedInfo.isGameEnded,
      isDraw: room.gameEndedInfo.isGameEnded && !room.gameEndedInfo.winner,
      isWin:
        room.gameEndedInfo.isGameEnded &&
        room.gameEndedInfo.winner === player.playerId,
      isLose:
        room.gameEndedInfo.isGameEnded &&
        room.gameEndedInfo.winner !== player.playerId &&
        !!room.gameEndedInfo.winner,
      yourScore: player.score,
      yourNickname: player.nickname,
      isYourTurn: player.moveSign === room.nextMoveSign,
      opponentScore: opponent.score,
      opponentNickname: opponent.nickname,
      youReadyForNextRound: player.isReadyForNextRound,
      opponentReadyForNextRound: opponent.isReadyForNextRound,
    };

    return data;
  };

  const firstPlayerData = buildPlayerResponseData(
    room.firstPlayer,
    room.secondPlayer
  );
  io.to(room.firstPlayer.playerId).emit('SERVER:SEND_DATA', firstPlayerData);

  const secondPlayerData = buildPlayerResponseData(
    room.secondPlayer,
    room.firstPlayer
  );
  io.to(room.secondPlayer.playerId).emit('SERVER:SEND_DATA', secondPlayerData);
};

module.exports = {
  getPlayerRoom,
  sendDataToPlayers,
  checkEndOfGame,
  sendRoomDeleted,
};
