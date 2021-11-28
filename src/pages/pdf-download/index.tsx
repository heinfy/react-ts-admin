import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

import { IStore } from '../../redux/interface';

import './index.scss';

const PdfDownload = ({ token }: { token: string | null }) => {
  const history = useHistory();
  if (!token) {
    history.push({
      pathname: '/login',
      search: 'redirect=/pdf/download'
    });
  }
  return (
    <section>
      <Button type="primary">pdf 下载</Button>
    </section>
  );
};

export default connect((state: IStore) => ({
  token: state.token
}))(PdfDownload);
