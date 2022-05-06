const { model, Schema } = require('mongoose');

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firstPlayer: {
    playerId: { type: Number, required: true },
    nickname: { type: String, required: true },
    moveSign: { type: Number, required: true },
    score: { type: Number, required: true },
    isReadyForNextRound: { type: Boolean, required: true, default: false },
  },
  secondPlayer: {
    playerId: Number,
    nickname: String,
    moveSign: Number,
    score: Number,
    isReadyForNextRound: Boolean,
  },
  isRoomFull: {
    type: Boolean,
    required: true,
  },
  gameField: [Number],
  gameEndedInfo: {
    isGameEnded: { type: Boolean, required: true },
    winner: Number,
  },
  nextMoveSign: { type: Number, required: true },
});

module.exports = model('rooms', roomSchema);
