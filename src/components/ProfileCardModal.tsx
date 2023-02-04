import { Dispatch, SetStateAction } from "react";
import { IShowModalProps, IUserPhotoList } from "../interfaces/profileList";
import ProfileCard from "./ProfileCard";
import Modal from "./utils/Modal";

interface IProfileCardModalProps {
  closeModal: () => void;
  user: IUserPhotoList;
  fromModal: boolean;
  setUsers: Dispatch<SetStateAction<IUserPhotoList[] | null>>;
  selectUser: IUserPhotoList | null;
  setSelectUser: Dispatch<SetStateAction<IUserPhotoList | null>>;
  setShowModal: Dispatch<SetStateAction<IShowModalProps>>;
}
const ProfileCardModal = ({
  closeModal,
  user,
  fromModal,
  setUsers,
  selectUser,
  setSelectUser,
  setShowModal,
}: IProfileCardModalProps) => {
  return (
    <Modal id="user-modal" closeModal={closeModal}>
      <ProfileCard
        setUsers={setUsers}
        fromModal={fromModal}
        user={user}
        selectUser={selectUser}
        setSelectUser={setSelectUser}
        setShowModal={setShowModal}
      ></ProfileCard>
    </Modal>
  );
};

export default ProfileCardModal;
