import { useModals } from '../../hooks/useModals';
import Backdrop from './components/Backdrop/Backdrop';
import Modal from './components/Modal/Modal';
import Input from '../common/Input/Input';
import { useInput } from '../../hooks/useInput';
import { useTicTacToe } from '../../hooks/useTicTacToe';

const Modals = () => {
  const modals = useModals();
  const ticTacToe = useTicTacToe();

  const joinRoomInput = useInput({
    placeholder: 'Room name:',
    validation: { required: true },
  });

  const createRoomInput = useInput({
    placeholder: 'Room name:',
    validation: { required: true },
  });

  const createRoom = () => {
    if (!createRoomInput.isValid) {
      createRoomInput.markAsTouched();
      return;
    }

    ticTacToe.createRoom(createRoomInput.value);
  };

  const joinRoom = () => {
    if (!joinRoomInput.isValid) {
      joinRoomInput.markAsTouched();
      return;
    }

    ticTacToe.joinRoom(joinRoomInput.value);
  };

  const leaveRoom = () => {
    ticTacToe.leaveRoom();
  };

  return (
    <div>
      {modals.displayJoinRoomModal ? (
        <Modal confirmBtnLabel="Join" title="Join room" onConfirm={joinRoom}>
          <Input input={joinRoomInput} />
        </Modal>
      ) : null}
      {modals.displayCreateRoomModal ? (
        <Modal
          confirmBtnLabel="Create"
          title="Create room"
          onConfirm={createRoom}
        >
          <Input input={createRoomInput} />
        </Modal>
      ) : null}
      {modals.displayExitRoomModal ? (
        <Modal
          title="Leave room"
          confirmBtnLabel="Exit"
          reverseBtnColors={true}
          onConfirm={leaveRoom}
        >
          Do you actually want to leave this room?
        </Modal>
      ) : null}
      {modals.displayBackdrop ? <Backdrop /> : null}
    </div>
  );
};

export default Modals;
