export interface IUserList {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}
interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IPhotoList {
  id: number;
  author: string;
  download_url: string;
  url: string;
  height: number;
  width: number;
}

export interface IUserPhotoList extends IUserList {
  photo: IPhotoList;
  disabled: boolean;
}

export interface IShowModalProps {
  showUser: boolean;
  showEditUser: boolean;
}
