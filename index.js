const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const Room = require('./models/room');
const {
  getPlayerRoom,
  sendDataToPlayers,
  checkEndOfGame,
  sendRoomDeleted,
} = require('./helpers/functions');

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = new http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:${process.env.PORT}`],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('PLAYER:SEND_ID', async (playerId, cb) => {
    socket.join(playerId);

    const room = await getPlayerRoom(playerId);

    if (!room) {
      cb({ isGameFound: false });
    } else {
      sendDataToPlayers(io, room);
      cb({ isGameFound: true });
    }
  });

  socket.on('PLAYER:CREATE_ROOM', async (playerId, nickname, roomName, cb) => {
    const isInRoom = await getPlayerRoom(playerId);

    if (isInRoom) {
      return cb({
        isRoomCreated: false,
        message: 'You are already in room',
      });
    }

    const candidate = await Room.findOne({ name: roomName });

    if (candidate) {
      return cb({ isRoomCreated: false, message: 'Room already exists' });
    }

    const room = await new Room({
      name: roomName,
      firstPlayer: { playerId, nickname, moveSign: 1, score: 0 },
      isRoomFull: false,
      gameField: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      nextMoveSign: 1,
      gameEndedInfo: {
        isGameEnded: false,
      },
    }).save();

    sendDataToPlayers(io, room);

    cb({ isRoomCreated: true });
  });

  socket.on('PLAYER:JOIN_ROOM', async (playerId, nickname, roomName, cb) => {
    const isInRoom = await getPlayerRoom(playerId);

    if (isInRoom) {
      return cb({ joinedToRoom: false, message: 'You are already in room' });
    }

    const candidate = await Room.findOne({ name: roomName });

    if (!candidate) {
      return cb({ joinedToRoom: false, message: "Room doesn't exists" });
    }

    if (candidate.isRoomFull) {
      return cb({ joinedToRoom: false, message: 'Room is full' });
    }

    candidate.secondPlayer = {
      playerId,
      nickname,
      moveSign: -1,
      score: 0,
      isReadyForNextRound: false,
    };
    candidate.isRoomFull = true;

    await candidate.save();

    sendDataToPlayers(io, candidate);

    cb({ joinedToRoom: true });
  });

  socket.on('PLAYER:LEAVE_ROOM', async (playerId) => {
    const room = await getPlayerRoom(playerId);
    await Room.findOneAndDelete({ _id: room.id });

    sendRoomDeleted(io, room, playerId);
  });

  socket.on('PLAYER:MAKE_MOVE', async (playerId, cellIdx) => {
    const room = await getPlayerRoom(playerId);

    const player =
      room.firstPlayer.playerId === playerId
        ? room.firstPlayer
        : room.secondPlayer;

    const opponent =
      room.firstPlayer.playerId !== playerId
        ? room.firstPlayer
        : room.secondPlayer;

    if (room.gameEndedInfo.isGameEnded) {
      return;
    }

    if (room.gameField[cellIdx] !== 0) {
      return;
    }

    if (player.moveSign !== room.nextMoveSign) {
      return;
    }

    room.gameField[cellIdx] = player.moveSign;
    room.nextMoveSign = opponent.moveSign;

    checkEndOfGame(room);

    await room.save();

    sendDataToPlayers(io, room);
  });

  socket.on('PLAYER:SET_READY_FOR_NEXT_ROUND', async (playerId) => {
    const room = await getPlayerRoom(playerId);
    let player, opponent;

    if (playerId === room.firstPlayer.playerId) {
      player = room.firstPlayer;
      opponent = room.secondPlayer;
    } else {
      player = room.secondPlayer;
      opponent = room.firstPlayer;
    }

    if (player.isReadyForNextRound) {
      return;
    }

    player.isReadyForNextRound = true;

    if (player.isReadyForNextRound === opponent.isReadyForNextRound) {
      player.isReadyForNextRound = false;
      opponent.isReadyForNextRound = false;

      const tmp = player.moveSign;
      player.moveSign = opponent.moveSign;
      opponent.moveSign = tmp;

      room.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      room.gameEndedInfo = { isGameEnded: false };
      room.nextMoveSign = 1;
    }

    await room.save();
    sendDataToPlayers(io, room);
  });
});

const start = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI);
    server.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
