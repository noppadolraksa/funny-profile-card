interface IProfilePictureProps {
  photo?: string;
}

const ProfilePicture = ({ photo }: IProfilePictureProps) => {
  return <img className="user-photo" src={photo} alt="imagePhoto"></img>;
};

export default ProfilePicture;
