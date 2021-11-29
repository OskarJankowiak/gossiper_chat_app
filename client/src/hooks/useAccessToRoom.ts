import { useHistory } from 'react-router-dom';
import { Routes } from 'routes';
import { ChatRoom } from 'features/chatRooms/types';
import { openSelectedModal } from 'features/modal/modalSlice';
import { setRoomSignInId } from 'features/chatRooms/chatRoomsSlice';
import { ModalKind } from 'features/modal/types';
import { useAppDispatch } from 'store';

type ChatRoomPreview = Pick<ChatRoom, 'id' | 'isPrivate'>;

const useAccessToRoom = ({ id, isPrivate }: ChatRoomPreview) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const getIntoRoom = () => {
    if (isPrivate) {
      dispatch(setRoomSignInId(id));
      dispatch(openSelectedModal(ModalKind.AccessRoomModal));
      return;
    }

    history.push(`${Routes.ChatRooms}/${id}`);
  };

  return {
    getIntoRoom,
  };
};

export default useAccessToRoom;
