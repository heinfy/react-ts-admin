import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Dropdown, Menu, message, Modal } from 'antd';
import { IStore, IUserInfo } from '../redux/interface';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import UserInfoModel from './UserInfoModel';
import { logout } from '../api';
import { TOKEN } from '../redux/action-types';
import { setToken } from '../redux/actions';
import { removeCookies, clearStorage } from '../utils/auth';
import errorImage from '../assets/images/error-image.png';

type TToken = string | null;

type IProps = {
  userInfo: IUserInfo;
  setToken: (token: TToken) => void;
};

const { Item } = Menu;

const MyCenter = (props: IProps) => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const editUserInfo = () => {
    setIsModalVisible(true);
  };
  const removeUser = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to log out?',
      async onOk() {
        const result = await logout({
          uid: userInfo && userInfo.uid
        });
        if (result.code === '20000') {
          setToken(null);
          removeCookies(TOKEN);
          clearStorage();
          history.push('/login');
        } else {
          message.error(result.message);
        }
      }
    });
  };
  const menu = (
    <Menu>
      <Item key="myCenter" onClick={editUserInfo}>
        个人中心
      </Item>
      <Menu.Divider />
      <Item key="logout" onClick={removeUser}>
        退出
      </Item>
    </Menu>
  );
  const { userInfo, setToken } = props;
  return (
    <>
      {userInfo && (
        <UserInfoModel
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          userInfo={userInfo}
        />
      )}
      <Dropdown placement="bottomCenter" arrow overlay={menu}>
        <div>
          <span>
            你好 {userInfo && userInfo.nickname}&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <Avatar
            size={40}
            style={{
              borderRadius: '50%'
            }}
            src={(userInfo && userInfo.avatar) || errorImage}
          />
        </div>
      </Dropdown>
    </>
  );
};

export default connect(
  (state: IStore) => ({
    userInfo: state.userInfo
  }),
  { setToken }
)(MyCenter);
