import { RouteComponentProps } from 'react-router';
import { FormProps } from 'antd/lib/form';

export interface ILogin {
  username: string;
  password: string;
  remember: boolean;
}

export type LoginProps = {
  token: string;
  setToken: (string) => void;
} & RouteComponentProps &
  FormProps;
