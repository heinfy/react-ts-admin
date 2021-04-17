export interface IStore {
  token: string;
  userInfo: IUserInfo;
  auths: IAuths[];
  count: number;
}

export interface IUserInfo {
  uid: string;
  role: string;
  introduction: string;
  avatar: string;
  roleName: string;
  nickname: string;
}

export interface IAuths {
  title: string;
  key: string;
  icon: string;
  id: number;
  pid: number;
}
