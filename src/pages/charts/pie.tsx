import React from 'react';
import {
  Chart,
  Interval,
  Axis,
  Tooltip,
  Coordinate,
  Legend,
  View,
  Annotation,
  Interaction,
  getTheme,
  Point,
  Line,
  Area
} from 'bizcharts';
import { Card, Col, Row, Divider } from 'antd';
import DataSet from '@antv/data-set';

const Text: any = Annotation.Text;

const Pie = () => {
  // 日常作息可视化(BizCharts@4)
  const text: string[] = [
    'MIDNIGHT',
    '3 AM',
    '6 AM',
    '9 AM',
    'NOON',
    '3 PM',
    '6 PM',
    '9 PM'
  ];
  const data: any = [];
  for (let i = 0; i < 24; i++) {
    const item: any = {};
    item.type = i + '';
    item.value = 10;
    data.push(item);
  }
  const { DataView } = DataSet;
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
  const userData = [
    { type: '睡觉', value: 33 },
    { type: '学习充电', value: 15 },
    { type: '上班', value: 33 },
    { type: '交通', value: 8 },
    { type: '娱乐', value: 8 },
    { type: '个人清洁', value: 3 }
  ];
  const userDv = new DataView();
  userDv.source(userData).transform({
    type: 'percent',
    field: 'value',
    dimension: 'type',
    as: 'percent'
  });
  // 基础饼图(BizCharts@4
  const data_2: any = [
    { item: '星期一', count: 1000, percent: 0.1 },
    { item: '星期二', count: 1000, percent: 0.1 },
    { item: '星期三', count: 1000, percent: 0.1 },
    { item: '星期四', count: 1250, percent: 0.125 },
    { item: '星期五', count: 1250, percent: 0.125 },
    { item: '星期六', count: 3000, percent: 0.3 },
    { item: '星期日', count: 3000, percent: 0.3 }
  ];

  const cols = {
    percent: {
      formatter: (val) => {
        val = val * 100 + '%';
        return val;
      }
    }
  };
  // 多色南丁格尔玫瑰图(BizCharts@4)
  const data_3 = [
    { year: '2001', population: 41.8 },
    { year: '2002', population: 38 },
    { year: '2003', population: 33.7 },
    { year: '2004', population: 30.7 },
    { year: '2005', population: 25.8 },
    { year: '2006', population: 31.7 },
    { year: '2007', population: 33 },
    { year: '2008', population: 46 },
    { year: '2009', population: 38.3 },
    { year: '2010', population: 28 },
    { year: '2011', population: 42.5 },
    { year: '2012', population: 30.3 }
  ];
  // 雷达图(BizCharts@4)
  const data_4 = [
    { item: '金钱', person: 60, team: 70 },
    { item: '击杀', person: 50, team: 70 },
    { item: '生存', person: 40, team: 60 },
    { item: '助攻', person: 90, team: 50 },
    { item: '物理', person: 70, team: 60 },
    { item: '魔法', person: 40, team: 70 },
    { item: '防御', person: 60, team: 40 }
  ];
  // 使用别的 DEMO 的
  // const { DataView } = DataSet;
  const dv_4 = new DataView().source(data_4);
  dv_4.transform({
    type: 'fold',
    fields: ['person', 'team'], // 展开字段集
    key: 'user', // key字段
    value: 'score' // value字段
  });
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="日常作息表"
            extra={
              <a
                href="https://www.bizcharts.net/product/BizCharts4/demo/324"
                target="_blank"
                rel="noreferrer"
              >
                日常作息可视化
              </a>
            }
          >
            <Chart height={400} placeholder={false} padding={50} autoFit>
              <Legend visible={false} />
              {/* 背景图层 */}
              <View data={dv.rows}>
                <Legend visible={false} />
                <Tooltip shared showTitle={false} />
                <Coordinate type="theta" innerRadius={0.9} />
                <Interval
                  position="percent"
                  adjust="stack"
                  color={['type', ['rgba(255, 255, 255, 0)']]}
                  style={{
                    stroke: '#444',
                    lineWidth: 1
                  }}
                  tooltip={false}
                />
                <Text
                  position={['50%', '40%']}
                  content="Fight"
                  style={{
                    lineHeight: '240px',
                    fontSize: '30',
                    fill: '#262626',
                    textAlign: 'center'
                  }}
                />
                <Text
                  position={['50%', '60%']}
                  content="24hours"
                  style={{
                    lineHeight: '240px',
                    fontSize: '30',
                    fill: '#262626',
                    textAlign: 'center'
                  }}
                />
              </View>
              <View data={data}>
                <Axis visible={false} />
                <Coordinate type="polar" innerRadius={0.9} />
                <Interval
                  position="type*value"
                  color="#444"
                  label={[
                    'type',
                    (val) => {
                      return {
                        content: val % 3 === 0 ? text[val / 3] : ''
                      };
                    },
                    {
                      offset: 15,
                      style: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        fill: '#bfbfbf'
                      }
                    }
                  ]}
                  tooltip={false}
                  size={[
                    'type',
                    (val) => {
                      if (val % 3 === 0) {
                        return 4;
                      }
                      return 1;
                    }
                  ]}
                />
              </View>
              {/* 绘制图形 */}
              <View
                data={userDv.rows}
                scale={{
                  percent: {
                    formatter: (val) => {
                      return (val * 100).toFixed(2) + '%';
                    }
                  }
                }}
              >
                <Coordinate type="theta" innerRadius={0.75} />
                <Interval
                  position="percent"
                  adjust="stack"
                  color="type"
                  label={['type', { offset: 40 }]}
                />
              </View>
            </Chart>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="基础饼图(BizCharts@4)"
            extra={
              <a
                href="https://www.bizcharts.net/product/BizCharts4/demo/325"
                target="_blank"
                rel="noreferrer"
              >
                基础饼图
              </a>
            }
          >
            <Chart
              height={400}
              data={data_2}
              scale={cols}
              autoFit
              onIntervalClick={(e) => {
                const states = e.target.cfg.element.getStates(); // 如果是选中，值为['selected'];取消选中，值为[]
              }}
            >
              <Coordinate type="theta" radius={0.75} />
              <Tooltip showTitle={false} />
              <Axis visible={false} />
              <Interval
                position="percent"
                adjust="stack"
                color="item"
                style={{
                  lineWidth: 1,
                  stroke: '#fff'
                }}
                label={[
                  'count',
                  {
                    // label 太长自动截断
                    layout: {
                      type: 'limit-in-plot',
                      cfg: { action: 'ellipsis' }
                    },
                    content: (data) => {
                      return `${data.item}: ${data.percent * 100}%`;
                    }
                  }
                ]}
                state={{
                  selected: {
                    style: (t) => {
                      const res =
                        getTheme().geometries.interval.rect.selected.style(t);
                      return { ...res, fill: '#f05225' };
                    }
                  }
                }}
              />
              <Interaction type="element-single-selected" />
            </Chart>
          </Card>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        分割线
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="多色南丁格尔玫瑰图(BizCharts@4)"
            extra={
              <a
                href="https://www.bizcharts.net/product/BizCharts4/demo/327"
                target="_blank"
                rel="noreferrer"
              >
                多色南丁格尔玫瑰图
              </a>
            }
          >
            <Chart height={400} data={data_3} autoFit>
              <Coordinate type="polar" />
              <Axis visible={false} />
              <Tooltip showTitle={false} />
              <Interval
                position="year*population"
                adjust="stack"
                element-highlight
                color="year"
                style={{
                  lineWidth: 1,
                  stroke: '#fff'
                }}
                label={[
                  'year',
                  {
                    offset: -15
                  }
                ]}
              />
            </Chart>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="雷达图(BizCharts@4)"
            extra={
              <a
                href="https://www.bizcharts.net/product/BizCharts4/demo/343"
                target="_blank"
                rel="noreferrer"
              >
                雷达图(BizCharts@4)
              </a>
            }
          >
            <Chart
              height={400}
              data={dv_4.rows}
              autoFit
              scale={{
                score: {
                  min: 0,
                  max: 100
                }
              }}
              interactions={['legend-highlight']}
            >
              <Coordinate type="polar" radius={0.8} />
              <Tooltip shared />
              <Point position="item*score" color="user" shape="circle" />
              <Line position="item*score" color="user" size="2" />
              <Area position="item*score" color="user" />
              {
                // 棱角和圆形，默认圆形
              }
              <Axis name="score" grid={{ line: { type: 'line' } }} />
              {
                // 不需要轴的最外圈
              }
              <Axis name="item" line={false} />
            </Chart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Pie;
