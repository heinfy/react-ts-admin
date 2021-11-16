import React from 'react';
import { Card, Col, Row, Divider } from 'antd';
import {
  Chart,
  Axis,
  Geom,
  Legend,
  Interaction,
  Interval,
  Tooltip
} from 'bizcharts';

const population = [
  { year: 1949, population: 1275 },
  { year: 1950, population: 1419 },
  { year: 1951, population: 1349 },
  { year: 1952, population: 1622 },
  { year: 1953, population: 1637 },
  { year: 1954, population: 2232 },
  { year: 1955, population: 1965 },
  { year: 1956, population: 1961 },
  { year: 1957, population: 2138 },
  { year: 1958, population: 1889 },
  { year: 1959, population: 1635, other: '三年自然灾害' },
  { year: 1960, population: 1402, other: '三年自然灾害' },
  { year: 1961, population: 949, other: '三年自然灾害' },
  { year: 1962, population: 2451 },
  { year: 1963, population: 2934 },
  { year: 1964, population: 2721 },
  { year: 1965, population: 2679 },
  { year: 1966, population: 2554 },
  { year: 1967, population: 2543 },
  { year: 1968, population: 2731 },
  { year: 1969, population: 2690 },
  { year: 1970, population: 2710 },
  { year: 1971, population: 2551, other: '中国开始实行计划生育政策' },
  { year: 1972, population: 2550 },
  { year: 1973, population: 2447 },
  { year: 1974, population: 2226 },
  { year: 1975, population: 2102 },
  { year: 1976, population: 1849 },
  { year: 1977, population: 1783 },
  { year: 1978, population: 1733 },
  { year: 1979, population: 1715 },
  { year: 1980, population: 1776, other: '中国开始实行独生子女政策' },
  {
    year: 1981,
    population: 2064,
    other: '50.60后进入结婚生育期，中国第三波婴儿潮'
  },
  { year: 1982, population: 2230, other: '1982年9月计划生育被定为基本国策' },
  { year: 1983, population: 2052 },
  { year: 1984, population: 2050 },
  { year: 1985, population: 2196 },
  { year: 1986, population: 2374 },
  { year: 1987, population: 2508 },
  { year: 1988, population: 2445 },
  { year: 1989, population: 2396 },
  { year: 1990, population: 2374 },
  { year: 1991, population: 2250 },
  { year: 1992, population: 2113 },
  { year: 1993, population: 2120 },
  { year: 1994, population: 2098, other: '经济不景气' },
  { year: 1995, population: 2052 },
  { year: 1996, population: 2057 },
  { year: 1997, population: 2028 },
  { year: 1998, population: 1934, other: '金融危机' },
  { year: 1999, population: 1827 },
  { year: 2000, population: 1765 },
  { year: 2001, population: 1696 },
  { year: 2002, population: 1641, other: '2002实施《人口与计划生育法》' },
  {
    year: 2003,
    population: 1594,
    other: '2003年开始，中国每年人口出生数开始基本稳定'
  },
  { year: 2004, population: 1588 },
  { year: 2005, population: 1612 },
  { year: 2006, population: 1581 },
  { year: 2007, population: 1591 },
  { year: 2008, population: 1604 },
  { year: 2009, population: 1587 },
  { year: 2010, population: 1588, other: '80后一代进入结婚生育期' },
  {
    year: 2011,
    population: 1600,
    other: '2011年11月，中国各地全面实施双独二孩政策'
  },
  { year: 2012, population: 1635 },
  { year: 2013, population: 1640 },
  {
    year: 2014,
    population: 1687,
    other: '2011年11月，中国各地全面实施双独二孩政策'
  },
  { year: 2015, population: 1655 },
  {
    year: 2016,
    population: 1786,
    other: '2016年1月1日我国正式施行“全面二孩政策”'
  },
  { year: 2017, population: 1723 },
  { year: 2018, population: 1523 },
  { year: 2019, population: 1465 },
  { year: 2020, population: 1003.5 }
];

const data = [
  { name: '天猫', 年份: '2009', 成交额: 0.5 },
  { name: '天猫', 年份: '2010', 成交额: 9.36 },
  { name: '天猫', 年份: '2011', 成交额: 33.6 },
  { name: '天猫', 年份: '2012', 成交额: 191 },
  { name: '天猫', 年份: '2013', 成交额: 352 },
  { name: '天猫', 年份: '2014', 成交额: 571 },
  { name: '天猫', 年份: '2015', 成交额: 912 },
  { name: '天猫', 年份: '2016', 成交额: 1207 },
  { name: '天猫', 年份: '2017', 成交额: 1682 },
  { name: '天猫', 年份: '2018', 成交额: 2135 },
  { name: '天猫', 年份: '2019', 成交额: 2684 },
  { name: '天猫', 年份: '2020', 成交额: 4982 },
  { name: '天猫', 年份: '2021', 成交额: 5403 },

  { name: '京东', 年份: '2009', 成交额: 0 },
  { name: '京东', 年份: '2010', 成交额: 0 },
  { name: '京东', 年份: '2011', 成交额: 0 },
  { name: '京东', 年份: '2012', 成交额: 0 },
  { name: '京东', 年份: '2013', 成交额: 0 },
  { name: '京东', 年份: '2014', 成交额: 0 },
  { name: '京东', 年份: '2015', 成交额: 93 },
  { name: '京东', 年份: '2016', 成交额: 1770 },
  { name: '京东', 年份: '2017', 成交额: 1271 },
  { name: '京东', 年份: '2018', 成交额: 1598 },
  { name: '京东', 年份: '2019', 成交额: 2044 },
  { name: '京东', 年份: '2020', 成交额: 2715 },
  { name: '京东', 年份: '2021', 成交额: 3491 }
];

const Bar = () => {
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
          data={population}
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
                    年份：{title} 年
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
      <Divider dashed plain></Divider>
      <Card title="天猫京东历年双十一销售额（亿元）">
        <Chart
          height={400}
          padding="auto"
          data={data}
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
            position="年份*成交额"
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
      <Divider dashed plain></Divider>
      <Row gutter={16}>
        <Col span={12}></Col>
        <Col span={12}>
          <Card title="Card title">Card content</Card>
        </Col>
      </Row>
    </div>
  );
};

export default Bar;
