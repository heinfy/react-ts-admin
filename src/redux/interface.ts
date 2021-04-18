export interface IStore {
  token: string;
  userInfo: IUserInfo;
  auths: IAuths[];
  routes: IRoutes[];
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
  isPublic?: boolean;
  isMenu: 0 | 1;
  id: number;
  pid: number;
}

export interface IRoutes extends IAuths {
  children?: IRoutes[];
}
