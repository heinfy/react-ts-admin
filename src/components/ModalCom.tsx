import React from 'react';
import { Modal } from 'antd';

const ModalCom = ({ modalConf = {}, children }) => (
  <Modal {...modalConf}>{children}</Modal>
);

export default ModalCom;
