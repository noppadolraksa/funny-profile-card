import {
  IPhotoList,
  IUserList,
  IUserPhotoList,
} from "../interfaces/profileList";

export const concatUserPhotos = (
  users: IUserList[],
  photos: IPhotoList[]
): IUserPhotoList[] => {
  return users.map((user, i) => {
    return { ...user, photo: photos[i], disabled: false };
  });
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
