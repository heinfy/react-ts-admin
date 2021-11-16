import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Divider, message } from 'antd';
import {
  Chart,
  Axis,
  Geom,
  Legend,
  Interaction,
  Interval,
  Tooltip,
  Coord
} from 'bizcharts';

// 接口
import { population, saleVolume, profit, consumption } from '../../api/chart';

const Bar = () => {
  const [pop, setPop] = useState([]);
  const [sal, setSal] = useState([]);
  const [pro, setPro] = useState([]);
  const [cons, setCons] = useState([]);
  useEffect(() => {
    getPop();
    getSal();
    getProfit();
    getConsumption();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getPop = async () => {
    const res = await population();
    if (res.code === 1) {
      setPop(res.result);
    } else {
      message.error(res.message);
    }
  };
  const getSal = async () => {
    const res = await saleVolume();
    if (res.code === 1) {
      setSal(res.result);
    } else {
      message.error(res.message);
    }
  };
  const getProfit = async () => {
    const res = await profit();
    if (res.code === 1) {
      setPro(res.result);
    } else {
      message.error(res.message);
    }
  };
  const getConsumption = async () => {
    const res = await consumption();
    if (res.code === 1) {
      setCons(res.result);
    } else {
      message.error(res.message);
    }
  };
  const label = {
    formatter(text, item, index) {
      return text + '年';
    }
  };

  return (
    <div>
      <Card title="中国历年出生人数">
        <h5>数据统计来源为互联网（万人）</h5>
        <Chart
          height={400}
          autoFit
          data={pop}
          interactions={['active-region']}
          appendPadding={[20, 0, 0, 0]}
          padding={[20, 30, 50, 40]}
        >
          <Geom type="line" color="pink" position="year*population" />
          <Axis name="year" title label={label} />
          <Interval position="year*population" color="year" />
          <Tooltip>
            {(title, items: any) => {
              console.log(title, items);
              return (
                <div
                  style={{
                    padding: '20px 0 10px'
                  }}
                >
                  <h4 style={{ color: items[0].color || 'red' }}>
                    year：{title} 年
                  </h4>
                  <h5 style={{ color: items[0].color || 'red' }}>
                    出生人口数量：{items[0].data.population || 0} 万人
                  </h5>
                  {items[0].data.other && (
                    <strong style={{ paddingTop: 20 }}>
                      {title} 年，{items[0].data.other}
                    </strong>
                  )}
                </div>
              );
            }}
          </Tooltip>
          <Interaction type="active-region" />
        </Chart>
      </Card>
      <Divider orientation="left" plain>
        分割线
      </Divider>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="2021年工资">
            <Chart height={400} padding="auto" data={pro} autoFit>
              <Interval
                adjust={[
                  {
                    type: 'stack'
                  }
                ]}
                color="name"
                position="month*profit"
              />
              <Tooltip shared />
            </Chart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="每月消费">
            <Chart height={400} padding="auto" data={cons} autoFit>
              <Interval
                adjust={[
                  {
                    type: 'dodge',
                    marginRatio: 1
                  }
                ]}
                color="name"
                position="month*profit"
              />
              <Coord type="polar" />
              <Tooltip shared />
            </Chart>
          </Card>
        </Col>
      </Row>
      <Divider dashed plain>
        分割线
      </Divider>
      <Card title="天猫京东历年双十一销售额（亿元）">
        <Chart
          height={400}
          padding="auto"
          data={sal}
          autoFit
          containerStyle={{
            padding: '20px'
          }}
        >
          <Interval
            adjust={[
              {
                type: 'dodge',
                marginRatio: 0
              }
            ]}
            color="name"
            position="year*volume"
          />
          <Tooltip shared />
          <Legend
            layout="vertical"
            position="top-left"
            itemName={{
              spacing: 10, // 文本同滑轨的距离
              style: {
                // stroke: 'blue',
                // fill: 'red'
              },
              formatter: (text, item, index) => {
                return text;
              }
            }}
          />
        </Chart>
      </Card>
    </div>
  );
};

export default Bar;
