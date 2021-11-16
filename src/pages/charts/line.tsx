import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Divider, message } from 'antd';
import {
  Chart,
  LineAdvance,
  Point,
  Line,
  Annotation,
  Axis,
  Tooltip,
  Legend
} from 'bizcharts';
import moment from 'moment';

// 接口
import { getJson } from '../../api/chart';

const LineChart = () => {
  // Annotation.DataMarker Annotation.DataRegion 数据：
  const scale = {
    rate: {
      nice: true
    }
  };
  const dataMarkerCfg1: any = {
    position: ['2014-01-03', 6.763],
    text: {
      content: '受稳健货币政策影响，协定存款利\n率居高不下,收益率达6.763%',
      style: {
        textAlign: 'left'
      }
    }
  };
  const dataMarkerCfg2: any = {
    position: ['2013-05-31', 2.093],
    text: {
      content: '余额宝刚成立时，并未达到目标资产\n配置，故收益率较低',
      style: {
        textAlign: 'left'
      }
    }
  };
  const dataMarkerCfg3: any = {
    position: ['2016-09-04', 2.321],
    autoAdjust: false,
    text: {
      content: '受积极货币政策的影响，收益率降\n到历史最低2.321%',
      style: {
        textAlign: 'right'
      }
    },
    line: {
      length: 30
    }
  };
  // style文档 https://bizcharts.net/product/BizCharts4/category/61/page/114
  const dataMarkerCfg4: any = {
    position: ['2016-11-02', 2.399],
    autoAdjust: false,
    // 文本style配置
    text: {
      content: '宏观经济过热，受稳健货币政策影\n响，余额宝收益率随之上升',
      style: {
        textAlign: 'center',
        fill: 'red'
      }
    },
    // line?: null | { style?: ShapeAttrs; length?: number };
    //线条style配置
    line: {
      length: 180,
      style: {
        stroke: 'red'
      }
    }
  };
  const dataMarkerCfg5: any = {
    position: ['2017-03-24', 3.83],
    text: null,
    line: {
      length: 50
    }
  };
  const dataRegionCfg: any = {
    start: ['2016-12-02', 2.517],
    end: ['2017-03-24', 3.83],
    text: {
      content: '【关键区间】'
    },
    lineLength: 50
  };

  // 坐标轴显示首尾刻度点 https://www.bizcharts.net/product/BizCharts4/demo/556
  const formatChartData = (chartData) => {
    const now = moment();
    const dateString = now.format('YYYY/MM/DD');
    return chartData.map((item) => {
      const xTime = moment(item.x);
      const timeString = xTime.format('HH:mm:ss');
      item.x = `${dateString} ${timeString}`;
      return item;
    });
  };
  const max = +moment().add(1, 'day').startOf('day');
  const label = {
    offset: 15,
    autoHide: false,
    autoRotate: false,
    // 将第二天的00:00 格式化为 24:00
    formatter: (text, dim) => {
      console.log(text, dim);
      if (+dim.id === max) {
        return '24:00';
      }
      return text;
    },
    title: {
      textAlign: 'center', // 文本对齐方向，可取值为： start center end
      fill: '#fff', // 文本的颜色
      fontSize: 14, // 文本大小
      fontWeight: 'bold', // 文本粗细
      textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
    }
  };
  const cols = {
    x: {
      type: 'time',
      mask: 'HH:mm',
      // 扩大横轴最大值到24:00
      max
    },
    y: {
      tickCount: 4,
      nice: true,
      min: 0
    }
  };
  const [consult, setConsult] = useState([]);
  const [income, setIncome] = useState([]);
  const [temperature, setTemperature] = useState([]);
  useEffect(() => {
    getAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getAll = async () => {
    const res = await getJson();
    if (res.code === 1) {
      const { consult, income, temperature } = res.result;
      const formatedChartData = formatChartData(consult);
      setConsult(formatedChartData);
      setIncome(income);
      setTemperature(temperature);
    } else {
      message.error(res.message);
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="2020年，北京、上海、广州月平均温度"
            extra={
              <a
                href="https://www.bizcharts.net/product/BizCharts4/demo/305"
                target="_blank"
                rel="noreferrer"
              >
                内置预设的折线图形LineAdvance
              </a>
            }
          >
            <Chart
              padding={[10, 20, 70, 40]}
              autoFit
              height={400}
              data={temperature}
            >
              <LineAdvance
                shape="smooth"
                point
                area
                position="month*temperature"
                color="city"
              />
            </Chart>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="余额宝利率"
            extra={
              <a
                href="https://www.bizcharts.net/product/BizCharts4/demo/480"
                target="_blank"
                rel="noreferrer"
              >
                Annotation.DataMarker Annotation.DataRegion
              </a>
            }
          >
            <Chart height={400} data={income} autoFit scale={scale}>
              <Line position="time*rate" />
              <Point
                position="height*weight"
                color="gender"
                shape={['gender', ['circle', 'square']]}
                style={{
                  fillOpacity: 0.85
                }}
              />
              <Annotation.DataMarker {...dataMarkerCfg1} />
              <Annotation.DataMarker {...dataMarkerCfg2} />
              <Annotation.DataMarker {...dataMarkerCfg3} />
              <Annotation.DataMarker {...dataMarkerCfg4} />
              <Annotation.DataMarker {...dataMarkerCfg5} />
              <Annotation.DataRegion {...dataRegionCfg} />
            </Chart>
          </Card>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        分割线
      </Divider>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="客服咨询量/外部舆情量"
            extra={
              <a
                href="https://www.bizcharts.net/product/BizCharts4/demo/556"
                target="_blank"
                rel="noreferrer"
              >
                坐标轴显示首尾刻度点
              </a>
            }
          >
            <div>
              <div className="chart-legend">
                <ul>
                  <li>
                    <div className="rect first" />
                    <span className="name puhui-family">
                      客服咨询量（小蜜/在线/热线）
                    </span>
                  </li>
                  <li>
                    <div className="rect second" />
                    <span className="name puhui-family">外部舆情量</span>
                  </li>
                </ul>
              </div>
              <Chart
                height={320}
                padding={[10, 20, 70, 40]}
                data={consult}
                scale={cols}
                autoFit
              >
                <Axis name="x" label={label} grid={null} line={null} />
                <Axis name="y" label={label} grid={null} />
                <Legend /> {/** visible={false} */}
                <Tooltip shared /> {/** visible={false} */}
                <LineAdvance
                  position="x*y"
                  shape="smooth"
                  area
                  color={[
                    'versionName',
                    ['#79D1ED', '#FFA66B', 'rgba(0, 0, 0, 0)']
                  ]}
                />
              </Chart>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LineChart;
