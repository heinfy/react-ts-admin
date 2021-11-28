import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Alert } from 'antd';

import { IStore } from '../../redux/interface';

import './index.scss';

const PdfDownload = ({ token }: { token: string | null }) => {
  const [article, setArticle] = useState({
    title: '',
    content: ''
  });
  const history = useHistory();
  if (!token) {
    history.push({
      pathname: '/login',
      search: 'redirect=/pdf/download'
    });
  }

  useEffect(() => {
    fetchData();
  }, [token]);
  const fetchData = () => {
    import('./content.js').then((data: any) => {
      const { title } = data.default;
      document.title = title;
      setArticle(data.default);
      setTimeout(() => {
        window.print();
      }, 3000);
    });
  };

  return (
    <section>
      <div
        className="main-article"
        element-loading-text="Efforts to generate PDF"
      >
        <Alert message="等待3秒~~~" type="success" />
        <div className="article__heading">
          <div className="article__heading__title">{article.title}</div>
        </div>
        <div>
          This article is from Evan You on{' '}
          <a
            target="_blank"
            href="https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf"
            rel="noreferrer"
          >
            medium
          </a>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="node-article-content"
        />
      </div>
    </section>
  );
};

export default connect((state: IStore) => ({
  token: state.token
}))(PdfDownload);
