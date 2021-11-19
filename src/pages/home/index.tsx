import React from 'react';
import { Divider, Col, Row } from 'antd';

// 组件
import RepoLanguages from '../../components/RepoLanguages';
import StatisticDemo from '../../components/StatisticDemo';
import DailyRecommendation from '../../components/DailyRecommendation';
import WordCloud from '../../components/WordCloud';

import './index.scss';

const Home = () => {
  return (
    <div>
      <Row gutter={[16, 24]}>
        <Col style={{ border: '1px solid #86ccfe' }} span={6}>
          <RepoLanguages />
        </Col>
        <Col span={18}>
          <StatisticDemo />
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <DailyRecommendation />
        </Col>
        <Col span={12}>
          <WordCloud />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
