import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { IShowModalProps, IUserPhotoList } from "../interfaces/profileList";
import pic from "../assets/edit_logo.png";

import ProfilePicture from "./utils/ProfilePicture";
import { delay } from "../helpers/user.helper";

interface IProfileCardProps {
  user: IUserPhotoList;
  setUsers: Dispatch<SetStateAction<IUserPhotoList[] | null>>;
  fromModal: boolean;
  selectUser: IUserPhotoList | null;
  setSelectUser: Dispatch<SetStateAction<IUserPhotoList | null>>;
  setShowModal: Dispatch<SetStateAction<IShowModalProps>>;
}
const ProfileCard = ({
  user,
  fromModal,
  setUsers,
  setSelectUser,
  setShowModal,
}: IProfileCardProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleDisabled = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setSelectUser({ ...user, disabled: !user.disabled });
    setUsers((prev) => {
      if (prev === null) return null;
      const userChangeDisabled = prev?.map((u) => {
        if (u.id === id) {
          return { ...u, disabled: !u.disabled };
        } else {
          return u;
        }
      });
      //update disabled card
      localStorage.setItem("users", JSON.stringify(userChangeDisabled));
      return userChangeDisabled;
    });
  };

  const handleShowUserModal = async (user: IUserPhotoList) => {
    if (user.disabled) return;
    if (!fromModal) {
      setIsClick(true);
      await delay(500);
      setShowModal({ showEditUser: false, showUser: true });
      setSelectUser(user);
    }
  };

  const handleShowEditUserModal = async (user: IUserPhotoList) => {
    setSelectUser(user);
    setShowModal({ showEditUser: true, showUser: false });
  };

  return (
    <>
      <div
        className={`profile-wrapper${user.disabled ? " faded" : ""}${
          isClick ? " click-card" : ""
        } ${fromModal || user.disabled ? "from-modal" : ""}`}
        key={user.id}
        onAnimationEnd={() => {
          setIsClick(false);
        }}
      >
        <div className={`profile-wrapper__header`}>
          <img
            className={`profile-wrapper__edit ${
              user.disabled ? "disabled" : ""
            }`}
            src={pic}
            alt="edit-profile"
            height="20"
            width="20"
            onClick={() => {
              handleShowEditUserModal(user);
            }}
          ></img>
          <label className="toggle">
            <input
              className="toggle-checkbox"
              type="checkbox"
              checked={!user.disabled}
              onChange={(e) => {
                handleDisabled(e, user.id);
              }}
            ></input>
            <div className="toggle-switch"></div>
            <span className="toggle-label"></span>
          </label>
        </div>
        <div
          className="profile-wrapper__container"
          onClick={() => {
            handleShowUserModal(user);
          }}
        >
          <ProfilePicture photo={user.photo.download_url}></ProfilePicture>
          <p className="truncate l-text">{user.name}</p>
          <p className="truncate m-text">{user.email}</p>
          <p className="truncate m-text">{user.phone}</p>
          <div className="profile-line"></div>
          <p className="truncate m-text">{user.company.name}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
