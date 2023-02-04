import { Dispatch, SetStateAction } from "react";
import { IShowModalProps, IUserPhotoList } from "../interfaces/profileList";
import EditProfileCard from "./EditProfileCard";
import Modal from "./utils/Modal";

interface IEditProfileCardModalProps {
  user: IUserPhotoList;
  fromModal: boolean;
  setUsers: Dispatch<SetStateAction<IUserPhotoList[] | null>>;
  closeModal: () => void;
  setShowModal: Dispatch<SetStateAction<IShowModalProps>>;
}
const EditProfileCardModal = ({
  user,
  setUsers,
  closeModal,
}: IEditProfileCardModalProps) => {
  return (
    <Modal id="user-edit-modal" closeModal={closeModal}>
      <EditProfileCard
        closeModal={closeModal}
        setUsers={setUsers}
        user={user}
      ></EditProfileCard>
    </Modal>
  );
};

export default EditProfileCardModal;
