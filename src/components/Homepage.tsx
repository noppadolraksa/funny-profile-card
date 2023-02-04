import { useEffect, useState } from "react";
import getUserApi from "../api/getUserApi";
import { concatUserPhotos } from "../helpers/user.helper";
import { IShowModalProps, IUserPhotoList } from "../interfaces/profileList";
import EditProfileCardModal from "./EditProfileCardModal";
import ProfileCard from "./ProfileCard";
import ProfileCardModal from "./ProfileCardModal";

const ProfileCardList = () => {
  const { getUserList, getPhotoList } = getUserApi();
  const [loading, setLoading] = useState<{ userListLoading: boolean }>({
    userListLoading: true,
  });
  const [userList, setUserList] = useState<IUserPhotoList[] | null>(null);
  const showDefault = {
    showEditUser: false,
    showUser: false,
  };

  //modal
  const [showModal, setShowModal] = useState<IShowModalProps>(showDefault);
  const [selectUser, setSelectUser] = useState<IUserPhotoList | null>(null);
  const closeModal = () => {
    setShowModal(showDefault);
    setSelectUser(null);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const userLocal = localStorage.getItem("users");
      if (userLocal && typeof userLocal === "string") {
        const userParse = JSON.parse(userLocal) as IUserPhotoList[];
        setUserList(userParse);
      } else {
        const [users, photos] = await Promise.all([
          getUserList(),
          getPhotoList(),
        ]);
        const transformUser = concatUserPhotos(users, photos);
        //set cache with no expire
        localStorage.setItem("users", JSON.stringify(transformUser));
        // set photo for each user
        setUserList(transformUser);
      }

      setLoading({ userListLoading: false });
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="homepage-wrapper">
        {showModal.showUser && selectUser && (
          <ProfileCardModal
            selectUser={selectUser}
            setSelectUser={setSelectUser}
            closeModal={closeModal}
            user={selectUser}
            setUsers={setUserList}
            setShowModal={setShowModal}
            fromModal={true}
          ></ProfileCardModal>
        )}
        {showModal.showEditUser && selectUser && (
          <EditProfileCardModal
            closeModal={closeModal}
            setUsers={setUserList}
            user={selectUser}
            fromModal={true}
            setShowModal={setShowModal}
          ></EditProfileCardModal>
        )}
        {!loading.userListLoading && !!userList ? (
          <>
            {userList.map((user) => (
              <ProfileCard
                fromModal={false}
                key={user.id}
                user={user}
                setUsers={setUserList}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                setShowModal={setShowModal}
              ></ProfileCard>
            ))}
          </>
        ) : (
          <>loading</>
        )}
      </div>
    </>
  );
};

export default ProfileCardList;
