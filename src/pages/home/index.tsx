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
        <Col span={18}>
          <StatisticDemo />
        </Col>
        <Col style={{ border: '1px solid #f0f0f0' }} span={6}>
          <RepoLanguages />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <WordCloud />
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <DailyRecommendation />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
