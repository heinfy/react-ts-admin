import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Dropdown, Menu, Modal } from 'antd';
import { IStore, IUserInfo } from '../redux/interface';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import UserInfoModel from './UserInfoModel';
import { setUserInfo, setToken } from '../redux/actions';
import errorImage from '../assets/images/error-image.png';

type IProps = {
  userInfo: IUserInfo;
  setUserInfo: (IUserInfo) => void;
  setToken: (token: string) => void;
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
      content: '确定要登出?',
      onOk() {
        setToken('');
        history.push('/login');
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
  const { userInfo, setUserInfo, setToken } = props;
  return (
    <>
      {userInfo && (
        <UserInfoModel
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      )}
      <Dropdown placement="bottomCenter" arrow overlay={menu}>
        <div>
          <span>你好，{userInfo && userInfo.info.username}&nbsp;&nbsp;</span>
          <Avatar
            size={40}
            style={{
              borderRadius: '50%'
            }}
            src={errorImage}
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
  { setUserInfo, setToken }
)(MyCenter);
