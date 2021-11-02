export interface IStore {
  token: string;
  userInfo: IUserInfo;
  auths: IAuths[];
  routes: IRoutes[];
  count: number;
}

export interface IUserInfo {
  info: IInfo;
  role: string;
  introduction: string;
  avatar: string;
  roleName: string;
  nickname: string;
}

export interface IInfo {
  userid: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface IAuths {
  routeName: string;
  routeid: string;
  icon: string;
  authid: string;
  route: string;
  pid: string;
  routeSort: number;
}

export interface IRoutes extends IAuths {
  children?: IRoutes[];
}
