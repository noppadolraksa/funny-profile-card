import { IPhotoList, IUserList } from "../interfaces/profileList";
import { getApi } from "./getApi";

export default function getUserApi() {
  const getUserList = async (): Promise<IUserList[]> => {
    const { data: getUsers } = await getApi<IUserList[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return getUsers;
  };

  const getPhotoList = async (): Promise<IPhotoList[]> => {
    const { data: getPhotos } = await getApi<IPhotoList[]>(
      "https://picsum.photos/v2/list"
    );
    return getPhotos;
  };

  return {
    getUserList,
    getPhotoList,
  };
}
