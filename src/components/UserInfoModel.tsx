import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { IUserInfo } from '../redux/interface';

import errorImage from '../assets/images/error-image.png';

type IProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  userInfo: IUserInfo | null;
};

const UserInfoModel = (props: IProps) => {
  const { visible, userInfo, setVisible } = props;
  console.log('object', userInfo);
  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      title="我的资料"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      我的资料
      <img src={errorImage} />
    </Modal>
  );
};

export default UserInfoModel;
